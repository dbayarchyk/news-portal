from typing import Optional, List
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.article import Article


def get_articles(
    db_connection: connection,
    are_draft_allowed: bool,
    are_draft_allowed_for_current_user_id: bool,
    current_user_id: int,
    are_published_allowed: bool,
    are_published_allowed_for_current_user_id: bool,
    are_archived_allowed: bool,
    are_archived_allowed_for_current_user_id: bool,
    page: int,
    page_size: int,
    status: Optional[str] = None,
) -> List[Article]:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    start_from = (page - 1) * page_size
    has_status_filter = status is not None

    cursor.execute("""
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
                CASE
                    -- Has status filter?
                    WHEN %s
                        THEN allowed_articles.status = %s
                        ELSE TRUE
                END
            ORDER BY allowed_articles.created_date DESC
            LIMIT %s
            OFFSET %s;
        """, (
        are_draft_allowed,
        are_draft_allowed_for_current_user_id,
        current_user_id,
        are_published_allowed,
        are_published_allowed_for_current_user_id,
        current_user_id,
        are_archived_allowed,
        are_archived_allowed_for_current_user_id,
        current_user_id,
        has_status_filter,
        status,
        page_size,
        start_from,
    ))

    article_rows = cursor.fetchall()
    cursor.close()

    return [
        Article(
            id=article_row['id'],
            title=article_row['title'],
            content=article_row['content'],
            author_id=article_row['author_id'],
            status=article_row['status'],
            created_date=article_row['created_date'],
        )
        for article_row
        in article_rows
    ]
