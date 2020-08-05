from typing import Optional
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor


def get_comments_count(db_connection: connection, article_id: Optional[int] = None) -> int:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    has_article_id_filter = article_id is not None

    cursor.execute("""
        SELECT
            count(*) AS comments_count
        FROM
            comments
        WHERE
            CASE
                -- Has article_id filter?
                WHEN %s
                    THEN comments.article_id = %s
                    ELSE TRUE
            END;
    """, (
        has_article_id_filter,
        article_id,
    ))

    result = cursor.fetchone()
    cursor.close()

    return result['comments_count']
