import psycopg2
import psycopg2.extras
import jwt
import datetime
from flask import Flask, request, make_response

from utils.access_token import decode_access_token
from utils.headers import get_authorization_header
from utils.permissions import check_permission, get_permissions
from utils.validators import validate_title, validate_content

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'

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
            options['are_draft_allowed'],
            options['are_draft_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_published_allowed'],
            options['are_published_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_archived_allowed'],
            options['are_archived_allowed_for_current_user_id'],
            options['current_user_id'],
            options['status'] is not None,
            options['status']
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
            options['are_draft_allowed'],
            options['are_draft_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_published_allowed'],
            options['are_published_allowed_for_current_user_id'],
            options['current_user_id'],
            options['are_archived_allowed'],
            options['are_archived_allowed_for_current_user_id'],
            options['current_user_id'],
            options['status'] is not None,
            options['status'],
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
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)
    
    if check_permission(
        permissions,
        [
            'ARTICLE_VIEW_ALL_DRAFT',
            'ARTICLE_VIEW_OWN_DRAFT',
            'ARTICLE_VIEW_ALL_PUBLISHED',
            'ARTICLE_VIEW_OWN_PUBLISHED',
            'ARTICLE_VIEW_ALL_ARCHIVED',
            'ARTICLE_VIEW_OWN_ARCHIVED',
        ]
    ) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    are_draft_allowed = 'ARTICLE_VIEW_ALL_DRAFT' in permissions or 'ARTICLE_VIEW_OWN_DRAFT' in permissions,
    are_draft_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_DRAFT' not in permissions
    current_user_id = access_token_payload['sub'] if access_token_payload is not None else None
    are_published_allowed = 'ARTICLE_VIEW_ALL_PUBLISHED' in permissions or 'ARTICLE_VIEW_OWN_PUBLISHED' in permissions
    are_published_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_PUBLISHED' not in permissions
    are_archived_allowed = 'ARTICLE_VIEW_ALL_ARCHIVED' in permissions or 'ARTICLE_VIEW_OWN_ARCHIVED' in permissions
    are_archived_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_ARCHIVED' not in permissions

    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 20))
    status = request.args.get('status', None)

    items_count = get_articles_count(
        are_draft_allowed = are_draft_allowed,
        are_draft_allowed_for_current_user_id = are_draft_allowed_for_current_user_id,
        current_user_id = current_user_id,
        are_published_allowed = are_published_allowed,
        are_published_allowed_for_current_user_id = are_published_allowed_for_current_user_id,
        are_archived_allowed = are_archived_allowed,
        are_archived_allowed_for_current_user_id = are_archived_allowed_for_current_user_id,
        status = status,
    )
    items = get_articles(
        are_draft_allowed = are_draft_allowed,
        are_draft_allowed_for_current_user_id = are_draft_allowed_for_current_user_id,
        current_user_id = current_user_id,
        are_published_allowed = are_published_allowed,
        are_published_allowed_for_current_user_id = are_published_allowed_for_current_user_id,
        are_archived_allowed = are_archived_allowed,
        are_archived_allowed_for_current_user_id = are_archived_allowed_for_current_user_id,
        status = status,
        page = page,
        page_size = page_size,
    )

    return make_response({
        'page': page,
        'page_size': page_size,
        'items_count': items_count,
        'items': items,
    }, 200)

def create_article(**options):
    db_connection = None
    created_article = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
            INSERT INTO articles(title, author_id, content, status_id, created_date)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, title, author_id, content, status_id, created_date;
        """, (
            options['title'],
            options['author_id'],
            options['content'],
            options['status_id'],
            options['created_date']
        ))

        created_article = cursor.fetchone()
        db_connection.commit()
        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return created_article

@app.route('/v1/articles', methods=['POST'])
def create_article_handler_v1():
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)
    
    if check_permission(permissions, ['ARTICLE_CREATE']) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    request_body = request.get_json()

    if request_body is None:
        return make_response({
            'message': 'Provide a request body.'
        }, 400)

    validation_errors = {}

    try:
        validate_title(request_body['title'])
    except ValueError as err:
        validation_errors['title'] = str(err)

    try:
        validate_content(request_body['content'])
    except ValueError as err:
        validation_errors['content'] = str(err)

    if len(validation_errors.keys()) != 0:
        return make_response(validation_errors, 400)

    created_article = create_article(
        title = request_body['title'],
        author_id = access_token_payload['sub'] if access_token_payload is not None else None,
        content = request_body['content'],
        status_id = 1,
        created_date = datetime.datetime.now()
    )

    if created_article is None:
        return make_response({
            'message': 'Something went wrong'
        }, 500)

    return make_response(dict(created_article), 201)

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
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)
    
    if check_permission(
        permissions,
        [
            'ARTICLE_VIEW_ALL_DRAFT',
            'ARTICLE_VIEW_OWN_DRAFT',
            'ARTICLE_VIEW_ALL_PUBLISHED',
            'ARTICLE_VIEW_OWN_PUBLISHED',
            'ARTICLE_VIEW_ALL_ARCHIVED',
            'ARTICLE_VIEW_OWN_ARCHIVED',
        ]
    ) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    id = int(id)
    are_draft_allowed = 'ARTICLE_VIEW_ALL_DRAFT' in permissions or 'ARTICLE_VIEW_OWN_DRAFT' in permissions,
    are_draft_allowed_for_current_user_id = 'ARTICLE_VIEW_ALL_DRAFT' not in permissions
    current_user_id = access_token_payload['sub'] if access_token_payload is not None else None
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

def get_article_with_status_by_id(article_id):
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
                articles.id,
                articles.author_id,
                article_statuses.name AS status
            FROM
                articles
            INNER JOIN
                article_statuses
                ON articles.status_id = article_statuses.id
            WHERE articles.id = %s;

        """, (article_id,))

        article = cursor.fetchone()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return article

def check_permission_for_article_update(current_user_id, article_with_status, all_permissions):
    is_own_article = article_with_status['author_id'] == current_user_id

    if article_with_status['status'] == 'DRAFT':
        if check_permission(all_permissions, ['ARTICLE_UPDATE_ALL_DRAFT']):
            return True
        else:
            return check_permission(all_permissions, ['ARTICLE_UPDATE_OWN_DRAFT']) and is_own_article

    if article_with_status['status'] == 'PUBLISHED':
        if check_permission(all_permissions, ['ARTICLE_UPDATE_ALL_PUBLISHED']):
            return True
        else:
            return check_permission(all_permissions, ['ARTICLE_UPDATE_OWN_PUBLISHED']) and is_own_article

    if article_with_status['status'] == 'ARCHIVED':
        if check_permission(all_permissions, ['ARTICLE_UPDATE_ALL_ARCHIVED']):
            return True
        else:
            return check_permission(all_permissions, ['ARTICLE_UPDATE_OWN_ARCHIVED']) and is_own_article

    return False

def update_article(**options):
    db_connection = None
    updated_article = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
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
        """, (
            options['title'],
            options['content'],
            options['id']
        ))

        updated_article = cursor.fetchone()
        db_connection.commit()
        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return updated_article

@app.route('/v1/articles/<id>', methods=['PUT'])
def update_article_by_id_handler_v1(id):
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)

    id = int(id)
    article_with_status = get_article_with_status_by_id(id)

    if article_with_status is None:
        return make_response({
            'message': 'Article not found.'
        }, 404)
    
    current_user_id = access_token_payload['sub'] if access_token_payload is not None else None

    if check_permission_for_article_update(current_user_id, article_with_status, permissions) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    request_body = request.get_json()

    if request_body is None:
        return make_response({
            'message': 'Provide a request body.'
        }, 400)

    validation_errors = {}

    try:
        validate_title(request_body['title'])
    except ValueError as err:
        validation_errors['title'] = str(err)

    try:
        validate_content(request_body['content'])
    except ValueError as err:
        validation_errors['content'] = str(err)

    if len(validation_errors.keys()) != 0:
        return make_response(validation_errors, 400)

    updated_article = update_article(
        id = id,
        title = request_body['title'],
        content = request_body['content'],
    )

    if updated_article is None:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)

    return make_response(dict(updated_article), 200)

def check_permission_for_article_publish(current_user_id, article_with_status, all_permissions):
    is_own_article = article_with_status['author_id'] == current_user_id

    if article_with_status['status'] == 'DRAFT':
        if check_permission(all_permissions, ['ARTICLE_PUBLISH_ALL_DRAFT']):
            return True
        else:
            return check_permission(all_permissions, ['ARTICLE_PUBLISH_OWN_DRAFT']) and is_own_article

    if article_with_status['status'] == 'ARCHIVED':
        if check_permission(all_permissions, ['ARTICLE_PUBLISH_ALL_ARCHIVED']):
            return True
        else:
            return check_permission(all_permissions, ['ARTICLE_PUBLISH_OWN_ARCHIVED']) and is_own_article

    return False

def publish_article(article_id):
    db_connection = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor()

        cursor.execute("""
            UPDATE
                articles
            SET
                status_id = 2
            WHERE
                id = %s;
        """, (article_id,))

        db_connection.commit()
        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

@app.route('/v1/articles/<id>/publish', methods=['POST'])
def publish_article_by_id_handler_v1(id):
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)

    id = int(id)
    article_with_status = get_article_with_status_by_id(id)

    if article_with_status is None:
        return make_response({
            'message': 'Article not found.'
        }, 404)

    current_user_id = access_token_payload['sub'] if access_token_payload is not None else None

    if article_with_status['status'] == 'PUBLISHED':
        return make_response({
            'message': 'This article is already published.'
        }, 400)

    if check_permission_for_article_update(current_user_id, article_with_status, permissions) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    try:
        publish_article(id)
    except Exception:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)

    return make_response({
        'message': "The article has been published."
    }, 200)

def check_permission_for_article_archive(current_user_id, article_with_status, all_permissions):
    is_own_article = article_with_status['author_id'] == current_user_id

    if article_with_status['status'] == 'PUBLISHED':
        if check_permission(all_permissions, ['ARTICLE_ARCHIVE_ALL_PUBLISHED']):
            return True
        else:
            return check_permission(all_permissions, ['ARTICLE_ARCHIVE_OWN_PUBLISHED']) and is_own_article

    return False

def archive_article(article_id):
    db_connection = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor()

        cursor.execute("""
            UPDATE
                articles
            SET
                status_id = 3
            WHERE
                id = %s;
        """, (article_id,))

        db_connection.commit()
        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

@app.route('/v1/articles/<id>/archive', methods=['POST'])
def archive_article_by_id_handler_v1(id):
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)

    id = int(id)
    article_with_status = get_article_with_status_by_id(id)

    if article_with_status is None:
        return make_response({
            'message': 'Article not found.'
        }, 404)

    current_user_id = access_token_payload['sub'] if access_token_payload is not None else None

    if article_with_status['status'] == 'ARCHIVED':
        return make_response({
            'message': 'This article is already archived.'
        }, 400)

    if check_permission_for_article_archive(current_user_id, article_with_status, permissions) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    try:
        archive_article(id)
    except Exception:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)

    return make_response({
        'message': "The article has been archived."
    }, 200)