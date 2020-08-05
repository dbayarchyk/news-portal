from typing import List

from fastapi import HTTPException, status
from app.schemas.article import Article


def check_permissions(access_token_payload, required_permissions: List[str]):
    all_permissions = access_token_payload.get("permissions", [])

    if any(permission in all_permissions for permission in required_permissions) is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )


def check_permissions_to_update_article(
    current_user_id: int,
    article: Article,
    access_token_payload,
):
    is_own_article = article.author_id == current_user_id

    if article.status == "DRAFT":
        try:
            check_permissions(
                access_token_payload,
                ["ARTICLE_UPDATE_ALL_DRAFT"],
            )
        except (HTTPException) as error:
            if is_own_article:
                check_permissions(
                    access_token_payload,
                    ["ARTICLE_UPDATE_OWN_DRAFT"],
                )
            else:
                raise error
    elif article.status == "PUBLISHED":
        try:
            check_permissions(
                access_token_payload,
                ["ARTICLE_UPDATE_ALL_PUBLISHED"],
            )
        except (HTTPException) as error:
            if is_own_article:
                check_permissions(
                    access_token_payload,
                    ["ARTICLE_UPDATE_OWN_PUBLISHED"],
                )
            else:
                raise error
    elif article.status == "ARCHIVED":
        try:
            check_permissions(
                access_token_payload,
                ["ARTICLE_UPDATE_ALL_ARCHIVED"],
            )
        except (HTTPException) as error:
            if is_own_article:
                check_permissions(
                    access_token_payload,
                    ["ARTICLE_UPDATE_OWN_ARCHIVED"],
                )
            else:
                raise error
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )


def check_permissions_to_publish_article(
    current_user_id: int,
    article: Article,
    access_token_payload,
):
    is_own_article = article.author_id == current_user_id

    if article.status == "DRAFT":
        try:
            check_permissions(
                access_token_payload,
                ["ARTICLE_PUBLISH_ALL_DRAFT"],
            )
        except (HTTPException) as error:
            if is_own_article:
                check_permissions(
                    access_token_payload,
                    ["ARTICLE_PUBLISH_OWN_DRAFT"],
                )
            else:
                raise error
    elif article.status == "PUBLISHED":
        try:
            check_permissions(
                access_token_payload,
                ["ARTICLE_PUBLISH_ALL_PUBLISHED"],
            )
        except (HTTPException) as error:
            if is_own_article:
                check_permissions(
                    access_token_payload,
                    ["ARTICLE_PUBLISH_OWN_PUBLISHED"],
                )
            else:
                raise error
    elif article.status == "ARCHIVED":
        try:
            check_permissions(
                access_token_payload,
                ["ARTICLE_PUBLISH_ALL_ARCHIVED"],
            )
        except (HTTPException) as error:
            if is_own_article:
                check_permissions(
                    access_token_payload,
                    ["ARTICLE_PUBLISH_OWN_ARCHIVED"],
                )
            else:
                raise error
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )


def check_permissions_to_archive_article(
    current_user_id: int,
    article: Article,
    access_token_payload,
):
    if article.status != "PUBLISHED":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    is_own_article = article.author_id == current_user_id

    try:
        check_permissions(
            access_token_payload,
            ["ARTICLE_ARCHIVE_ALL_PUBLISHED"]
        )
    except (HTTPException) as error:
        if is_own_article:
            check_permissions(
                access_token_payload,
                ["ARTICLE_ARCHIVE_OWN_PUBLISHED"]
            )
        else:
            raise error
