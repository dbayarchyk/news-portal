from fastapi import APIRouter, status

from app.schemas.position import Position, PositionsPagination
from app.database.execute_query_with_connection import execute_query_with_connection
from app.controllers.positions.get_positions import get_positions

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=PositionsPagination
)
async def get_positions_handler() -> PositionsPagination:
    positions = execute_query_with_connection(get_positions)

    return PositionsPagination(
        page=1,
        page_size=len(positions),
        items_count=len(positions),
        items=positions
    )
