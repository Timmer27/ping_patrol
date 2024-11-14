from fastapi import APIRouter, HTTPException
from services import patrol_service, db_service
from logger_setup import setup_logger

logging = setup_logger(log_file_path='./inspection_controller.log')

router = APIRouter()

@router.get("/inspection_list")
def fetch_all_inspection_list():
    # Fetch all inspection list data
    return db_service.fetch_inspection_list_data()

@router.get("/inspection_list/{inspection_site_id}")
def fetch_inspection_list_by_id(inspection_site_id: int):
    # Fetch inspection list data for a specific site ID
    return db_service.fetch_inspection_list_by_id(inspection_site_id)
