from fastapi import APIRouter

from app.routers.v1 import comments

router = APIRouter()


router.include_router(
    comments.router,
    prefix="/comments",
    tags=["Comments"],
)
