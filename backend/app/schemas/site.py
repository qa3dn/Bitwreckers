from typing import Optional, List
from pydantic import BaseModel


class SiteSettingBase(BaseModel):
    key: str
    value: Optional[str] = None


class SiteSettingCreate(SiteSettingBase):
    pass


class SiteSettingUpdate(BaseModel):
    value: Optional[str] = None


class SiteSetting(SiteSettingBase):
    id: int

    class Config:
        from_attributes = True


class NavigationItemBase(BaseModel):
    label: str
    href: str
    order_index: int = 0
    is_visible: bool = True
    location: str = "main"


class NavigationItemCreate(NavigationItemBase):
    pass


class NavigationItemUpdate(BaseModel):
    label: Optional[str] = None
    href: Optional[str] = None
    order_index: Optional[int] = None
    is_visible: Optional[bool] = None
    location: Optional[str] = None


class NavigationItem(NavigationItemBase):
    id: int

    class Config:
        from_attributes = True


