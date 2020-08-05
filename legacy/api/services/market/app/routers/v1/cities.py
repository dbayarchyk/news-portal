from fastapi import APIRouter, status

from app.schemas.city import City, CitiesPagination
from app.database.execute_query_with_connection import execute_query_with_connection
from app.controllers.cities.get_cities import get_cities

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=CitiesPagination
)
async def get_cities_handler() -> CitiesPagination:
    cities = execute_query_with_connection(get_cities)

    return CitiesPagination(
        page=1,
        page_size=len(cities),
        items_count=len(cities),
        items=cities
    )
