import os
import json
import time
import logging
import requests
import threading
import uvicorn
from datetime import datetime, timedelta, timezone
from dataclasses import dataclass
from typing import Optional, Dict, Any, List
from pathlib import Path

from playwright.sync_api import sync_playwright, Playwright, BrowserContext, Page
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm


@dataclass
class OneLoginToken:
    """OneLogin token with expiration tracking"""
    token: str
    expires_at: datetime
    
    def is_valid(self) -> bool:
        """Check if token is still valid (with 60s buffer)"""
        return datetime.now(timezone.utc) < self.expires_at - timedelta(seconds=60)


@dataclass
class OneLoginTokens:
    """Container for OneLogin access and session tokens"""
    access: OneLoginToken
    session: OneLoginToken


class OneLoginAuthenticator:
    """
    Enhanced OneLogin authentication with Chrome extension support
    
    This class handles OneLogin authentication using both API-based and
    browser-based methods, with automatic Chrome extension management
    for seamless SSO integration.
    """
    _server_started = False 
    def __init__(
        self,
        subdomain: str,
        username: str,
        password: str,
        client_id: Optional[str] = None,
        client_secret: Optional[str] = None,
        headless: bool = True,
        user_data_dir: Optional[str] = None,
        extension_path: Optional[str] = None,
        timeout: int = 30000,
        viewport_size: Optional[Dict[str, int]] = None,
        target_app_url: Optional[str] = None,
        enable_extension: bool = True
    ):
        """
        Initialize OneLogin authenticator
        
        Args:
            subdomain: OneLogin subdomain (e.g., 'your-company')
            username: OneLogin username
            password: OneLogin password
            client_id: OneLogin API client ID (optional, for API auth)
            client_secret: OneLogin API client secret (optional, for API auth)
            headless: Run browser in headless mode
            user_data_dir: Chrome user data directory path
            extension_path: Path to OneLogin Chrome extension
            timeout: Default timeout for operations (ms)
            viewport_size: Browser viewport size {'width': 1920, 'height': 1080}
            target_app_url: OneLogin app URL to navigate to after authentication
            enable_extension: Whether to load the OneLogin extension
        """
        self.subdomain = subdomain
        self.username = username
        self.password = password
        self.client_id = client_id or os.getenv("ONELOGIN_CLIENT_ID")
        self.client_secret = client_secret or os.getenv("ONELOGIN_CLIENT_SECRET")
        self.headless = headless
        self.timeout = timeout
        self.viewport_size = viewport_size or {"width": 1920, "height": 1080}
        self.target_app_url = target_app_url
        self.enable_extension = enable_extension
        
        # Setup logging
        self.logger = logging.getLogger(f"{__name__}.{self.__class__.__name__}")
        
        # Setup paths
        self.user_data_dir = user_data_dir or os.getenv("USER_DATA_DIR", "./playwright_user_data")
        self.extension_path = extension_path or self._find_extension_path()
        
        # Browser components
        self._playwright: Optional[Playwright] = None
        self._browser: Optional[BrowserContext] = None
        self._page: Optional[Page] = None
        
        # Authentication state
        self._tokens: Optional[OneLoginTokens] = None
        self._fast_login_url = f"http://localhost:{os.getenv('ONELOGIN_LOCAL_PORT', '8004')}"
        
        # Ensure directories exist
        Path(self.user_data_dir).mkdir(parents=True, exist_ok=True)
    
    def _find_extension_path(self) -> str:
        """Find OneLogin Chrome extension path (CRX file or unpacked)"""
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        # First try to find .crx file
        crx_files = [
            os.path.join(current_dir, "ioalpmibngobedobkmbhgmadaphocjdn_crxdl.com_v3_4.0.11.0.crx"),
            os.path.join(current_dir, "onelogin.crx"),
            os.path.join(current_dir, "chrome_ext", "onelogin.crx"),
            "./ioalpmibngobedobkmbhgmadaphocjdn_crxdl.com_v3_4.0.11.0.crx",
            "./onelogin.crx",
            "./chrome_ext/onelogin.crx",
        ]
        
        for crx_path in crx_files:
            abs_crx_path = os.path.abspath(crx_path)
            if os.path.exists(abs_crx_path):
                self.logger.info(f"Found OneLogin CRX file at: {abs_crx_path}")
                return abs_crx_path
        
        # If no CRX file found, try unpacked extensions
        possible_paths = [
            # Try chrome_ext folder first (user's specified location)
            os.path.join(current_dir, "chrome_ext", "onelogin", "4.0.11_0"),
            os.path.join(current_dir, "chrome_ext", "onelogin", "4.0.9_0"),
            os.path.join(current_dir, "chrome_ext", "onelogin"),
            "./chrome_ext/onelogin/4.0.11_0",
            "./chrome_ext/onelogin/4.0.9_0", 
            "./chrome_ext/onelogin",
            # Try Sipder extension path as fallback
            os.path.join(current_dir, "Sipder", "chrome_ext", "one_login", "4.0.11_0"),
            os.path.join(current_dir, "Sipder", "chrome_ext", "one_login", "4.0.9_0"),
            os.path.join(current_dir, "Sipder", "chrome_ext", "one_login"),
        ]
        
        for path in possible_paths:
            abs_path = os.path.abspath(path)
            manifest_path = os.path.join(abs_path, "manifest.json")
            
            if os.path.exists(abs_path) and os.path.exists(manifest_path):
                self.logger.info(f"Found OneLogin unpacked extension at: {abs_path}")
                return abs_path
        
        self.logger.warning("OneLogin extension not found, will attempt API-only authentication")
        return ""
    
    def _get_api_domain(self) -> str:
        """Get OneLogin API domain"""
        return f"https://{self.subdomain}.onelogin.com"
    
    def _get_access_token(self) -> Dict[str, Any]:
        """Get OneLogin API access token"""
        if not self.client_id or not self.client_secret:
            raise ValueError("OneLogin client_id and client_secret are required for API authentication")
        
        url = f"{self._get_api_domain()}/auth/oauth2/v2/token"
        auth = (self.client_id, self.client_secret)
        
        response = requests.post(
            url, 
            auth=auth, 
            json={"grant_type": "client_credentials"}, 
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    
    def _get_session_token(self, access_token: str) -> Dict[str, Any]:
        """Get OneLogin session token"""
        url = f"{self._get_api_domain()}/api/1/login/auth"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Custom-Allowed-Origin-Header-1": self._fast_login_url,
        }
        body = {
            "username_or_email": self.username,
            "password": self.password,
            "subdomain": self.subdomain,
        }
        
        response = requests.post(url, headers=headers, json=body, timeout=15)
        response.raise_for_status()
        return response.json()
    
    def _setup_browser(self) -> BrowserContext:
        """Setup browser with OneLogin extension"""
        # Base browser arguments
        browser_args = [
            "--disable-dev-shm-usage",
            "--disable-notifications",
            "--disable-session-crashed-bubble",
            "--disable-features=InfiniteSessionRestore",
            "--disable-infobars",
            "--enable-clipboard-read-write",
            "--no-sandbox",  # Required for headless mode in containers
            "--disable-gpu",  # Disable GPU acceleration for headless mode
            "--disable-software-rasterizer",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding",
            "--disable-features=TranslateUI",
            "--disable-ipc-flooding-protection",
            f"--window-size={self.viewport_size['width']},{self.viewport_size['height']}",
            # Disable password save pop-ups
            "--disable-save-password-bubble",
            "--disable-password-manager-reauthentication",
            "--disable-password-generation",
            "--disable-autofill-keyboard-accessory-view",
            "--disable-autofill-credit-card-popup",
            # Disable restore page pop-ups
            "--disable-restore-session-state",
            "--disable-session-crashed-bubble",
            "--disable-hang-monitor",
            "--disable-prompt-on-repost",
            "--disable-background-networking",
            # Additional pop-up prevention
            "--disable-popup-blocking",
            "--disable-default-apps",
            "--disable-extensions-file-access-check",
            "--disable-web-security",
            "--disable-features=VizDisplayCompositor",
            "--disable-component-extensions-with-background-pages",
        ]
        
        # Load OneLogin extension if enabled and available
        if self.enable_extension and self.extension_path and os.path.exists(self.extension_path):
            abs_extension_path = os.path.abspath(self.extension_path).replace('\\', '/')
            
            # Check if it's a CRX file or unpacked extension
            if self.extension_path.endswith('.crx'):
                self.logger.info(f"Loading OneLogin CRX file from: {abs_extension_path}")
                # For CRX files, we need to use different approach
                browser_args.extend([
                    "--enable-extensions",
                    f"--load-extension={abs_extension_path}",
                ])
            else:
                self.logger.info(f"Loading OneLogin unpacked extension from: {abs_extension_path}")
                manifest_path = os.path.join(abs_extension_path, 'manifest.json')
                self.logger.info(f"Extension manifest exists: {os.path.exists(manifest_path)}")
                
                if os.path.exists(manifest_path):
                    # For unpacked extensions, use the standard approach
                    browser_args.extend([
                        "--enable-extensions",
                        f"--disable-extensions-except={abs_extension_path}",
                        f"--load-extension={abs_extension_path}",
                    ])
                else:
                    self.logger.warning("Extension manifest not found, proceeding without extension")
                    self.enable_extension = False
        else:
            if not self.enable_extension:
                self.logger.info("OneLogin extension disabled by user")
            else:
                self.logger.warning("OneLogin extension not found, proceeding without extension")
        
        # Additional headless-specific arguments
        if self.headless:
            browser_args.extend([
                "--headless=new",  # Use new headless mode
                "--run-all-compositor-stages-before-draw",
                "--disable-threaded-compositing",
                "--disable-threaded-scrolling",
            ])
        
        try:
            self.logger.info(f"Starting browser with {len(browser_args)} arguments")
            self.logger.debug(f"Browser args: {browser_args}")
            
            # Use chromium instead of chrome for better extension support
            browser = self._playwright.chromium.launch_persistent_context(
                user_data_dir=self.user_data_dir,
                headless=self.headless,
                args=browser_args,
                viewport=self.viewport_size if self.headless else None,
                timeout=self.timeout,
                permissions=["clipboard-read", "clipboard-write"],
                ignore_default_args=["--enable-automation"],  # Hide automation flags
            )
            
            self.logger.info(f"Browser started in {'headless' if self.headless else 'visible'} mode")
            return browser
            
        except Exception as e:
            self.logger.error(f"Failed to start browser: {e}")
            # Try fallback without extension if extension loading failed
            if self.enable_extension and self.extension_path:
                self.logger.info("Retrying without extension...")
                # Remove extension-related arguments
                browser_args = [arg for arg in browser_args if not any(
                    arg.startswith(prefix) for prefix in [
                        "--disable-extensions-except", 
                        "--load-extension", 
                        "--enable-extensions"
                    ]
                )]
                browser = self._playwright.chromium.launch_persistent_context(
                    user_data_dir=self.user_data_dir,
                    headless=self.headless,
                    args=browser_args,
                    viewport=self.viewport_size if self.headless else None,
                    timeout=self.timeout,
                    permissions=["clipboard-read", "clipboard-write"],
                    ignore_default_args=["--enable-automation"],
                )
                return browser
            else:
                raise
    
    def _verify_extension_loaded(self) -> bool:
        """Verify OneLogin extension is properly loaded and pinned"""
        try:
            self.logger.info("Verifying OneLogin extension is loaded...")
            self._page.wait_for_timeout(3000)  # Wait for extensions to load
            
            # Method 1: Check if extension scripts are injected
            try:
                self.logger.info("Checking for extension scripts...")
                self._page.goto("about:blank", timeout=self.timeout)
                self._page.wait_for_timeout(2000)
                
                # Check if OneLogin extension scripts are available
                script_check = self._page.evaluate("""
                    () => {
                        // Check for OneLogin extension globals
                        return typeof window.OneLogin !== 'undefined' || 
                               typeof window.onelogin !== 'undefined' ||
                               document.querySelector('script[src*="onelogin"]') !== null ||
                               document.querySelector('script[src*="OneLogin"]') !== null ||
                               (chrome && chrome.runtime && chrome.runtime.getManifest && 
                                chrome.runtime.getManifest().name && 
                                chrome.runtime.getManifest().name.includes('OneLogin'));
                    }
                """)
                
                if script_check:
                    self.logger.info("✅ OneLogin extension scripts detected")
                    return True
                    
            except Exception as e:
                self.logger.debug(f"Could not check extension scripts: {e}")
            
            # Method 2: Check chrome://extensions page
            try:
                self.logger.info("Checking chrome://extensions page...")
                self._page.goto("chrome://extensions/", timeout=self.timeout)
                self._page.wait_for_timeout(3000)
                
                # Enable developer mode to see all extensions
                try:
                    dev_mode_toggle = self._page.wait_for_selector("#devMode", timeout=5000)
                    if dev_mode_toggle:
                        is_checked = self._page.evaluate("document.getElementById('devMode').checked")
                        if not is_checked:
                            self.logger.info("Enabling developer mode...")
                            dev_mode_toggle.click()
                            self._page.wait_for_timeout(1000)
                except:
                    pass
                
                # Look for OneLogin extension in the extensions page
                selectors = [
                    "extensions-item",
                    "div#card",
                    "div[data-extension-id]",
                    ".extension-item"
                ]
                
                extension_found = False
                for selector in selectors:
                    try:
                        extension_elements = self._page.query_selector_all(selector)
                        for elem in extension_elements:
                            if elem:
                                text = elem.inner_text().lower()
                                if "onelogin" in text or "one login" in text:
                                    self.logger.info("✅ OneLogin extension found in chrome://extensions")
                                    
                                    # Check if extension is enabled
                                    try:
                                        toggle = elem.query_selector("cr-toggle")
                                        if toggle:
                                            is_enabled = self._page.evaluate("arguments[0].checked", toggle)
                                            if not is_enabled:
                                                self.logger.info("Enabling OneLogin extension...")
                                                toggle.click()
                                                self._page.wait_for_timeout(1000)
                                        
                                        # Try to pin the extension
                                        try:
                                            pin_button = elem.query_selector("cr-icon-button[title*='Pin']")
                                            if pin_button:
                                                self.logger.info("Pinning OneLogin extension...")
                                                pin_button.click()
                                                self._page.wait_for_timeout(1000)
                                        except:
                                            pass
                                            
                                    except Exception as e:
                                        self.logger.debug(f"Could not toggle/pin extension: {e}")
                                    
                                    extension_found = True
                                    break
                    except:
                        continue
                
                if extension_found:
                    return True
                        
            except Exception as e:
                self.logger.debug(f"Could not check chrome://extensions: {e}")
            
            # Method 3: Test extension functionality with OneLogin portal
            try:
                test_url = f"https://{self.subdomain}.onelogin.com/portal"
                self.logger.info(f"Testing extension with OneLogin portal: {test_url}")
                self._page.goto(test_url, timeout=self.timeout)
                self._page.wait_for_timeout(5000)
                
                # Check if we're on OneLogin domain (extension working)
                current_url = self._page.url.lower()
                if "onelogin" in current_url:
                    self.logger.info("✅ OneLogin extension verified via portal redirect")
                    return True
                else:
                    self.logger.warning(f"⚠️  Extension may not be working - redirected to: {current_url}")
                    
            except Exception as e:
                self.logger.debug(f"Could not test with OneLogin portal: {e}")
            
            self.logger.warning("⚠️  OneLogin extension verification failed - proceeding anyway")
            return False
                
        except Exception as e:
            self.logger.error(f"Error verifying extension: {e}")
            return False
    
    def _authenticate_via_api(self) -> OneLoginTokens:
        """Authenticate using OneLogin API (faster, no browser required)"""
        self.logger.info("Authenticating via OneLogin API...")
        
        # Get access token
        access_data = self._get_access_token()
        access_expires = datetime.fromisoformat(access_data.get("created_at", "")) + timedelta(
            seconds=access_data.get("expires_in", 600)
        )
        access_token = OneLoginToken(
            token=access_data.get("access_token", ""),
            expires_at=access_expires.replace(microsecond=0)
        )
        
        # Get session token
        session_data = self._get_session_token(access_token.token)
        
        if session_data.get("status", {}).get("code") != 200:
            raise ValueError("Invalid OneLogin credentials")
        
        session_info = session_data.get("data", [{}])[0]
        session_expires = datetime.strptime(
            session_info.get("expires_at", ""), 
            "%Y/%m/%d %H:%M:%S %z"
        )
        session_token = OneLoginToken(
            token=session_info.get("session_token", ""),
            expires_at=session_expires.replace(microsecond=0)
        )
        
        tokens = OneLoginTokens(access=access_token, session=session_token)
        self.logger.info("API authentication successful")
        return tokens
    
    def _authenticate_via_browser(self) -> OneLoginTokens:
        """Authenticate using browser with OneLogin extension"""
        self.logger.info("Authenticating via browser with OneLogin extension...")
        
        try:
            # Start the fast login server
            self._start_fast_login_server()
            
            # Clear cookies first
            self._page.context.clear_cookies()
            
            # Navigate to the fast login page
            self.logger.info(f"Navigating to fast login server: {self._fast_login_url}")
            self._page.goto(self._fast_login_url, wait_until="load")
            
            # Click login link
            login_link = self._page.wait_for_selector("a#login_lnk", timeout=self.timeout // 3)
            if not login_link:
                raise ValueError("Login link not found")
            login_link.click(timeout=self.timeout // 3)
            
            # Wait for login form to load
            login_btn = self._page.wait_for_selector("button#login_btn", timeout=self.timeout)
            if not login_btn:
                raise ValueError("Login button not found")
            
            # Fill in credentials manually
            self.logger.info("Filling in username and password...")
            self._page.fill("input#username", self.username, timeout=self.timeout // 3)
            self._page.fill("input#password", self.password, timeout=self.timeout // 3)
            
            # Click login button
            self.logger.info("Clicking login button...")
            login_btn.click(timeout=self.timeout // 2)
            
            # Wait for token page to load
            self.logger.info("Waiting for token page to load...")
            self._page.wait_for_selector("input#go_btn", timeout=self.timeout)
            
            # Extract tokens from the response page
            tokens = self._extract_tokens_from_page()
            
            # Click submit to complete authentication
            submit_btn = self._page.wait_for_selector("input#go_btn", timeout=self.timeout // 2)
            if submit_btn:
                self.logger.info("Clicking submit button to complete authentication...")
                submit_btn.click(timeout=self.timeout // 2)
            
            # Check for portal redirect
            has_redirect = os.getenv("ONELOGIN_PORTAL_REDIRECT", "").lower() in ("true", "t", "1")
            if has_redirect:
                self.logger.info("Checking for portal redirect...")
                try:
                    search_frm = self._page.wait_for_selector("input#search-input", timeout=self.timeout)
                    if search_frm:
                        portal_home = f"https://{self.subdomain}.onelogin.com"
                        if self._page.url.startswith(portal_home):
                            self.logger.info("✅ Portal redirect successful")
                        else:
                            self.logger.warning(f"⚠️  Portal redirect may have failed: {self._page.url}")
                except Exception as e:
                    self.logger.warning(f"Portal redirect check failed: {e}")
            else:
                # Check for "Cookie Obtained!" message
                try:
                    lnk = self._page.wait_for_selector("a#login_lnk", timeout=self.timeout // 3)
                    if lnk and "Cookie Obtained!" in self._page.title():
                        self.logger.info("✅ Cookie obtained successfully")
                    else:
                        self.logger.warning("⚠️  Cookie obtained check failed")
                except Exception as e:
                    self.logger.warning(f"Cookie obtained check failed: {e}")
            
            self.logger.info("Browser authentication successful with OneLogin extension")
            return tokens
            
        except Exception as e:
            self.logger.error(f"Browser authentication failed: {e}")
            raise
    
    def _extract_tokens_from_page(self) -> OneLoginTokens:
        """Extract OneLogin tokens from the authentication page"""
        # Wait for token page to load
        self._page.wait_for_selector("input#go_btn", timeout=self.timeout)
        
        # Extract session token
        session_token_elem = self._page.wait_for_selector("#session_token", timeout=self.timeout // 3)
        session_token = session_token_elem.inner_text() if session_token_elem else ""
        
        # Extract access token
        access_token_elem = self._page.wait_for_selector("#access_token", timeout=self.timeout // 3)
        access_token = access_token_elem.inner_text() if access_token_elem else ""
        
        # Extract expiration times
        session_exp_elem = self._page.wait_for_selector("#session_exp", timeout=self.timeout // 3)
        session_exp_str = session_exp_elem.inner_text() if session_exp_elem else ""
        
        access_exp_elem = self._page.wait_for_selector("#access_exp", timeout=self.timeout // 3)
        access_exp_str = access_exp_elem.inner_text() if access_exp_elem else ""
        
        # Parse expiration times
        try:
            session_expires = datetime.fromisoformat(session_exp_str.replace(" ", "T"))
        except:
            session_expires = datetime.now(timezone.utc) + timedelta(hours=1)
        
        try:
            access_expires = datetime.fromisoformat(access_exp_str.replace(" ", "T"))
        except:
            access_expires = datetime.now(timezone.utc) + timedelta(hours=1)
        
        return OneLoginTokens(
            access=OneLoginToken(token=access_token, expires_at=access_expires),
            session=OneLoginToken(token=session_token, expires_at=session_expires)
        )
    
    def _start_fast_login_server(self):
        """Start a simple fast login server for browser authentication"""
        # Create a simple FastAPI app for fast login
        if OneLoginAuthenticator._server_started:
          self.logger.info("Fast login server already running, skipping startup")
          return
        app = FastAPI()
        
        @app.get("/", response_class=HTMLResponse)
        def start_page(request: Request) -> str:
            portal_url: str = f"https://{self.subdomain}.onelogin.com/portal"
            logout_url: str = f"https://{self.subdomain}.onelogin.com/logout"
            referer_url: str = request.headers.get("referer", "")
            host_url: str = request.headers.get("host", "")
            page_title: str = "Home Page"

            if referer_url and host_url and referer_url.endswith(f"://{host_url}/"):
                page_title = "Cookie Obtained!"
                portal_redirect: bool = os.getenv("ONELOGIN_PORTAL_REDIRECT", "").lower() in ("true", "t", "1")
                if portal_redirect:
                    raise HTTPException(status_code=302, detail="Redirect", headers={"Location": portal_url})

            return f"""<!doctype html><html>
                <head><meta charset="utf-8"><title>{page_title}</title></head>
                <body><p>{page_title}</p>
                    <ul>
                        <li><a id="login_lnk"href="/login">Login</a></li>
                        <li><a id="portal_lnk"href="{portal_url}">Portal</a></li>
                        <li><a id="logout_lnk"href="{logout_url}">Logout</a></li>
                    </ul>
                </body></html>"""

        @app.get("/login", response_class=HTMLResponse)
        def login_form() -> str:
            return f"""<!doctype html><html>
                <head><meta charset="utf-8"><title>Login</title></head>
                <body><p>One Password Login</p>
                    <form method="post"action="/cookie">
                        <label for="username">Username:</label>
                        <input type="text"id="username"name="username"value="{self.username}"required><br><br>
                        <label for="password">Password:</label>
                        <input type="password"id="password"name="password"value="{self.password}"required><br><br>
                        <button id="login_btn"type="submit">Login</button>
                    </form>
                </body></html>"""

        @app.post("/cookie", response_class=HTMLResponse)
        def attach_cookie() -> str:
            # Get tokens via API
            access_data = self._get_access_token()
            access_expires = datetime.fromisoformat(access_data.get("created_at", "")) + timedelta(
                seconds=access_data.get("expires_in", 600)
            )
            access_token = OneLoginToken(
                token=access_data.get("access_token", ""),
                expires_at=access_expires.replace(microsecond=0)
            )
            
            # Get session token
            session_data = self._get_session_token(access_token.token)
            
            if session_data.get("status", {}).get("code") != 200:
                raise HTTPException(status_code=401, detail="Invalid OneLogin credentials")
            
            session_info = session_data.get("data", [{}])[0]
            session_expires = datetime.strptime(
                session_info.get("expires_at", ""), 
                "%Y/%m/%d %H:%M:%S %z"
            )
            session_token = OneLoginToken(
                token=session_info.get("session_token", ""),
                expires_at=session_expires.replace(microsecond=0)
            )
            
            redirect_url: str = f"https://{self.subdomain}.onelogin.com/session_via_api_token"
            return f"""<!doctype html><html>
                <head><meta charset="utf-8"><title>Cookie Redirect</title></head>
                <body><p>Login Success!</p>
                    <form method="POST"action="{redirect_url}">
                        <input type="hidden"name="session_token"value="{session_token.token}">
                        <input id="go_btn"type="submit"placeholder="GO">
                        <input id="auth_token"type="hidden">
                    </form>
                    <ul>
                        <li><label for="token_session">Session Token:</label><code id="session_token"name="token_session"
                            style="word-wrap:break-word; white-space:pre-wrap; background-color:#ddd"
                            >{session_token.token}</code></li>
                        <li><label for="exp_session">Session Expiration:</label>
                            <code id="session_exp"name="exp_session"style="background-color:#ddd"
                                >{session_token.expires_at}</code></li>
                        <li><label for="token_access">Access Token:</label><code id="access_token"name="token_access"
                            style="word-wrap:break-word; white-space:pre-wrap; background-color:#ddd"
                            >{access_token.token}</code></li>
                        <li><label for="exp_access">Access Expiration:</label>
                            <code id="access_exp"name="exp_access"style="background-color:#ddd"
                                >{access_token.expires_at}</code></li>
                    </ul>
                </body></html>"""

        # Start server in a separate thread
        def run_server():
            uvicorn.run(app, host="0.0.0.0", port=8004, log_level="error")
        
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        
        # Wait a moment for server to start
        time.sleep(2)
        OneLoginAuthenticator._server_started = True
        self.logger.info("Fast login server started on port 8004")
    
    def authenticate(self) -> OneLoginTokens:
        """
        Authenticate with OneLogin and return tokens
        
        Returns:
            OneLoginTokens: Access and session tokens
            
        Raises:
            ValueError: If authentication fails
            RuntimeError: If browser context is not available
        """
        if not self._browser:
            raise RuntimeError("Browser context not available. Use 'with' statement to initialize.")
        
        # For target URL navigation, we use browser authentication
        if self.target_app_url:
            self.logger.info("Target URL specified - using browser authentication")
            
            if not self._page:
                self._page = self._browser.new_page()
            
            # Use browser authentication (extension is optional)
            self._tokens = self._authenticate_via_browser()
            
            # Navigate to target app
            if self._page:
                self.navigate_to_target_app()
            
            return self._tokens
        
        # For API-only authentication (no target URL)
        if self.client_id and self.client_secret:
            try:
                self._tokens = self._authenticate_via_api()
                self.logger.info("API authentication successful (no target URL specified)")
                return self._tokens
            except Exception as e:
                self.logger.warning(f"API authentication failed, falling back to browser: {e}")
        
        # Fall back to browser authentication (no target URL)
        if not self._page:
            self._page = self._browser.new_page()
        
        # Verify extension is loaded (optional for non-target URL auth)
        if self.enable_extension and self.extension_path and not self._verify_extension_loaded():
            self.logger.warning("OneLogin extension verification failed, proceeding anyway")
        
        self._tokens = self._authenticate_via_browser()
        return self._tokens
    
    def get_tokens(self) -> Optional[OneLoginTokens]:
        """Get current tokens if available"""
        return self._tokens
    
    def is_authenticated(self) -> bool:
        """Check if currently authenticated with valid tokens"""
        return self._tokens is not None and self._tokens.access.is_valid() and self._tokens.session.is_valid()
    
    def refresh_tokens(self) -> OneLoginTokens:
        """Refresh authentication tokens"""
        self.logger.info("Refreshing OneLogin tokens...")
        return self.authenticate()
    
    def navigate_to_target_app(self) -> bool:
        """
        Navigate to the target OneLogin app after authentication
        """
        if not self.target_app_url:
            self.logger.info("No target app URL specified")
            return True
        
        if not self._page:
            self.logger.error("No browser page available for navigation")
            return False
        
        try:
            # Extract app_id from target URL (e.g., 3149896 from https://app.onelogin.com/launch/3149896)
            app_id = self.target_app_url.split('/')[-1]
            if not app_id.isdigit():
                self.logger.error(f"Could not extract app ID from target URL: {self.target_app_url}")
                return False
            
            self.logger.info(f"Launching OneLogin App ID: {app_id}")
            
            # Use the OneLogin approach: navigate to /client/apps/launch/{app_id}
            launch_url = f"https://{self.subdomain}.onelogin.com/client/apps/launch/{app_id}"
            self.logger.info(f"App Launch URL: {launch_url}")
            
            # Navigate to the launch page
            self._page.goto(launch_url, timeout=self.timeout)
            
            # Check if we're on the correct page
            current_url = self._page.url
            self.logger.info(f"Final URL: {current_url}")
            
            # Check if we successfully reached the target app
            if app_id in current_url or "onelogin" in current_url.lower():
                self.logger.info(f"✅ Successfully launched OneLogin app: {current_url}")
                return True
            else:
                self.logger.warning(f"⚠️  May not have reached target app: {current_url}")
                return False
                
        except Exception as e:
            self.logger.error(f"Failed to launch OneLogin app: {e}")
            return False
    
    def __enter__(self) -> "OneLoginAuthenticator":
        """Context manager entry"""
        self.logger.info("Initializing OneLogin authenticator...")
        
        # Start Playwright
        self._playwright = sync_playwright().start()
        
        # For target URL navigation, we need a browser (extension is optional)
        if self.target_app_url:
            self.logger.info(f"Setting up browser for target app: {self.target_app_url}")
            self._browser = self._setup_browser()
            self._page = self._browser.new_page()
            self.logger.info("Browser context created for target app navigation")
        
        # For API-only authentication, browser is optional
        elif self.enable_extension and self.extension_path and os.path.exists(self.extension_path):
            self.logger.info("Setting up browser with OneLogin extension for authentication")
            self._browser = self._setup_browser()
            self._page = self._browser.new_page()
        else:
            self.logger.info("No extension found, using API-only mode")
        
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.logger.info("Cleaning up OneLogin authenticator...")
        
        if self._browser:
            self._browser.close()
        
        if self._playwright:
            self._playwright.stop()
    
    @property
    def browser(self) -> Optional[BrowserContext]:
        """Get browser context for further automation"""
        return self._browser
    
    @property
    def page(self) -> Optional[Page]:
        """Get current page for further automation"""
        return self._page


# Convenience functions for quick usage
def quick_authenticate(
    subdomain: str,
    username: str, 
    password: str,
    headless: bool = True,
    target_app_url: Optional[str] = None,
    **kwargs
) -> OneLoginTokens:
    """
    Quick OneLogin authentication without context management
    
    Args:
        subdomain: OneLogin subdomain
        username: OneLogin username
        password: OneLogin password
        headless: Run in headless mode
        **kwargs: Additional arguments for OneLoginAuthenticator
        
    Returns:
        OneLoginTokens: Authentication tokens
    """
    with OneLoginAuthenticator(subdomain, username, password, headless=headless, target_app_url=target_app_url, **kwargs) as auth:
        return auth.authenticate()


def create_browser_context(
    subdomain: str,
    username: str,
    password: str,
    headless: bool = True,
    target_app_url: Optional[str] = None,
    **kwargs
) -> OneLoginAuthenticator:
    """
    Create authenticated browser context for automation
    
    Args:
        subdomain: OneLogin subdomain
        username: OneLogin username
        password: OneLogin password
        headless: Run in headless mode
        **kwargs: Additional arguments for OneLoginAuthenticator
        
    Returns:
        OneLoginAuthenticator: Ready-to-use authenticator instance
    """
    auth = OneLoginAuthenticator(subdomain, username, password, headless=headless, target_app_url=target_app_url, **kwargs)
    auth.__enter__()
    auth.authenticate()
    return auth
