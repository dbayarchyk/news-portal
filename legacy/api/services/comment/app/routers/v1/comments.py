from typing import Optional
from fastapi import APIRouter, status, Query, Depends
from datetime import datetime

from app.schemas.comment import Comment, CommentsPagination, NewComment
from app.database.execute_query_with_connection import execute_query_with_connection
from app.controllers.comments.get_comments import get_comments
from app.controllers.comments.get_comments_count import get_comments_count
from app.controllers.comments.create_comment import create_comment
from app.auth.access_token import get_access_token_payload
from app.auth.permissions import check_permissions

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=CommentsPagination
)
async def get_comments_handler(
    page: int = 1,
    page_size: int = 20,
    article_id: Optional[int] = None,
    access_token_payload=Depends(get_access_token_payload)
) -> CommentsPagination:
    check_permissions(access_token_payload, ["COMMENT_VIEW_ALL"])

    comments_count = execute_query_with_connection(
        lambda db_connection: get_comments_count(db_connection, article_id)
    )
    comments = execute_query_with_connection(
        lambda db_connection: get_comments(
            db_connection=db_connection,
            page=page,
            page_size=page_size,
            article_id=article_id,
        )
    )

    return CommentsPagination(
        page=page,
        page_size=page_size,
        items_count=comments_count,
        items=comments
    )


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=Comment
)
async def post_comment_handler(
    new_comment: NewComment,
    access_token_payload=Depends(get_access_token_payload)
) -> Comment:
    check_permissions(access_token_payload, ["COMMENT_CREATE"])

    created_comment = execute_query_with_connection(
        lambda db_connection: create_comment(
            db_connection=db_connection,
            author_id=access_token_payload['sub'],
            new_comment=new_comment,
            created_date=datetime.now(),
        )
    )

    return created_comment
