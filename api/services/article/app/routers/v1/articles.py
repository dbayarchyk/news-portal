from typing import Optional, List
from fastapi import APIRouter, status, Query, Depends, HTTPException
from datetime import datetime

from app.schemas.article import Article, ArticlesPagination, ArticleInput
from app.database.execute_query_with_connection import execute_query_with_connection
from app.controllers.articles.get_articles import get_articles
from app.controllers.articles.get_articles_count import get_articles_count
from app.controllers.articles.create_article import create_article
from app.controllers.articles.get_article_by_id import get_article_by_id
from app.controllers.articles.update_article import update_article
from app.controllers.articles.publish_article import publish_article
from app.controllers.articles.archive_article import archive_article
from app.auth.access_token import get_access_token_payload
from app.auth.permissions import check_permissions, check_permissions_to_update_article, check_permissions_to_publish_article, check_permissions_to_archive_article

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=ArticlesPagination
)
async def get_articles_handler(
    page: int = 1,
    page_size: int = 20,
    status: Optional[str] = None,
    access_token_payload=Depends(get_access_token_payload)
) -> ArticlesPagination:
    check_permissions(
        access_token_payload,
        [
            "ARTICLE_VIEW_ALL_DRAFT",
            "ARTICLE_VIEW_OWN_DRAFT",
            "ARTICLE_VIEW_ALL_PUBLISHED",
            "ARTICLE_VIEW_OWN_PUBLISHED",
            "ARTICLE_VIEW_ALL_ARCHIVED",
            "ARTICLE_VIEW_OWN_ARCHIVED",
        ]
    )

    permissions = access_token_payload.get("permissions", [])

    are_draft_allowed = "ARTICLE_VIEW_ALL_DRAFT" in permissions or "ARTICLE_VIEW_OWN_DRAFT" in permissions,
    are_draft_allowed_for_current_user_id = "ARTICLE_VIEW_ALL_DRAFT" not in permissions
    current_user_id = access_token_payload.get("sub")
    are_published_allowed = "ARTICLE_VIEW_ALL_PUBLISHED" in permissions or "ARTICLE_VIEW_OWN_PUBLISHED" in permissions
    are_published_allowed_for_current_user_id = "ARTICLE_VIEW_ALL_PUBLISHED" not in permissions
    are_archived_allowed = "ARTICLE_VIEW_ALL_ARCHIVED" in permissions or "ARTICLE_VIEW_OWN_ARCHIVED" in permissions
    are_archived_allowed_for_current_user_id = "ARTICLE_VIEW_ALL_ARCHIVED" not in permissions

    articles_count = execute_query_with_connection(
        lambda db_connection: get_articles_count(
            db_connection=db_connection,
            are_draft_allowed=are_draft_allowed,
            are_draft_allowed_for_current_user_id=are_draft_allowed_for_current_user_id,
            current_user_id=current_user_id,
            are_published_allowed=are_published_allowed,
            are_published_allowed_for_current_user_id=are_published_allowed_for_current_user_id,
            are_archived_allowed=are_archived_allowed,
            are_archived_allowed_for_current_user_id=are_archived_allowed_for_current_user_id,
            status=status,
        )
    )
    articles = execute_query_with_connection(
        lambda db_connection: get_articles(
            db_connection=db_connection,
            are_draft_allowed=are_draft_allowed,
            are_draft_allowed_for_current_user_id=are_draft_allowed_for_current_user_id,
            current_user_id=current_user_id,
            are_published_allowed=are_published_allowed,
            are_published_allowed_for_current_user_id=are_published_allowed_for_current_user_id,
            are_archived_allowed=are_archived_allowed,
            are_archived_allowed_for_current_user_id=are_archived_allowed_for_current_user_id,
            page=page,
            page_size=page_size,
            status=status,
        )
    )

    return ArticlesPagination(
        page=page,
        page_size=page_size,
        items_count=articles_count,
        items=articles
    )


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=Article
)
async def post_article_handler(
    article_input: ArticleInput,
    access_token_payload=Depends(get_access_token_payload)
) -> Article:
    check_permissions(access_token_payload, ["ARTICLE_CREATE"])

    created_article = execute_query_with_connection(
        lambda db_connection: create_article(
            db_connection=db_connection,
            author_id=access_token_payload["sub"],
            article_input=article_input,
            created_date=datetime.now(),
        )
    )

    return created_article


@router.get(
    "/{id}/",
    status_code=status.HTTP_200_OK,
    response_model=Article
)
async def get_article_by_id_handler(
    id: int,
    access_token_payload=Depends(get_access_token_payload)
) -> Article:
    check_permissions(
        access_token_payload,
        [
            "ARTICLE_VIEW_ALL_DRAFT",
            "ARTICLE_VIEW_OWN_DRAFT",
            "ARTICLE_VIEW_ALL_PUBLISHED",
            "ARTICLE_VIEW_OWN_PUBLISHED",
            "ARTICLE_VIEW_ALL_ARCHIVED",
            "ARTICLE_VIEW_OWN_ARCHIVED",
        ]
    )

    permissions = access_token_payload.get("permissions", [])

    are_draft_allowed = "ARTICLE_VIEW_ALL_DRAFT" in permissions or "ARTICLE_VIEW_OWN_DRAFT" in permissions,
    are_draft_allowed_for_current_user_id = "ARTICLE_VIEW_ALL_DRAFT" not in permissions
    current_user_id = access_token_payload.get("sub")
    are_published_allowed = "ARTICLE_VIEW_ALL_PUBLISHED" in permissions or "ARTICLE_VIEW_OWN_PUBLISHED" in permissions
    are_published_allowed_for_current_user_id = "ARTICLE_VIEW_ALL_PUBLISHED" not in permissions
    are_archived_allowed = "ARTICLE_VIEW_ALL_ARCHIVED" in permissions or "ARTICLE_VIEW_OWN_ARCHIVED" in permissions
    are_archived_allowed_for_current_user_id = "ARTICLE_VIEW_ALL_ARCHIVED" not in permissions

    article = execute_query_with_connection(
        lambda db_connection: get_article_by_id(
            db_connection=db_connection,
            id=id,
            are_draft_allowed=are_draft_allowed,
            are_draft_allowed_for_current_user_id=are_draft_allowed_for_current_user_id,
            current_user_id=current_user_id,
            are_published_allowed=are_published_allowed,
            are_published_allowed_for_current_user_id=are_published_allowed_for_current_user_id,
            are_archived_allowed=are_archived_allowed,
            are_archived_allowed_for_current_user_id=are_archived_allowed_for_current_user_id,
        )
    )

    if article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )

    return article


@router.put(
    "/{id}/",
    status_code=status.HTTP_200_OK,
    response_model=Article
)
async def update_article_by_id_handler(
    id: int,
    article_input: ArticleInput,
    access_token_payload=Depends(get_access_token_payload)
) -> Article:
    current_user_id = access_token_payload.get("sub")

    initial_article = execute_query_with_connection(
        lambda db_connection: get_article_by_id(
            db_connection=db_connection,
            id=id,
            are_draft_allowed=True,
            are_draft_allowed_for_current_user_id=True,
            current_user_id=current_user_id,
            are_published_allowed=True,
            are_published_allowed_for_current_user_id=True,
            are_archived_allowed=True,
            are_archived_allowed_for_current_user_id=True,
        )
    )

    if initial_article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )

    check_permissions_to_update_article(
        current_user_id=current_user_id,
        article=initial_article,
        access_token_payload=access_token_payload,
    )

    updated_article = execute_query_with_connection(
        lambda db_connection: update_article(
            db_connection=db_connection,
            id=id,
            article_input=article_input,
        )
    )

    return updated_article


@router.post(
    "/{id}/publish/",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=None,
)
async def publish_article_by_id_handler(
    id: int,
    access_token_payload=Depends(get_access_token_payload)
) -> None:
    current_user_id = access_token_payload.get("sub")

    initial_article = execute_query_with_connection(
        lambda db_connection: get_article_by_id(
            db_connection=db_connection,
            id=id,
            are_draft_allowed=True,
            are_draft_allowed_for_current_user_id=True,
            current_user_id=current_user_id,
            are_published_allowed=True,
            are_published_allowed_for_current_user_id=True,
            are_archived_allowed=True,
            are_archived_allowed_for_current_user_id=True,
        )
    )

    if initial_article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )

    check_permissions_to_publish_article(
        current_user_id=current_user_id,
        article=initial_article,
        access_token_payload=access_token_payload,
    )

    execute_query_with_connection(
        lambda db_connection: publish_article(
            db_connection=db_connection,
            id=id,
        )
    )


@router.post(
    "/{id}/archive/",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=None,
)
async def archive_article_by_id_handler(
    id: int,
    access_token_payload=Depends(get_access_token_payload)
) -> None:
    current_user_id = access_token_payload.get("sub")

    initial_article = execute_query_with_connection(
        lambda db_connection: get_article_by_id(
            db_connection=db_connection,
            id=id,
            are_draft_allowed=True,
            are_draft_allowed_for_current_user_id=True,
            current_user_id=current_user_id,
            are_published_allowed=True,
            are_published_allowed_for_current_user_id=True,
            are_archived_allowed=True,
            are_archived_allowed_for_current_user_id=True,
        )
    )

    if initial_article is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found",
        )

    check_permissions_to_archive_article(
        current_user_id=current_user_id,
        article=initial_article,
        access_token_payload=access_token_payload,
    )

    execute_query_with_connection(
        lambda db_connection: archive_article(
            db_connection=db_connection,
            id=id,
        )
    )
