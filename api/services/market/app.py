import psycopg2
import psycopg2.extras
import datetime
from flask import Flask, request, make_response

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'

def get_cities():
    db_connection = None
    cities_rows = []

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
                cities.id,
                cities.name
            FROM
                cities
        """)

        cities_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(city_row) for city_row in cities_rows]

@app.route('/v1/cities', methods=['GET'])
def cities_handler_v1():
    items = get_cities()

    return make_response({
        'page': 1,
        'page_size': len(items),
        'items_count': len(items),
        'items': items,
    }, 200)

def get_positions():
    db_connection = None
    positions_rows = []

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
                positions.id,
                positions.name
            FROM
                positions
        """)

        positions_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(position_row) for position_row in positions_rows]

@app.route('/v1/positions', methods=['GET'])
def positions_handler_v1():
    items = get_positions()

    return make_response({
        'page': 1,
        'page_size': len(items),
        'items_count': len(items),
        'items': items,
    }, 200)

def get_programming_languages():
    db_connection = None
    programming_languages_rows = []

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
                programming_languages.id,
                programming_languages.name
            FROM
                programming_languages
        """)

        programming_languages_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(programming_language_row) for programming_language_row in programming_languages_rows]

@app.route('/v1/programming_languages', methods=['GET'])
def programming_languages_handler_v1():
    items = get_programming_languages()

    return make_response({
        'page': 1,
        'page_size': len(items),
        'items_count': len(items),
        'items': items,
    }, 200)