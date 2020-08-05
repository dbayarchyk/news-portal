from typing import List
from psycopg2.extras import DictCursor
from psycopg2.extensions import connection

from app.schemas.technology import Technology


def get_technologies(db_connection: connection) -> List[Technology]:
    rows = []

    cursor = db_connection.cursor(cursor_factory=DictCursor)

    cursor.execute("""
        SELECT
            technologies.id,
            technologies.name
        FROM
            technologies
    """)

    rows = cursor.fetchall()

    cursor.close()

    return [Technology(id=row['id'], name=row['name']) for row in rows]
