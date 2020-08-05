from typing import Optional
from datetime import datetime
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.article import ArticleInput, Article


def create_article(
    db_connection: connection,
    article_input: ArticleInput,
    author_id: int,
    created_date: datetime,
) -> Article:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute("""
            INSERT INTO articles(
                title,
                author_id,
                content,
                created_date
            )
            VALUES (
                %s,
                %s,
                %s,
                %s
            )
            RETURNING
                id,
                title,
                author_id,
                content,
                status_id,
                created_date;
        """, (
        article_input.title,
        author_id,
        article_input.content,
        created_date,
    ))

    created_article = cursor.fetchone()
    db_connection.commit()

    cursor.execute(
        """
            SELECT
                article_statuses.name
            FROM
                article_statuses
            WHERE
                article_statuses.id = %s;
        """,
        (
            created_article['status_id'],
        )
    )

    article_status = cursor.fetchone()
    cursor.close()

    return Article(
        id=created_article['id'],
        title=created_article['title'],
        content=created_article['content'],
        author_id=created_article['author_id'],
        status=article_status['name'],
        created_date=created_article['created_date'],
    )
