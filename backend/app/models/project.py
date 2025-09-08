from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ARRAY, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    short_description = Column(String(500), nullable=True)
    category = Column(String(50), nullable=False)  # web-development, mobile-development, etc.
    technologies = Column(ARRAY(String), nullable=True)
    images = Column(ARRAY(String), nullable=True)
    demo_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    status = Column(String(20), default="in-progress")  # in-progress, completed, on-hold, cancelled
    featured = Column(Boolean, default=False)
    budget = Column(Float, nullable=True)
    client_name = Column(String(100), nullable=True)
    client_email = Column(String(255), nullable=True)
    client_company = Column(String(100), nullable=True)
    tags = Column(ARRAY(String), nullable=True)
    views = Column(Integer, default=0)
    rating_average = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    
    # Foreign keys
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    start_date = Column(DateTime(timezone=True), server_default=func.now())
    end_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    creator = relationship("User", back_populates="projects")
    likes = relationship("ProjectLike", back_populates="project")
    comments = relationship("Comment", back_populates="project")
