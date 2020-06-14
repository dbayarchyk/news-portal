import psycopg2
import psycopg2.extras
import jwt
import datetime
from flask import Flask, request, make_response

from utils.access_token import decode_access_token
from utils.headers import get_authorization_header
from utils.permissions import check_permission, get_permissions
from utils.validators import validate_article_id, validate_content

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'

def get_comments_count(**options):
    db_connection = None
    comments_count = None

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
            options['article_id'] is not None,
            options['article_id']
        ))

        result = cursor.fetchone()

        if result is not None:
            comments_count = result['comments_count']

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return comments_count

def get_comments(**options):
    start_from = (options['page'] - 1) * options['page_size']

    db_connection = None
    comments_rows = []

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
            LIMIT %s
            OFFSET %s;
        """, (
            options['article_id'] is not None,
            options['article_id'],
            options['page_size'],
            start_from,
        ))

        comments_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(comment_row) for comment_row in comments_rows]

@app.route('/v1/comments', methods=['GET'])
def comments_handler_v1():
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
        ['COMMENT_VIEW_ALL']
    ) is False:
        return make_response({
            'message': 'You don\'t have permissions to perform that action.'
        }, 403)

    article_id = int(request.args.get('article_id')) if request.args.get('article_id') is not None else None
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 20))

    items_count = get_comments_count(article_id = article_id)
    items = get_comments(
        article_id = article_id,
        page = page,
        page_size = page_size
    )

    return make_response({
        'page': page,
        'page_size': page_size,
        'items_count': items_count,
        'items': items,
    }, 200)

def create_comment(**options):
    db_connection = None
    created_comment = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
            INSERT INTO comments(article_id, author_id, content, parent_comment_id, created_date)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, article_id, author_id, content, parent_comment_id, created_date;
        """, (
            options['article_id'],
            options['author_id'],
            options['content'],
            options['parent_comment_id'],
            options['created_date']
        ))

        created_comment = cursor.fetchone()
        db_connection.commit()
        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return created_comment

@app.route('/v1/comments', methods=['POST'])
def create_comment_handler_v1():
    access_token = get_authorization_header(request.headers)

    try:
        access_token_payload = decode_access_token(access_token) if access_token is not None else None
        permissions = get_permissions(access_token_payload)
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Please provide a valid authorization token.'
        }, 401)
    
    if check_permission(permissions, ['COMMENT_CREATE']) is False:
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
        validate_article_id(request_body.get('article_id'))
    except ValueError as err:
        validation_errors['article_id'] = str(err)

    try:
        validate_content(request_body.get('content'))
    except ValueError as err:
        validation_errors['content'] = str(err)

    if len(validation_errors.keys()) != 0:
        return make_response(validation_errors, 400)

    created_article = create_comment(
        article_id = request_body.get('article_id'),
        author_id = access_token_payload['sub'] if access_token_payload is not None else None,
        content = request_body.get('content'),
        parent_comment_id = request_body.get('parent_comment_id'),
        created_date = datetime.datetime.now()
    )

    if created_article is None:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)

    return make_response(dict(created_article), 201)