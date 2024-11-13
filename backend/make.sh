#!/bin/bash

# Define project structure
PROJECT_NAME="project"
APP_DIR="$PROJECT_NAME/app"
CONTROLLERS_DIR="$APP_DIR/controllers"
SERVICES_DIR="$APP_DIR/services"

# Create directory structure
echo "Creating project structure..."
mkdir -p $CONTROLLERS_DIR $SERVICES_DIR

# Create requirements.txt
echo "Creating requirements.txt..."
cat > $PROJECT_NAME/requirements.txt <<EOL
fastapi
psycopg2-binary
python-dotenv
uvicorn
EOL

# Create .env file
echo "Creating .env file..."
cat > $PROJECT_NAME/.env <<EOL
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
EOL

# Create app/config.py
echo "Creating config.py..."
cat > $APP_DIR/config.py <<EOL
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")

settings = Settings()
EOL

# Create app/db.py
echo "Creating db.py..."
cat > $APP_DIR/db.py <<EOL
import psycopg2
from psycopg2.extras import RealDictCursor
from .config import settings

def get_connection():
    conn = psycopg2.connect(settings.DATABASE_URL, cursor_factory=RealDictCursor)
    return conn
EOL

# Create app/services/my_service.py
echo "Creating my_service.py..."
cat > $SERVICES_DIR/my_service.py <<EOL
from ..db import get_connection

def get_data():
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM your_table;")
            data = cursor.fetchall()
            return data
    finally:
        conn.close()

def insert_data(payload):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "INSERT INTO your_table (column1, column2) VALUES (%s, %s) RETURNING id;",
                (payload["column1"], payload["column2"])
            )
            conn.commit()
            return cursor.fetchone()["id"]
    finally:
        conn.close()
EOL

# Create app/controllers/my_controller.py
echo "Creating my_controller.py..."
cat > $CONTROLLERS_DIR/my_controller.py <<EOL
from fastapi import APIRouter, HTTPException
from ..services import my_service

router = APIRouter()

@router.get("/data")
def read_data():
    data = my_service.get_data()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

@router.post("/data")
def create_data(payload: dict):
    inserted_id = my_service.insert_data(payload)
    return {"id": inserted_id}
EOL

# Create app/main.py
echo "Creating main.py..."
cat > $APP_DIR/main.py <<EOL
from fastapi import FastAPI
from .controllers import my_controller

app = FastAPI()

app.include_router(my_controller.router, prefix="/api/v1")
EOL

# Initialize Git repository if not already initialized
if [ ! -d "$PROJECT_NAME/.git" ]; then
    echo "Initializing Git repository..."
    cd $PROJECT_NAME
    git init
    cd ..
fi

echo "Project setup completed!"
echo "To start your FastAPI application, navigate to the project directory and run:"
echo "cd $PROJECT_NAME && uvicorn app.main:app --reload"

