from typing import List, Optional
from datetime import datetime
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.comment import Comment, NewComment


def create_comment(
    db_connection: connection,
    author_id: int,
    new_comment: NewComment,
    created_date: datetime,
) -> Comment:
    cursor = db_connection.cursor(cursor_factory=DictCursor)

    cursor.execute(
        """
            INSERT INTO comments(
                article_id,
                content,
                parent_comment_id,
                author_id,
                created_date
            )
            VALUES (
                %s,
                %s,
                %s,
                %s,
                %s
            )
            RETURNING
                id,
                article_id,
                author_id,
                content,
                parent_comment_id,
                created_date;
        """,
        (
            new_comment.article_id,
            new_comment.content,
            new_comment.parent_comment_id,
            author_id,
            created_date,
        )
    )

    created_comment_row = cursor.fetchone()
    db_connection.commit()
    cursor.close()

    return Comment(
        id=created_comment_row['id'],
        article_id=created_comment_row['article_id'],
        author_id=created_comment_row['author_id'],
        content=created_comment_row['content'],
        parent_comment_id=created_comment_row['parent_comment_id'],
        created_date=created_comment_row['created_date'],
    )
