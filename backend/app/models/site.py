from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base


class SiteSetting(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class NavigationItem(Base):
    __tablename__ = "navigation_items"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(100), nullable=False)
    href = Column(String(255), nullable=False)
    order_index = Column(Integer, default=0)
    is_visible = Column(Boolean, default=True)
    location = Column(String(50), default="main")  # main, footer
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


