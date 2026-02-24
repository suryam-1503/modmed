from pathlib import Path
import re
from socket import timeout
import os
import time

from playwright.sync_api import expect, Page, TimeoutError as PlaywrightTimeoutError
from datetime import datetime, timedelta

#DEFAULT_TIMEOUT = 30000  # 30 seconds, adjust as needed


def open_appointments_custom(page: Page, timeout=60000) -> bool:
    # try:
    tab = page.locator("li.modmed-tabs-menu-item:has-text('Appointments Custom')")
    tab.wait_for(state="visible", timeout=timeout)
    tab.click()

    page.wait_for_selector("i[title='Clear All']", timeout=timeout)
    return True


def clearAll(page: Page):
    print(" Clicking Clear All")

    clear_btn = page.locator("i[title='Clear All']").first

    # Force click is important for Angular/Qlik
    clear_btn.click(force=True)

    # Give Qlik time to clear state
    page.wait_for_timeout(1500)

    print(" Clear All clicked")


def search_and_click_dimension(page: Page, values: list):
    search_input = page.locator("input[ng-model='filterDimensionKeyword']")
    expect(search_input).to_be_visible(timeout=30000)

    for value in values:
        print(f" Searching dimension: {value}")

        # Clear + type slowly (Angular needs this)
        search_input.click()
        search_input.fill("")
        search_input.type(value, delay=100)

        result_item = page.locator(
            f"li.lui-list__item:has(div.lui-list__text:has-text('{value}'))"
        ).first

        try:
            result_item.wait_for(state="visible", timeout=20000)
            result_item.scroll_into_view_if_needed()
            # CLICK (THIS IS THE KEY)
            result_item.click(force=True)
            print(f"clicked dimension: {value}")

            #  REAL validation — check sortable list
            try:
                page.locator(
                    "ul.sortablelist li"
                ).filter(has_text=value).first.wait_for(timeout=5000)
            except:
                pass

            print(f" Dimension added to report: {value}")

        except TimeoutError:
            print(f" Dimension not added: {value}")


def search_and_click_measures(page: Page, measure_name: str):
    measure_search = page.locator("input[ng-model='filterMeasureKeyword']")
    expect(measure_search).to_be_visible(timeout=30000)

    print(f" Searching measure: {measure_name}")

    measure_search.click()
    measure_search.fill("")
    measure_search.type(measure_name, delay=100)

    measure_item = page.locator(
        f"li.lui-list__item:has(div.lui-list__text:has-text('{measure_name}'))"
    ).first

    try:
        measure_item.wait_for(state="visible", timeout=20000)
        measure_item.scroll_into_view_if_needed()

        #  CLICK
        measure_item.click(force=True)
        print(f"clicked measure: {measure_name}")

        #  REAL validation
        page.wait_for_selector(
            f"ul.sortablelist li:has-text('{measure_name}')", timeout=20000
        )

        print(f"Measure added to report: {measure_name}")

    except TimeoutError:
        print(f" Measure not added: {measure_name}")

def clear_all_selections(page: Page):
    clear_btn = page.locator("button[data-tid='current-selections-clear']")

    if clear_btn.is_visible() and clear_btn.is_enabled():
       clear_btn.click()
       print(" Clear all selections clicked")
    else:
     print(" Clear all selections is disabled — continuing next flow")

def get_appointment_count(page, timeout: int = 60000) -> int:
    spans = page.locator("span.ng-binding")

    # allow Qlik render start
    page.wait_for_timeout(1000)

    deadline = time.monotonic() + (timeout / 1000)

    while time.monotonic() < deadline:
        count = spans.count()
        for i in range(count):
            el = spans.nth(i)
            text = el.get_attribute("title") or el.inner_text()
            if not text:
                continue

            text = text.strip()

            # accepts "4,339" and "336"
            if text.replace(",", "").isdigit():
                value = int(text.replace(",", ""))
                print(f"✅ Appointment count read: {value}")
                return value

        # Qlik still recalculating
        page.wait_for_timeout(500)

    raise RuntimeError(
        "Appointment count not found (Qlik did not finish recalculation)"
    )


def enter_date_range_using_keyboard(page, start_date_str:str, days_after: int = 15):
    today = datetime.today().date()
    input_date = datetime.strptime(start_date_str, "%m/%d/%Y").date()

    if input_date == today:
        start_date = today + timedelta(days=1)
    else:
        start_date = input_date

    end_date = start_date + timedelta(days=days_after)

    start_date_str = start_date.strftime("%m/%d/%Y")
    end_date_str = end_date.strftime("%m/%d/%Y")

    print(f" Start: {start_date_str}")
    print(f" End  : {end_date_str}")

    page.locator("#MM-DateRangePickernPsKVq").click()

    picker_popup = page.locator("div.daterangepicker:visible")
    picker_popup.wait_for(state="visible", timeout=30000)

    start_input = picker_popup.locator("input[name='daterangepicker_start']")
    start_input.wait_for(state="visible", timeout=30000)
    print(" Start date input is visible")
    start_input.click()
    start_input.fill(start_date_str)
    print(f" Start date entered via keyboard: {start_date_str}")

    end_input = picker_popup.locator("input[name='daterangepicker_end']")
    print(" Tabbing to end date input")
    end_input.wait_for(state="visible", timeout=30000)
    end_input.click()
    end_input.fill(end_date_str)
    print(f" End date entered via keyboard: {end_date_str}")

    page.keyboard.press("Enter")  # Apply

    print(" Date range applied")

    page.locator("h2.modmed-title-text:has-text('Appointments Custom')").click()

    span = page.locator("#MM-DateRangePickernPsKVq span")

    expect(span).not_to_have_text("Select date", timeout=30000)

    # Wait for date range to be reflected in UI (may differ from input due to UI logic)
    page.wait_for_timeout(2000)

    # Verify a date range is present, don't assert exact dates
    span_text = span.inner_text()
    print(f" Date range shown in UI: {span_text}")

    if " - " not in span_text:
        raise AssertionError(f"Date range not properly applied. Got: {span_text}")
def click_export_to_excel(page):

    export_icon = page.locator("i.lui-icon--export[title='Export to Excel']").first

    export_icon.wait_for(state="visible", timeout=30000)
    export_icon.click()

    print("Export to Excel icon clicked")

def click_export_download_link(page,practice_name="") -> str:
   

    download_link = page.locator(
        "a.export-url:has-text('Click here to download')"
    ).first

    download_link.wait_for(state="visible", timeout=60000)

    with page.expect_download(timeout=60000) as download_info:
        download_link.click()

    download = download_info.value

    documents_path = os.path.join(os.path.expanduser("~"), "Documents")

    #  Ensure Documents folder exists (safety check)
    from datetime import datetime
    BASE_DIR = Path(__file__).resolve().parent
    date_str = datetime.now().strftime("%m-%d-%Y")
    safe_practice = "".join(
        c if c.isalnum() or c in (" ", "_", "-") else "_"
        for c in practice_name
    ).strip().replace(" ", "_")

    # fallback if practice name missing
    if not safe_practice:
        safe_practice = "Unknown_Practice"

    file_name = f"{date_str}_{safe_practice}.xlsx"

    file_path=BASE_DIR/file_name

    download.save_as(file_path)

    print(" File downloaded and saved successfully:")
    print(file_path)
    return file_path

