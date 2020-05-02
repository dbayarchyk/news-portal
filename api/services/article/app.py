import psycopg2
import psycopg2.extras
from flask import Flask, request, make_response

app = Flask(__name__)

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'

@app.route('/v1/articles', methods=['GET'])
def articles_handler_v1():
    return make_response({
        'items': [],
    }, 200)