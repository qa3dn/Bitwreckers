from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.content import Page
from app.models.site import SiteSetting, NavigationItem
from app.schemas.content import Page as PageSchema
from app.schemas.site import SiteSetting as SiteSettingSchema, NavigationItem as NavigationItemSchema

router = APIRouter(prefix="/content", tags=["content"])


@router.get("/pages/{slug}", response_model=PageSchema)
async def get_page_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Page).where(Page.slug == slug))
    page = result.scalar_one_or_none()
    if not page or not page.is_published:
        raise HTTPException(status_code=404, detail="Page not found")
    return page


@router.get("/settings", response_model=list[SiteSettingSchema])
async def get_settings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SiteSetting))
    return result.scalars().all()


@router.get("/navigation", response_model=list[NavigationItemSchema])
async def get_navigation(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(NavigationItem).order_by(NavigationItem.order_index))
    return result.scalars().all()


