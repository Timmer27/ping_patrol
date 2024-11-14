from fastapi import APIRouter, HTTPException
from services import db_service

router = APIRouter()

@router.get("/data")
def read_data():
    data = db_service.get_data()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

@router.post("/data")
def create_data(payload: dict):
    inserted_id = db_service.insert_data(payload)
    return {"id": inserted_id}
