from dotenv import load_dotenv
import os
load_dotenv()


class EnvData:

    EMAIL = os.getenv("EMAIL")
    PASSWORD = os.getenv("PASSWORD")
    MAIL_RECIPTION_LIST = os.getenv("MAIL_RECIPTION_LIST")
    ONELOGIN_SUBDOMAIN = os.getenv("ONELOGIN_SUBDOMAIN")
    ONELOGIN_USERNAME = os.getenv("ONELOGIN_USERNAME")
    ONELOGIN_PASSWORD = os.getenv("ONELOGIN_PASSWORD")
    ONELOGIN_CLIENT_ID = os.getenv("ONELOGIN_CLIENT_ID")
    ONELOGIN_CLIENT_SECRET = os.getenv("ONELOGIN_CLIENT_SECRET")

env = EnvData()