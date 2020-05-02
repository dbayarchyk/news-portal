import psycopg2
import psycopg2.extras
import jwt
import datetime
from flask import Flask, request, make_response

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'
ACCESS_TOKEN_SECRET = 'secret_access_token'
REFRESH_TOKEN_SECRET = 'secret_refresh_token'

def find_user_by_email(email):
    db_connection = None
    user = None

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
                email,
                password    
            FROM
                users
            WHERE email = %s;
        """, (email,))

        user = cursor.fetchone()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return user

@app.route('/v1/signin', methods=['POST'])
def signin_handler_v1():
    request_body = request.get_json()

    if request_body['email'] is None:
        return make_response({
            'message': 'Please provide an email.'
        }, 400)

    if request_body['password'] is None:
        return make_response({
            'message': 'Please provide a password.'
        }, 400)

    user = find_user_by_email(request_body['email'])

    if user is None:
        return make_response({
            'message': 'There is no user with such an email.'
        }, 401)

    if user['password'] != request_body['password']:
        return make_response({
            'message': 'The password is incorrect.'
        }, 401)

    access_token = jwt.encode({
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
        'user_id': user['id'],
        'user_email': user['email'],
    }, ACCESS_TOKEN_SECRET, algorithm='HS256').decode('utf-8')

    response = make_response({
        'access_token': str(access_token),
    }, 200)

    refreshToken = jwt.encode({
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=15),
        'user_id': user['id'],
    }, REFRESH_TOKEN_SECRET, algorithm='HS256').decode('utf-8')

    response.set_cookie("refresh_token", value = str(refreshToken), httponly = True)

    return response

def create_user(email, password):
    db_connection = None
    created_user = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
            INSERT INTO users(email, password)
            VALUES(%s, %s)
            RETURNING id, email;
        """, (email, password))

        created_user = cursor.fetchone()

        db_connection.commit()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return created_user

@app.route('/v1/signup', methods=['POST'])
def signup_handler_v1():
    request_body = request.get_json()

    if request_body['email'] is None:
        return make_response({
            'message': 'Please provide an email.'
        }, 400)

    if request_body['password'] is None:
        return make_response({
            'message': 'Please provide a password.'
        }, 400)


    created_user = None
    
    try:
        created_user = create_user(request_body['email'], request_body['password'])
    except (psycopg2.IntegrityError):
        return make_response({
            'message': 'This email already exists.',
        }, 403)

    if created_user is None:
        return make_response({
            'message': 'Something went wrong'
        }, 500)

    return make_response({
        'message': 'The user has been successfully singed up.'
    }, 201)

def find_user_by_id(id):
    db_connection = None
    user = None

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
                email    
            FROM
                users
            WHERE id = %s;
        """, (id,))

        user = cursor.fetchone()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return user

@app.route('/v1/refresh', methods=['GET'])
def refresh_handler_v1():
    if 'refresh_token' not in request.cookies:
        return make_response({
            'message': 'Refresh token is not provided.',
        }, 400)

    old_refresh_token = request.cookies['refresh_token']
    refresh_token_payload = None

    try:
        refresh_token_payload = jwt.decode(old_refresh_token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    except (Exception, jwt.ExpiredSignatureError):
        return make_response({
            'message': 'Refresh token is not valid.',
        }, 401)

    user = find_user_by_id(refresh_token_payload['user_id'])

    if user is None:
        return make_response({
            'message': 'User is not found.',
        }, 404)

    new_access_token = jwt.encode({
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
        'user_id': user['id'],
        'user_email': user['email'],
    }, ACCESS_TOKEN_SECRET, algorithm='HS256').decode('utf-8')

    response = make_response({
        'access_token': str(new_access_token),
    }, 200)

    new_refreshToken = jwt.encode({
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=15),
        'user_id': user['id'],
    }, REFRESH_TOKEN_SECRET, algorithm='HS256').decode('utf-8')

    response.set_cookie('refresh_token', value = str(new_refreshToken), httponly = True)

    return response