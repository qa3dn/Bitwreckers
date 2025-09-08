from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class MediaAsset(Base):
    __tablename__ = "media_assets"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(1000), nullable=False)
    type = Column(String(50), nullable=False)  # image, video, file
    alt_text = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Page(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    sections = relationship("Section", back_populates="page", cascade="all, delete-orphan")


class Section(Base):
    __tablename__ = "sections"

    id = Column(Integer, primary_key=True, index=True)
    page_id = Column(Integer, ForeignKey("pages.id", ondelete="CASCADE"), nullable=False)
    key = Column(String(100), index=True, nullable=False)  # e.g., hero, features, footer
    heading = Column(String(255), nullable=True)
    subheading = Column(Text, nullable=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    page = relationship("Page", back_populates="sections")
    blocks = relationship("ContentBlock", back_populates="section", cascade="all, delete-orphan")


class ContentBlock(Base):
    __tablename__ = "content_blocks"

    id = Column(Integer, primary_key=True, index=True)
    section_id = Column(Integer, ForeignKey("sections.id", ondelete="CASCADE"), nullable=False)
    type = Column(String(50), nullable=False)  # text, image, card, list, cta
    content = Column(Text, nullable=True)  # JSON string for flexible content
    media_asset_id = Column(Integer, ForeignKey("media_assets.id"), nullable=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    section = relationship("Section", back_populates="blocks")
    media_asset = relationship("MediaAsset")


