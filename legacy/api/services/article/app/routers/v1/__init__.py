from fastapi import APIRouter

from app.routers.v1 import articles

router = APIRouter()


router.include_router(
    articles.router,
    prefix="/articles",
    tags=["Articles"],
)
