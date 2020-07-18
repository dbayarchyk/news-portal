from datetime import datetime
from psycopg2.extras import DictCursor
from psycopg2.extensions import connection

from app.schemas.salary import PostSalaryReportData


def insert_salary(
    db_connection: connection,
    salary_date: PostSalaryReportData,
    created_date: datetime
) -> None:
    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute("""
            INSERT INTO salaries
                (position_id, city_id, technology_id, annual_salary, work_experience, created_date)
            VALUES
                (%s, %s, %s, %s, %s, %s);
        """, (
        salary_date.position_id,
        salary_date.city_id,
        salary_date.technology_id,
        salary_date.annual_salary,
        salary_date.work_experience,
        created_date,
    ))

    db_connection.commit()
    cursor.close()
