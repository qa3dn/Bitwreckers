from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ARRAY
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="student")  # student, developer, admin
    avatar = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    skills = Column(ARRAY(String), nullable=True)
    github = Column(String(500), nullable=True)
    linkedin = Column(String(500), nullable=True)
    portfolio = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    email_verified = Column(Boolean, default=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
