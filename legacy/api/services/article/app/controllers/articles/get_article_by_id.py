from typing import Optional
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.article import Article


def get_article_by_id(
    db_connection: connection,
    id: int,
    are_draft_allowed: bool,
    are_draft_allowed_for_current_user_id: bool,
    current_user_id: int,
    are_published_allowed: bool,
    are_published_allowed_for_current_user_id: bool,
    are_archived_allowed: bool,
    are_archived_allowed_for_current_user_id: bool,
) -> Optional[Article]:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute(
        """
            SELECT
                *
            FROM (
                SELECT
                    articles.id,
                    articles.title,
                    articles.content,
                    articles.author_id,
                    article_statuses.name AS status,
                    articles.created_date
                FROM
                    articles
                INNER JOIN
                    article_statuses
                    ON articles.status_id = article_statuses.id
                WHERE
                    CASE
                        -- When DRAFT articles are allowed.
                        WHEN article_statuses.name = 'DRAFT' AND %s
                            THEN
                                CASE
                                    -- Are articles allowed for a specific user id?
                                    WHEN %s
                                        THEN articles.author_id = %s
                                        ELSE TRUE
                                END
                        -- When PUBLISHED articles are allowed.
                        WHEN article_statuses.name = 'PUBLISHED' AND %s
                            THEN
                                CASE
                                    -- Are articles allowed for a specific user id?
                                    WHEN %s
                                        THEN articles.author_id = %s
                                        ELSE TRUE
                                END
                        -- When ARCHIVED articles are allowed.
                        WHEN article_statuses.name = 'ARCHIVED' AND %s
                            THEN
                                CASE
                                    -- Are articles allowed for a specific user id?
                                    WHEN %s
                                        THEN articles.author_id = %s
                                        ELSE TRUE
                                END
                        ELSE FALSE
                    END
            ) AS allowed_articles
            WHERE
                allowed_articles.id = %s;
        """,
        (
            are_draft_allowed,
            are_draft_allowed_for_current_user_id,
            current_user_id,
            are_published_allowed,
            are_published_allowed_for_current_user_id,
            current_user_id,
            are_archived_allowed,
            are_archived_allowed_for_current_user_id,
            current_user_id,
            id,
        ),
    )

    article_row = cursor.fetchone()
    cursor.close()

    if article_row is None:
        return None
    else:
        return Article(
            id=article_row["id"],
            title=article_row["title"],
            content=article_row["content"],
            author_id=article_row["author_id"],
            status=article_row["status"],
            created_date=article_row["created_date"],
        )
