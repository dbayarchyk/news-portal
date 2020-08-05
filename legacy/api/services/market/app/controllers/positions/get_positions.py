from typing import List
from psycopg2.extras import DictCursor
from psycopg2.extensions import connection

from app.schemas.position import Position


def get_positions(db_connection: connection) -> List[Position]:
    rows = []

    cursor = db_connection.cursor(cursor_factory=DictCursor)

    cursor.execute("""
        SELECT
            positions.id,
            positions.name
        FROM
            positions
    """)

    rows = cursor.fetchall()

    cursor.close()

    return [Position(id=row['id'], name=row['name']) for row in rows]
