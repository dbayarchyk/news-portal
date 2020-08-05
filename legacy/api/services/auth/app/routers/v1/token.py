from typing import Optional
from fastapi import Depends, APIRouter, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm

from app.database.execute_query_with_connection import execute_query_with_connection
from app.controllers.users.get_user_with_permissions_and_role_by_username import get_user_with_permissions_and_role_by_username
from app.controllers.users.get_user_with_permissions_and_role_by_id import get_user_with_permissions_and_role_by_id
from app.controllers.users.get_visitor_permissions_and_role import get_visitor_permissions_and_role
from app.utils.tokens import create_access_token, create_refresh_token, decode_refresh_token
from app.schemas.token import Token

router = APIRouter()


@router.post(
    "/access/",
    status_code=status.HTTP_200_OK,
    response_model=Token,
)
async def get_access_token_handler(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    user = execute_query_with_connection(
        lambda db_connection: get_user_with_permissions_and_role_by_username(
            db_connection,
            form_data.username,
        )
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"username": "There is no user with this username or email."}
        )

    if form_data.password != user["password"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"password": "The password is incorrect."}
        )

    refresh_token = create_refresh_token(user)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
    )

    access_token = create_access_token(user)

    return Token(
        access_token=access_token,
        token_type="Bearer",
    )


@router.post(
    "/access/visitor/",
    status_code=status.HTTP_200_OK,
    response_model=Token,
)
async def get_access_token_for_visitor_handler() -> Token:
    visitor_permissions_and_role = execute_query_with_connection(
        lambda db_connection: get_visitor_permissions_and_role(
            db_connection,
        )
    )

    access_token = create_access_token(visitor_permissions_and_role)

    return Token(
        access_token=access_token,
        token_type="Bearer",
    )


@router.get(
    "/access/refresh/",
    status_code=status.HTTP_200_OK,
    response_model=Token,
)
async def refresh_access_token_handler(
    request: Request,
    response: Response,
) -> Token:
    old_refresh_token = request.cookies.get("refresh_token")

    try:
        refresh_token_payload = decode_refresh_token(old_refresh_token)
    except (Exception,):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token is invalid."
        )

    user = execute_query_with_connection(
        lambda db_connection: get_user_with_permissions_and_role_by_id(
            db_connection,
            refresh_token_payload["sub"],
        )
    )
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not exist."
        )

    new_refresh_token = create_refresh_token(user)

    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
    )

    new_access_token = create_access_token(user)

    return Token(
        access_token=new_access_token,
        token_type="Bearer",
    )

@router.get(
    "/access/forget/",
    status_code=status.HTTP_200_OK,
    response_model=Token,
)
async def forget_refresh_token_handler(response: Response):
    response.set_cookie(
        key="refresh_token",
        value="",
        expires=0,
        httponly=True,
    )