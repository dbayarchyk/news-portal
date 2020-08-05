from typing import Dict, Any, Optional

from psycopg2.extensions import connection
from psycopg2.extras import DictCursor


def get_visitor_permissions_and_role(
    db_connection: connection,
) -> Optional[Dict[str, Any]]:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute("""
        SELECT
            user_roles.role AS role,
            ARRAY_AGG(permissions.name) AS permissions
        FROM
            user_roles
        LEFT JOIN
            user_roles_to_permissions
            ON user_roles.id = user_roles_to_permissions.user_role_id
        INNER JOIN
            permissions
            ON user_roles_to_permissions.permission_id = permissions.id
        WHERE
            user_roles.role = 'VISITOR'
        GROUP BY
            user_roles.role;
    """)

    visitor_permissions_and_role = cursor.fetchone()
    cursor.close()

    return visitor_permissions_and_role
