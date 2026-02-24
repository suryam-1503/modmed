from itertools import count
from multiprocessing import context
from pydoc import text
import json
from socket import timeout
import time
from datetime import datetime,timedelta
from pathlib import Path
import json
from playwright.sync_api import sync_playwright, expect, Playwright
from env_data import env
from login.standalone_onelogin_auth import OneLoginAuthenticator
from utils.settings import USER_DATA_DIR, base_url
from appointment.custom import (
    open_appointments_custom,
    clearAll,
    search_and_click_dimension,
    search_and_click_measures,
    get_appointment_count,
    enter_date_range_using_keyboard,click_export_to_excel,click_export_download_link,clear_all_selections)
 

BASE_DIR = Path(__file__).resolve().parent.parent
json_path = BASE_DIR / "data" / "app_id.json"

with open(json_path, "r") as f:
    practices = json.load(f)

def run_practice(practice_name, practice_id):
    with OneLoginAuthenticator(
        subdomain=env.ONELOGIN_SUBDOMAIN,
        username=env.ONELOGIN_USERNAME,
        password=env.ONELOGIN_PASSWORD,
        client_id=env.ONELOGIN_CLIENT_ID,
        client_secret=env.ONELOGIN_CLIENT_SECRET,
        headless=False,
        user_data_dir=USER_DATA_DIR,
        enable_extension=True,
        target_app_url="dummy"
    ) as auth:

        try:
            auth.authenticate()
            page = auth.page

         

        # Navigate to practice
            page.goto(f"{base_url}{practice_id}", wait_until="networkidle")

            continue_btn = page.locator("input[value='Continue as Practice Staff']")
            expect(continue_btn).to_be_visible(timeout=20000)
            continue_btn.click()
            print(" Clicked Continue as Practice Staff")
        except Exception:
            print(" Continue as Practice Staff not shown")

        page.wait_for_timeout(3000)

        # Switch to iframe if present
        analytics = page.locator("#analyticsMenuNavTab")

        expect(analytics).to_be_visible(timeout=90000)

        analytics.hover()
        page.wait_for_timeout(300)
        analytics.click()
        page.wait_for_timeout(3000)

        page.wait_for_selector("a:has-text('Financial Reports')", timeout=30000)
        print("Analytics menu opened successfully")

        fin_reports = page.locator("a:has-text('Financial Reports')").first
        expect(fin_reports).to_be_visible(timeout=30000)


        pw_context = page.context
        with pw_context.expect_event("page") as page_info:
          fin_reports.click()

        report_page = page_info.value
        report_page.bring_to_front()
        report_page.set_viewport_size({"width": 1400, "height": 900})

        report_page.locator("li.modmed-tabs-menu-item:has-text('Appointments Custom')")

        print("Financial Reports (Qlik) opened")

   
        opened = open_appointments_custom(report_page)
        report_page.wait_for_timeout(10000)

        clearAll(report_page)

        values = ["Patient MRN", "Patient Name", "Location", "Appointment Date"]
        search_and_click_dimension(report_page, values)
        name = "Appointment Count"
        search_and_click_measures(report_page, name)
        clear_all_selections(report_page)
        print(" Dimensions and measure added, selections cleared")
        count = get_appointment_count(report_page)
        print(f"Current appointment count: {count}")

        today_str = datetime.today().strftime("%m/%d/%Y")
        enter_date_range_using_keyboard(report_page, start_date_str=today_str)
        
        after_count = get_appointment_count(report_page)
        print(f"Appointment count after date range applied: {after_count}")
        if  count != after_count:
          print(" Appointment count changed")
          click_export_to_excel(report_page)
          click_export_download_link(report_page,practice_name)
    # click your target here
        else:
           print(" Appointment count unchanged")

        report_page.close()
        page.close()

        print(f"✅ FINISHED PRACTICE: {practice_name}")
def main():
     for practice_name, practice_id in practices.items():
        print("\n" + "=" * 60)
        print(f" Starting practice: {practice_name} (ID: {practice_id})")
        print("=" * 60)

        try:
            run_practice(practice_name, practice_id)

        except Exception as e:
            print(f" Error processing practice {practice_name}: {e}")

        finally:
            # small cooldown between practices
            time.sleep(5)
            print(f" Finished attempt for practice: {practice_name}")

 

if __name__ == "__main__":
    main()
