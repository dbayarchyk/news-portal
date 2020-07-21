from typing import Dict, Any, Optional

from psycopg2.extensions import connection
from psycopg2.extras import DictCursor


def get_user_with_permissions_and_role_by_username(
    db_connection: connection,
    username: str
) -> Optional[Dict[str, Any]]:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute("""
        SELECT
            users.id,
            users.email,
            users.password,
            users.username,
            user_roles.role AS role,
            ARRAY_AGG(permissions.name) AS permissions
        FROM
            users
        INNER JOIN user_roles
            ON users.role_id = user_roles.id
        LEFT JOIN
            user_roles_to_permissions
            ON user_roles.id = user_roles_to_permissions.user_role_id
        INNER JOIN
            permissions
            ON user_roles_to_permissions.permission_id = permissions.id
        WHERE
            users.username = %s
            OR users.email = %s
        GROUP BY
            users.id, user_roles.role;
    """, (username, username,))

    user = cursor.fetchone()
    cursor.close()

    return user
