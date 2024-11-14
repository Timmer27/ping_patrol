import math
import time
import requests
from logger_setup import setup_logger

logging = setup_logger(log_file_path='./patrol_service.log')

def is_valid_web(url, global_cnt) -> int:
    """Checks if the PDF URL is valid. Sends an alert if 403 Forbidden or ERR999 is encountered."""
    try:
        response = requests.get(url, timeout=10)    
        global_cnt += 1
        if response.status_code == 403 or "ERR999" in response.text:
            print(f"Error found - {url}")
            return global_cnt, -1
        elif response.status_code == 200 and ('자동차 기본정보' in response.text or '1년 이상' in response.text or '성능점검기록부가' in response.text):
            print(f"Valid Data found - {url}")
            return global_cnt, 1
        else:
            print(f"Invalid Data found - {url}")
            return global_cnt, 0
    except Exception as e:
        logging.error(f"Error occurred while checking URL: {e}")
        return global_cnt, 0

def binary_search_last_serial(base_url, serial_id, left, right, time_delay: int=10):
    """Performs a binary search to find the last valid serial number."""
    # Ensure the base URL and serial_id are provided
    if not base_url or not serial_id:
        print("base_url and serial_id are required")
        raise ValueError("base_url and serial_id are required")

    print('start!')
    first_check_no = f"{serial_id}00047"
    second_check_no = f"{serial_id}00100"
    fst_url = base_url + first_check_no
    scd_url = base_url + second_check_no
    
    global_cnt = 0
    last_valid = 0

    global_cnt, is_valid_fst = is_valid_web(fst_url, global_cnt)
    # time.sleep(1)
    global_cnt, is_valid_scd = is_valid_web(scd_url, global_cnt)
    if is_valid_fst == 1 or is_valid_scd == 1:

        # Calculate the number of digits for mid based on the length of `right`
        mid_length = len(right)

        # Convert `left` and `right` to integers for binary search
        left_int = int(left)
        right_int = int(right)

        while left_int <= right_int:
            mid = math.floor((left_int + right_int) / 2)
            # check_no = f"{serial_id}{mid:05d}"
            check_no = f"{serial_id}{mid:0{mid_length}d}"  
            print(f"Checking... {check_no}")
            url = base_url + check_no
            
            global_cnt, is_valid = is_valid_web(url, global_cnt)
            if is_valid == 1:
                left_int = mid + 1
            elif is_valid == 0:
                right_int = mid - 1
            else:
                logging.error(f"Proxy error or invalid response at serial {check_no}. Retrying...")
                print(f"Proxy error or invalid response at serial {check_no}. Retrying...")
                continue

            time.sleep(time_delay)
            last_valid = mid
    else:
        logging.info(f"No Data from first serial No: {first_check_no}. Skipping...")
        print(f"No Data from first serial No: {first_check_no}. Skipping...")
        time.sleep(time_delay)
        return 0, 0
    
    return last_valid, global_cnt
