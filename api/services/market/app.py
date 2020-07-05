import psycopg2
import psycopg2.extras
import datetime
from flask import Flask, request, make_response, jsonify

from utils.validators import validate_position_id, validate_city_id, validate_programming_language_id, validate_annual_salary, validate_work_experience

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

def create_salary(**options):
    db_connection = None

    try:
        db_connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = db_connection.cursor(cursor_factory = psycopg2.extras.DictCursor)

        cursor.execute("""
            INSERT INTO salaries
                (position_id, city_id, programming_language_id, annual_salary, work_experience, created_date)
            VALUES
                (%s, %s, %s, %s, %s, %s);
        """, (
            options['position_id'],
            options['city_id'],
            options['programming_language_id'],
            options['annual_salary'],
            options['work_experience'],
            options['created_date']
        ))

        db_connection.commit()
        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

@app.route('/v1/salaries', methods=['POST'])
def create_salary_handler_v1():
    request_body = request.get_json()

    if request_body is None:
        return make_response({
            'message': 'Provide a request body.'
        }, 400)

    validation_errors = {}

    try:
        validate_position_id(request_body.get('position_id'))
    except ValueError as err:
        validation_errors['position_id'] = str(err)

    try:
        validate_city_id(request_body.get('city_id'))
    except ValueError as err:
        validation_errors['city_id'] = str(err)

    try:
        validate_programming_language_id(request_body.get('programming_language_id'))
    except ValueError as err:
        validation_errors['programming_language_id'] = str(err)

    try:
        validate_annual_salary(request_body.get('annual_salary'))
    except ValueError as err:
        validation_errors['annual_salary'] = str(err)

    try:
        validate_work_experience(request_body.get('work_experience'))
    except ValueError as err:
        validation_errors['work_experience'] = str(err)

    if len(validation_errors.keys()) != 0:
        return make_response(validation_errors, 400)

    try:
        create_salary(
            position_id = request_body.get('position_id'),
            city_id = request_body.get('city_id'),
            programming_language_id = request_body.get('programming_language_id'),
            annual_salary = request_body.get('annual_salary'),
            work_experience = request_body.get('work_experience'),
            created_date = datetime.datetime.now()
        )
        return make_response({
            'message': 'Thank you, your salary report has been stored!'
        }, 201)
    except Exception:
        return make_response({
            'message': 'Oops, something went wrong.'
        }, 500)

def get_salaries_group_report(group_by):
    group_by_join_table_name_map = {
        'technology': 'programming_languages',
        'position': 'positions',
        'city': 'cities',
    }
    group_by_join_table_id_colum_map = {
        'technology': 'id',
        'position': 'id',
        'city': 'id',
    }
    group_by_foreign_table_id_colum_map = {
        'technology': 'programming_language_id',
        'position': 'position_id',
        'city': 'city_id',
    }
    group_by_join_table_name_colum_map = {
        'technology': 'name',
        'position': 'name',
        'city': 'name',
    }

    db_connection = None
    group_report_rows = []

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
                %s.%s AS name,
                ARRAY_LENGTH(ARRAY_AGG(salaries.annual_salary), 1) AS count,
                MIN(salaries.annual_salary) AS min,
                MAX(salaries.annual_salary) AS max,
                CAST(ROUND(AVG(salaries.annual_salary)) AS INTEGER) AS average,
                PERCENTILE_DISC(0.25) WITHIN GROUP (ORDER BY salaries.annual_salary) AS lower_quartile,
                PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY salaries.annual_salary) AS median,
                PERCENTILE_DISC(0.75) WITHIN GROUP (ORDER BY salaries.annual_salary) AS upper_quartile
            FROM
                salaries
            INNER JOIN
                %s
                ON salaries.%s = %s.%s
            GROUP BY
                %s.%s,
                salaries.%s
            HAVING ARRAY_LENGTH(ARRAY_AGG(salaries.annual_salary), 1) >= 3;
        """ % (
            group_by_join_table_name_map[group_by],
            group_by_join_table_name_colum_map[group_by],
            group_by_join_table_name_map[group_by],
            group_by_foreign_table_id_colum_map[group_by],
            group_by_join_table_name_map[group_by],
            group_by_join_table_id_colum_map[group_by],
            group_by_join_table_name_map[group_by],
            group_by_join_table_id_colum_map[group_by],
            group_by_foreign_table_id_colum_map[group_by],
        ))

        group_report_rows = cursor.fetchall()

        cursor.close()
    finally:
        if db_connection is not None:
            db_connection.close()

    return [dict(group_report_row) for group_report_row in group_report_rows]

@app.route('/v1/salaries/report/group/<group_by>', methods=['get'])
def get_salaries_group_report_handler_v1(group_by):
    if group_by not in ['technology', 'position', 'city']:
        return make_response({
            'message': 'group_by param has to be one of these values: [technology, position, city]'
        }, 400)

    try:
        report = get_salaries_group_report(group_by)

        return make_response(jsonify(report), 200)
    except Exception:
        return make_response({
            'message': 'Something went wrong.'
        }, 500)
