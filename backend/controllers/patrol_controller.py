from fastapi import APIRouter, HTTPException
from services import patrol_service, db_service
from logger_setup import setup_logger

logging = setup_logger(log_file_path='./patrol_controller.log')

router = APIRouter()

@router.post("/patrol")
def send_patrol(payload: dict):
    """
    Handles patrol requests. 
    Expects a dictionary payload with:
    - base_url: URL for the service
    - inspection_site_id: unique serial site id
    - serial_id: The serial number to search for
    - left: The lower bound for the search range
    - right: The upper bound for the search range
    - time_delay: The delay time between requests
    """
    try:
        # Extract parameters from the payload
        base_url = payload.get("base_url")
        inspection_site_id = payload.get('inspection_site_id')
        serial_id = payload.get("serial_id")
        left = payload.get("left", '1')
        right = payload.get("right", '99999')
        time_delay = payload.get("time_delay", 10)

        # Validate required parameters
        if not inspection_site_id or not base_url or not serial_id:
            raise HTTPException(status_code=400, detail="inspection_site_id, base_url and serial_id are required")

        # Call the service to perform binary search
        last_valid, global_cnt = patrol_service.binary_search_last_serial(
            base_url, serial_id, left, right, time_delay
        )

        if last_valid > 0:
            # 1이 추가되어 나옴. 개별적 -1 추가
            last_valid = last_valid-1

            logging.info(f"데이터 저장 완료: serial_id: {serial_id} 최종 valid 시리얼: {last_valid} 최종 시리얼 ID: {serial_id}{last_valid} 시도 횟수: {global_cnt}")
            db_service.update_car_inpection_patrol_result(inspection_site_id=inspection_site_id, target_id=serial_id, target_valid_id=last_valid)
        else:
            logging.info(f"serial_id: {serial_id} valid 시리얼 없음")
        
        return {"last_valid": last_valid, "global_cnt": global_cnt}

    except Exception as e:
        logging.error(f"Error in send_patrol: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
