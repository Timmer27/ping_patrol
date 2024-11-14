from fastapi import FastAPI
from controllers import my_controller, patrol_controller

app = FastAPI()

app.include_router(my_controller.router, prefix="/api/test")
app.include_router(patrol_controller.router, prefix="/api/v1")
