from fastapi import APIRouter, HTTPException
from services import db_service
from logger_setup import setup_logger

logging = setup_logger(log_file_path='./crawling_controller.log')

router = APIRouter()

@router.get("/crawling_list")
def fetch_crawling_list_data():
    # Fetch all crawling list data
    return db_service.fetch_crawling_list_data()

# @router.get("/crawling_list/{crawling_site_id}")
# def fetch_crawling_list_by_id(crawling_site_id: int):
#     # Fetch crawling list data for a specific site ID
#     return db_service.fetch_crawling_list_by_id(crawling_site_id)
