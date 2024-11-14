from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import my_controller, patrol_controller, inspection_controller

app = FastAPI()

# Define allowed origins (e.g., where your frontend is running, such as localhost)
# origins = [
#     "http://localhost:3000",  # React frontend running on port 3000
#     "http://127.0.0.1:3000",  # Alternate localhost format
# ]

# Add CORS middleware to allow requests from specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(my_controller.router, prefix="/api/test")
app.include_router(patrol_controller.router, prefix="/api/v1")
app.include_router(inspection_controller.router, prefix="/api/v1/car")
