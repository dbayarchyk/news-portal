from fastapi import APIRouter

from app.routers.v1 import token, users

router = APIRouter()


router.include_router(
    token.router,
    prefix="/token",
    tags=["Token"],
)
router.include_router(
    users.router,
    prefix="/users",
    tags=["Users"],
)
