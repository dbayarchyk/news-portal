from fastapi import Depends, APIRouter, HTTPException, status

from app.schemas.user import User
from app.controllers.users.get_user_by_id import get_user_by_id
from app.database.execute_query_with_connection import execute_query_with_connection

router = APIRouter()

@router.get(
    "/{id}/",
    status_code=status.HTTP_200_OK,
    response_model=User,
)
async def get_user_by_id_handler(id: int) -> User:
    user = execute_query_with_connection(
        lambda db_connection: get_user_by_id(
            db_connection,
            id,
        )
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    return user