from psycopg2.extensions import connection


def publish_article(db_connection: connection, id: int):
    cursor = db_connection.cursor()

    cursor.execute(
        """
            UPDATE
                articles
            SET
                status_id = 2
            WHERE
                id = %s;
        """,
        (id,)
    )

    db_connection.commit()
    cursor.close()
