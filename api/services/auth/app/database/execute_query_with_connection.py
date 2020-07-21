from typing import Any, Callable, TypeVar
from psycopg2 import connect
from psycopg2.extensions import connection

DB_HOST = 'postgres'
DB_NAME = 'itdog_database'
DB_USER = 'admin'
DB_PASSWORD = 'admin'

QueryResultType = TypeVar('QueryResultType')


def execute_query_with_connection(
    execute_query: Callable[[connection], QueryResultType]
) -> QueryResultType:
    db_connection = None
    result = None

    try:
        db_connection = connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )

        result = execute_query(db_connection)
    finally:
        if db_connection is not None:
            db_connection.close()

    return result
