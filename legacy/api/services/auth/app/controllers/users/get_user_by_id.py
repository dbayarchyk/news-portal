from typing import Any, Optional

from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.user import User


def get_user_by_id(
    db_connection: connection,
    id: int,
) -> Optional[User]:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute("""
        SELECT
            users.id,
            users.username
        FROM
            users
        WHERE
            users.id = %s
    """, (id,))

    user_row = cursor.fetchone()
    cursor.close()

    if user_row is None:
        return None

    return User(
        id=user_row["id"],
        username=user_row["username"],
    )
