import psycopg2
import psycopg2.extras
import jwt
from flask import Flask, request, make_response

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'
ACCESS_TOKEN_SECRET = 'secret_access_token'

def get_articles_count(**options):
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
            FROM (
                SELECT
                    articles.id,
                    articles.title,
                    articles.content,
                    articles.author_id,
                    article_statuses.name AS status
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
        """, (
            options['are_draft_allowed'],
            options['are_draft_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_published_allowed'],
            options['are_published_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_archived_allowed'],
            options['are_archived_allowed_for_current_user_id'],
            options['current_user_id'],
        ))

        result = cursor.fetchone()

        if result is not None:
            articles_count = result['articles_count']

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return articles_count

def get_articles(**options):
    start_from = (options['page'] - 1) * options['page_size']

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
                *
            FROM (
                SELECT
                    articles.id,
                    articles.title,
                    articles.content,
                    articles.author_id,
                    article_statuses.name AS status
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
            LIMIT %s
            OFFSET %s;
        """, (
            options['are_draft_allowed'],
            options['are_draft_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_published_allowed'],
            options['are_published_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_archived_allowed'],
            options['are_archived_allowed_for_current_user_id'],
            options['current_user_id'],
            options['page_size'],
            start_from,
        ))

        articles_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(article_row) for article_row in articles_rows]

@app.route('/v1/articles', methods=['GET'])
def articles_handler_v1():
    permissions = None
    access_token_payload = None

    if 'Authorization' in request.headers:
        try:
            access_token_payload = jwt.decode(
                request.headers['Authorization'].split(' ')[1],
                ACCESS_TOKEN_SECRET,
                algorithms=['HS256'],
            )
            permissions = access_token_payload['permissions']
        except (Exception, jwt.ExpiredSignatureError) as error:
            if error is jwt.ExpiredSignatureError:
                return make_response('', 401)
    else:
        # TODO: get permissions for the VISITOR
        permissions = None

    if permissions is None:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)

    are_draft_allowed = 'ARTICLE_VIEW_ALL_DRAFT' in permissions or 'ARTICLE_VIEW_OWN_DRAFT' in permissions,
    are_draft_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_DRAFT' not in permissions
    current_user_id = access_token_payload['sub']
    are_published_allowed = 'ARTICLE_VIEW_ALL_PUBLISHED' in permissions or 'ARTICLE_VIEW_OWN_PUBLISHED' in permissions
    are_published_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_PUBLISHED' not in permissions
    are_archived_allowed = 'ARTICLE_VIEW_ALL_ARCHIVED' in permissions or 'ARTICLE_VIEW_OWN_ARCHIVED' in permissions
    are_archived_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_ARCHIVED' not in permissions

    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 20))

    items_count = get_articles_count(
        are_draft_allowed = are_draft_allowed,
        are_draft_allowed_for_current_user_id = are_draft_allowed_for_current_user_id,
        current_user_id = current_user_id,
        are_published_allowed = are_published_allowed,
        are_published_allowed_for_current_user_id = are_published_allowed_for_current_user_id,
        are_archived_allowed = are_archived_allowed,
        are_archived_allowed_for_current_user_id = are_archived_allowed_for_current_user_id,
    )
    items = get_articles(
        are_draft_allowed = are_draft_allowed,
        are_draft_allowed_for_current_user_id = are_draft_allowed_for_current_user_id,
        current_user_id = current_user_id,
        are_published_allowed = are_published_allowed,
        are_published_allowed_for_current_user_id = are_published_allowed_for_current_user_id,
        are_archived_allowed = are_archived_allowed,
        are_archived_allowed_for_current_user_id = are_archived_allowed_for_current_user_id,
        page = page,
        page_size = page_size,
    )

    return make_response({
        'page': page,
        'page_size': page_size,
        'items_count': items_count,
        'items': items,
    }, 200)

def get_article_by_id(**options):
    db_connection = None
    article = None

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
                *
            FROM (
                SELECT
                    articles.id,
                    articles.title,
                    articles.content,
                    articles.author_id,
                    article_statuses.name AS status
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
        """, (
            options['are_draft_allowed'],
            options['are_draft_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_published_allowed'],
            options['are_published_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_archived_allowed'],
            options['are_archived_allowed_for_current_user_id'],
            options['current_user_id'],
            options['id'],
        ))

        article = cursor.fetchone()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return article

@app.route('/v1/articles/<id>', methods=['GET'])
def article_by_id_handler_v1(id):
    permissions = None
    access_token_payload = None

    if 'Authorization' in request.headers:
        try:
            access_token_payload = jwt.decode(
                request.headers['Authorization'].split(' ')[1],
                ACCESS_TOKEN_SECRET,
                algorithms=['HS256'],
            )
            permissions = access_token_payload['permissions']
        except (Exception, jwt.ExpiredSignatureError) as error:
            if error is jwt.ExpiredSignatureError:
                return make_response('', 401)
    else:
        # TODO: get permissions for the VISITOR
        permissions = None

    if permissions is None:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)

    id = int(id)
    are_draft_allowed = 'ARTICLE_VIEW_ALL_DRAFT' in permissions or 'ARTICLE_VIEW_OWN_DRAFT' in permissions,
    are_draft_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_DRAFT' not in permissions
    current_user_id = access_token_payload['sub']
    are_published_allowed = 'ARTICLE_VIEW_ALL_PUBLISHED' in permissions or 'ARTICLE_VIEW_OWN_PUBLISHED' in permissions
    are_published_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_PUBLISHED' not in permissions
    are_archived_allowed = 'ARTICLE_VIEW_ALL_ARCHIVED' in permissions or 'ARTICLE_VIEW_OWN_ARCHIVED' in permissions
    are_archived_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_ARCHIVED' not in permissions

    article = get_article_by_id(
        id=id,
        are_draft_allowed = are_draft_allowed,
        are_draft_allowed_for_current_user_id = are_draft_allowed_for_current_user_id,
        current_user_id = current_user_id,
        are_published_allowed = are_published_allowed,
        are_published_allowed_for_current_user_id = are_published_allowed_for_current_user_id,
        are_archived_allowed = are_archived_allowed,
        are_archived_allowed_for_current_user_id = are_archived_allowed_for_current_user_id,
    )

    if article is None:
        return make_response({
            'message': 'Article not found.'
        }, 404)

    return make_response(dict(article), 200)
