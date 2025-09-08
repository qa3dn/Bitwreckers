from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.security import require_admin
from app.models.content import Page, Section, ContentBlock, MediaAsset
from app.schemas.content import (
    Page as PageSchema,
    PageCreate,
    PageUpdate,
    Section as SectionSchema,
    SectionCreate,
    SectionUpdate,
    ContentBlock as ContentBlockSchema,
    ContentBlockCreate,
    ContentBlockUpdate,
    MediaAsset as MediaAssetSchema,
    MediaAssetCreate,
)

router = APIRouter(prefix="/admin", tags=["admin-content"]) 


# Pages
@router.get("/pages", response_model=list[PageSchema], dependencies=[Depends(require_admin)])
async def list_pages(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Page))
    return result.scalars().all()


@router.post("/pages", response_model=PageSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_page(data: PageCreate, db: AsyncSession = Depends(get_db)):
    page = Page(**data.dict())
    db.add(page)
    await db.commit()
    await db.refresh(page)
    return page


@router.get("/pages/{page_id}", response_model=PageSchema, dependencies=[Depends(require_admin)])
async def get_page(page_id: int, db: AsyncSession = Depends(get_db)):
    page = await db.get(Page, page_id)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    return page


@router.put("/pages/{page_id}", response_model=PageSchema, dependencies=[Depends(require_admin)])
async def update_page(page_id: int, data: PageUpdate, db: AsyncSession = Depends(get_db)):
    page = await db.get(Page, page_id)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(page, key, value)
    await db.commit()
    await db.refresh(page)
    return page


@router.delete("/pages/{page_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
async def delete_page(page_id: int, db: AsyncSession = Depends(get_db)):
    page = await db.get(Page, page_id)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    await db.delete(page)
    await db.commit()
    return None


# Sections
@router.get("/sections", response_model=list[SectionSchema], dependencies=[Depends(require_admin)])
async def list_sections(page_id: int | None = None, db: AsyncSession = Depends(get_db)):
    query = select(Section)
    if page_id is not None:
        query = query.where(Section.page_id == page_id).order_by(Section.order_index)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/sections", response_model=SectionSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_section(data: SectionCreate, db: AsyncSession = Depends(get_db)):
    section = Section(**data.dict())
    db.add(section)
    await db.commit()
    await db.refresh(section)
    return section


@router.put("/sections/{section_id}", response_model=SectionSchema, dependencies=[Depends(require_admin)])
async def update_section(section_id: int, data: SectionUpdate, db: AsyncSession = Depends(get_db)):
    section = await db.get(Section, section_id)
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(section, key, value)
    await db.commit()
    await db.refresh(section)
    return section


@router.delete("/sections/{section_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
async def delete_section(section_id: int, db: AsyncSession = Depends(get_db)):
    section = await db.get(Section, section_id)
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    await db.delete(section)
    await db.commit()
    return None


# Content Blocks
@router.get("/blocks", response_model=list[ContentBlockSchema], dependencies=[Depends(require_admin)])
async def list_blocks(section_id: int | None = None, db: AsyncSession = Depends(get_db)):
    query = select(ContentBlock)
    if section_id is not None:
        query = query.where(ContentBlock.section_id == section_id).order_by(ContentBlock.order_index)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/blocks", response_model=ContentBlockSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_block(data: ContentBlockCreate, db: AsyncSession = Depends(get_db)):
    block = ContentBlock(**data.dict())
    db.add(block)
    await db.commit()
    await db.refresh(block)
    return block


@router.put("/blocks/{block_id}", response_model=ContentBlockSchema, dependencies=[Depends(require_admin)])
async def update_block(block_id: int, data: ContentBlockUpdate, db: AsyncSession = Depends(get_db)):
    block = await db.get(ContentBlock, block_id)
    if not block:
        raise HTTPException(status_code=404, detail="Block not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(block, key, value)
    await db.commit()
    await db.refresh(block)
    return block


@router.delete("/blocks/{block_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
async def delete_block(block_id: int, db: AsyncSession = Depends(get_db)):
    block = await db.get(ContentBlock, block_id)
    if not block:
        raise HTTPException(status_code=404, detail="Block not found")
    await db.delete(block)
    await db.commit()
    return None


# Media Assets
@router.post("/media", response_model=MediaAssetSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_media(data: MediaAssetCreate, db: AsyncSession = Depends(get_db)):
    media = MediaAsset(**data.dict())
    db.add(media)
    await db.commit()
    await db.refresh(media)
    return media


@router.get("/media", response_model=list[MediaAssetSchema], dependencies=[Depends(require_admin)])
async def list_media(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MediaAsset))
    return result.scalars().all()


@router.delete("/media/{media_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
async def delete_media(media_id: int, db: AsyncSession = Depends(get_db)):
    media = await db.get(MediaAsset, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    await db.delete(media)
    await db.commit()
    return None


