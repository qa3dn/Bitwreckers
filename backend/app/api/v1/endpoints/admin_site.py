from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.security import require_admin
from app.models.site import SiteSetting, NavigationItem
from app.schemas.content import MediaAsset as MediaAssetSchema
from app.schemas.site import (
    SiteSetting as SiteSettingSchema,
    SiteSettingCreate,
    SiteSettingUpdate,
    NavigationItem as NavigationItemSchema,
    NavigationItemCreate,
    NavigationItemUpdate,
)

router = APIRouter(prefix="/admin", tags=["admin-site"]) 


# Site Settings
@router.get("/settings", response_model=list[SiteSettingSchema], dependencies=[Depends(require_admin)])
async def list_settings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SiteSetting))
    return result.scalars().all()


@router.post("/settings", response_model=SiteSettingSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_setting(data: SiteSettingCreate, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(SiteSetting).where(SiteSetting.key == data.key))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Setting key already exists")
    setting = SiteSetting(**data.dict())
    db.add(setting)
    await db.commit()
    await db.refresh(setting)
    return setting


@router.put("/settings/{setting_id}", response_model=SiteSettingSchema, dependencies=[Depends(require_admin)])
async def update_setting(setting_id: int, data: SiteSettingUpdate, db: AsyncSession = Depends(get_db)):
    setting = await db.get(SiteSetting, setting_id)
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(setting, key, value)
    await db.commit()
    await db.refresh(setting)
    return setting


@router.delete("/settings/{setting_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
async def delete_setting(setting_id: int, db: AsyncSession = Depends(get_db)):
    setting = await db.get(SiteSetting, setting_id)
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    await db.delete(setting)
    await db.commit()
    return None


# Navigation
@router.get("/navigation", response_model=list[NavigationItemSchema], dependencies=[Depends(require_admin)])
async def list_navigation(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(NavigationItem).order_by(NavigationItem.order_index))
    return result.scalars().all()


@router.post("/navigation", response_model=NavigationItemSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_navigation_item(data: NavigationItemCreate, db: AsyncSession = Depends(get_db)):
    item = NavigationItem(**data.dict())
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


@router.put("/navigation/{item_id}", response_model=NavigationItemSchema, dependencies=[Depends(require_admin)])
async def update_navigation_item(item_id: int, data: NavigationItemUpdate, db: AsyncSession = Depends(get_db)):
    item = await db.get(NavigationItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Navigation item not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(item, key, value)
    await db.commit()
    await db.refresh(item)
    return item


@router.delete("/navigation/{item_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
async def delete_navigation_item(item_id: int, db: AsyncSession = Depends(get_db)):
    item = await db.get(NavigationItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Navigation item not found")
    await db.delete(item)
    await db.commit()
    return None


# Media upload (local storage)
@router.post("/upload", response_model=MediaAssetSchema, dependencies=[Depends(require_admin)])
async def upload_media(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    import os
    from uuid import uuid4
    from app.core.config import settings
    from app.models.content import MediaAsset

    filename = file.filename or "upload.bin"
    ext = os.path.splitext(filename)[1]
    key = f"uploads/{uuid4().hex}{ext}"

    if settings.S3_ENABLED and settings.S3_BUCKET and settings.S3_ACCESS_KEY_ID:
        import boto3
        s3 = boto3.client(
            's3',
            region_name=settings.S3_REGION or None,
            aws_access_key_id=settings.S3_ACCESS_KEY_ID,
            aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
        )
        body = await file.read()
        s3.put_object(Bucket=settings.S3_BUCKET, Key=key, Body=body, ContentType=file.content_type or 'application/octet-stream')
        url = f"https://{settings.S3_BUCKET}.s3.amazonaws.com/{key}"
    else:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        path = os.path.join(settings.UPLOAD_DIR, os.path.basename(key))
        with open(path, "wb") as f:
            f.write(await file.read())
        url = f"/uploads/{os.path.basename(key)}"

    media = MediaAsset(url=url, type="file", alt_text=filename)
    db.add(media)
    await db.commit()
    await db.refresh(media)
    return media


