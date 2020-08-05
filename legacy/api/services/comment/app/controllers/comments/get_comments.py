from typing import List, Optional
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.comment import Comment


def get_comments(
    db_connection: connection,
    page: int,
    page_size: int,
    article_id: Optional[int] = None,
) -> List[Comment]:
    comment_rows = []

    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    start_from = (page - 1) * page_size
    has_article_id_filter = article_id is not None

    cursor.execute("""
            SELECT
                comments.id,
                comments.content,
                comments.author_id,
                comments.article_id,
                comments.parent_comment_id,
                comments.created_date
            FROM
                comments
            WHERE
                CASE
                    -- Has article_id filter?
                    WHEN %s
                        THEN comments.article_id = %s
                        ELSE TRUE
                END
            ORDER BY comments.created_date ASC
            LIMIT %s
            OFFSET %s;
        """, (
        has_article_id_filter,
        article_id,
        page_size,
        start_from,
    ))

    comment_rows = cursor.fetchall()

    cursor.close()

    return [
        Comment(
            id=comment_row['id'],
            content=comment_row['content'],
            author_id=comment_row['author_id'],
            article_id=comment_row['article_id'],
            parent_comment_id=comment_row['parent_comment_id'],
            created_date=comment_row['created_date'],
        )
        for comment_row
        in comment_rows
    ]
