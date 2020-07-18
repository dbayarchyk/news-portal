from enum import Enum
from typing import List, Dict
from psycopg2.extensions import connection
from psycopg2.extras import DictCursor

from app.schemas.salary import SalaryReportData


class GroupByEnum(str, Enum):
    technology = "technology"
    position = "position"
    city = "city"


group_by_join_table_name_map: Dict[GroupByEnum, str] = {
    GroupByEnum.technology: 'technologies',
    GroupByEnum.position: 'positions',
    GroupByEnum.city: 'cities',
}
group_by_join_table_id_colum_map = {
    GroupByEnum.technology: 'id',
    GroupByEnum.position: 'id',
    GroupByEnum.city: 'id',
}
group_by_foreign_table_id_colum_map = {
    GroupByEnum.technology: 'technology_id',
    GroupByEnum.position: 'position_id',
    GroupByEnum.city: 'city_id',
}
group_by_join_table_name_colum_map = {
    GroupByEnum.technology: 'name',
    GroupByEnum.position: 'name',
    GroupByEnum.city: 'name',
}


def get_group_report(db_connection: connection, group_by: GroupByEnum) -> List[SalaryReportData]:
    rows = []

    cursor = db_connection.cursor(
        cursor_factory=DictCursor
    )

    cursor.execute("""
            SELECT
                %s.%s AS name,
                ARRAY_LENGTH(ARRAY_AGG(salaries.annual_salary), 1) AS count,
                MIN(salaries.annual_salary) AS min,
                MAX(salaries.annual_salary) AS max,
                CAST(ROUND(AVG(salaries.annual_salary)) AS INTEGER) AS average,
                PERCENTILE_DISC(0.25) WITHIN GROUP (ORDER BY salaries.annual_salary) AS lower_quartile,
                PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY salaries.annual_salary) AS median,
                PERCENTILE_DISC(0.75) WITHIN GROUP (ORDER BY salaries.annual_salary) AS upper_quartile
            FROM
                salaries
            INNER JOIN
                %s
                ON salaries.%s = %s.%s
            GROUP BY
                %s.%s,
                salaries.%s
            HAVING ARRAY_LENGTH(ARRAY_AGG(salaries.annual_salary), 1) >= 3;
        """ % (
        group_by_join_table_name_map[group_by],
        group_by_join_table_name_colum_map[group_by],
        group_by_join_table_name_map[group_by],
        group_by_foreign_table_id_colum_map[group_by],
        group_by_join_table_name_map[group_by],
        group_by_join_table_id_colum_map[group_by],
        group_by_join_table_name_map[group_by],
        group_by_join_table_id_colum_map[group_by],
        group_by_foreign_table_id_colum_map[group_by],
    ))

    rows = cursor.fetchall()

    cursor.close()

    return [
        SalaryReportData(
            name=row['name'],
            count=row['count'],
            min=row['min'],
            max=row['max'],
            average=row['average'],
            lower_quartile=row['lower_quartile'],
            median=row['median'],
            upper_quartile=row['upper_quartile'],
        )
        for row
        in rows
    ]
