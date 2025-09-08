from fastapi import APIRouter
from app.api.v1.endpoints import auth, admin_content, admin_site, content

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(admin_content.router)
api_router.include_router(admin_site.router)
api_router.include_router(content.router)
