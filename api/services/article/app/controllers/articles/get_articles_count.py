from typing import Optional
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor


def get_articles_count(
    db_connection: connection,
    are_draft_allowed: bool,
    are_draft_allowed_for_current_user_id: bool,
    current_user_id: int,
    are_published_allowed: bool,
    are_published_allowed_for_current_user_id: bool,
    are_archived_allowed: bool,
    are_archived_allowed_for_current_user_id: bool,
    status: Optional[str] = None,
) -> int:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    has_status_filter = status is not None

    cursor.execute("""
        SELECT
            count(*) AS articles_count
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
    ))

    result = cursor.fetchone()
    cursor.close()

    return result['articles_count']
