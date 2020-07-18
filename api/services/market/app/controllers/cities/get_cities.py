from typing import List
from psycopg2.extras import DictCursor
from psycopg2.extensions import connection

from app.schemas.city import City


def get_cities(db_connection: connection) -> List[City]:
    cities_rows = []

    cursor = db_connection.cursor(cursor_factory=DictCursor)

    cursor.execute("""
        SELECT
            cities.id,
            cities.name
        FROM
            cities
    """)

    cities_rows = cursor.fetchall()

    cursor.close()

    return [City(id=city_row['id'], name=city_row['name']) for city_row in cities_rows]
