from fastapi import APIRouter, status

from app.schemas.technology import Technology, TechnologiesPagination
from app.database.execute_query_with_connection import execute_query_with_connection
from app.controllers.technologies.get_technologies import get_technologies

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=TechnologiesPagination
)
async def get_technologies_handler() -> TechnologiesPagination:
    technologies = execute_query_with_connection(get_technologies)

    return TechnologiesPagination(
        page=1,
        page_size=len(technologies),
        items_count=len(technologies),
        items=technologies
    )
