from fastapi import FastAPI
from controllers import my_controller

app = FastAPI()

app.include_router(my_controller.router, prefix="/api/v1")
