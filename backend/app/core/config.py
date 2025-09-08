from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Bitwreckers API"
    VERSION: str = "1.0.0"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    # Use SQLite by default for easy local runs; override in .env for Postgres
    DATABASE_URL: str = "sqlite+aiosqlite:///./dev.db"
    DATABASE_URL_TEST: str = "postgresql://user:password@localhost/bitwreckers_test"
    
    # Security
    SECRET_KEY: str = "your-super-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "http://localhost:5174"]
    
    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "your-email@gmail.com"
    SMTP_PASSWORD: str = "your-app-password"
    EMAIL_FROM: str = "Bitwreckers <noreply@bitwreckers.com>"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # File Upload
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE: int = 5242880  # 5MB
    # S3
    S3_ENABLED: bool = False
    S3_BUCKET: str = ""
    S3_REGION: str = ""
    S3_ACCESS_KEY_ID: str = ""
    S3_SECRET_ACCESS_KEY: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
