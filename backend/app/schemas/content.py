from typing import Optional, List, Any
from pydantic import BaseModel, Field


class MediaAssetBase(BaseModel):
    url: str
    type: str
    alt_text: Optional[str] = None


class MediaAssetCreate(MediaAssetBase):
    pass


class MediaAsset(MediaAssetBase):
    id: int

    class Config:
        from_attributes = True


class ContentBlockBase(BaseModel):
    type: str
    content: Optional[str] = None  # JSON-string payload
    media_asset_id: Optional[int] = None
    order_index: int = 0


class ContentBlockCreate(ContentBlockBase):
    section_id: int


class ContentBlockUpdate(BaseModel):
    type: Optional[str] = None
    content: Optional[str] = None
    media_asset_id: Optional[int] = None
    order_index: Optional[int] = None


class ContentBlock(ContentBlockBase):
    id: int

    class Config:
        from_attributes = True


class SectionBase(BaseModel):
    key: str
    heading: Optional[str] = None
    subheading: Optional[str] = None
    order_index: int = 0


class SectionCreate(SectionBase):
    page_id: int


class SectionUpdate(BaseModel):
    key: Optional[str] = None
    heading: Optional[str] = None
    subheading: Optional[str] = None
    order_index: Optional[int] = None


class Section(SectionBase):
    id: int
    blocks: List[ContentBlock] = []

    class Config:
        from_attributes = True


class PageBase(BaseModel):
    slug: str
    title: str
    description: Optional[str] = None
    is_published: bool = True


class PageCreate(PageBase):
    pass


class PageUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    is_published: Optional[bool] = None


class Page(PageBase):
    id: int
    sections: List[Section] = []

    class Config:
        from_attributes = True


