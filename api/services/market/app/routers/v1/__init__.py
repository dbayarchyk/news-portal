from fastapi import APIRouter

from app.routers.v1 import cities
from app.routers.v1 import positions
from app.routers.v1 import technologies
from app.routers.v1 import salaries

router = APIRouter()


router.include_router(
    cities.router,
    prefix="/cities",
    tags=["Cities"],
)
router.include_router(
    positions.router,
    prefix="/positions",
    tags=["Positions"],
)
router.include_router(
    technologies.router,
    prefix="/technologies",
    tags=["Technologies"],
)
router.include_router(
    salaries.router,
    prefix="/salaries",
    tags=["Salaries"],
)
