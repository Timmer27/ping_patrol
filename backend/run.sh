#!/bin/bash

# Start FastAPI server with uvicorn in reload mode
echo "Starting FastAPI server with live reload..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
