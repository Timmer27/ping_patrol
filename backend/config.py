import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")
    DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
    DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")
    DATABASE_USER = os.getenv("DATABASE_USER", "postgres")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "postgres")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "candr_dev_historical")
    SSH_HOST = os.getenv("SSH_HOST", "121.134.155.131")
    SSH_PORT = os.getenv("SSH_PORT", "10022")
    SSH_USER = os.getenv("SSH_USER", "tim")
    SSH_PRIVATE_KEY = os.getenv("SSH_PRIVATE_KEY", "/Users/jongholee/Desktop/tim_key/tim_key")


settings = Settings()
