import psycopg2
import psycopg2.extras
from flask import Flask, request, make_response

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'

def get_articles_count():
    db_connection = None
    articles_count = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
            SELECT
                count(*) AS articles_count
            FROM
                articles
        """)

        result = cursor.fetchone()

        if result is not None:
            articles_count = result['articles_count']

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return articles_count

def get_articles(**options):
    page = options['page']
    page_size = options['page_size']
    start_from = (page - 1) * page_size

    db_connection = None
    articles_rows = []

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
            SELECT
                id,
                title,
                content,
                author_id
            FROM
                articles
            LIMIT %s
            OFFSET %s
        """, (page_size, start_from))

        articles_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(article_row) for article_row in articles_rows]

@app.route('/v1/articles', methods=['GET'])
def articles_handler_v1():
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 20))

    items_count = get_articles_count()
    items = get_articles(page = page, page_size = page_size)

    return make_response({
        'page': page,
        'page_size': page_size,
        'items_count': items_count,
        'items': items,
    }, 200)