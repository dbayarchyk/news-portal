from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.article import Article, ArticleInput


def update_article(
    db_connection: connection,
    id: int,
    article_input: ArticleInput,
) -> Article:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute(
        """
            UPDATE
                articles
            SET
                title = %s,
                content = %s
            WHERE
                articles.id = %s
            RETURNING
                articles.id,
                articles.title,
                articles.author_id,
                articles.content,
                articles.status_id,
                articles.created_date;
        """,
        (
            article_input.title,
            article_input.content,
            id,
        ),
    )

    updated_article = cursor.fetchone()
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
            updated_article['status_id'],
        )
    )

    article_status = cursor.fetchone()
    cursor.close()

    return Article(
        id=updated_article['id'],
        title=updated_article['title'],
        content=updated_article['content'],
        author_id=updated_article['author_id'],
        status=article_status['name'],
        created_date=updated_article['created_date'],
    )
