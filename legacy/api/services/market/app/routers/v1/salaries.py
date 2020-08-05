from typing import List, Union
from fastapi import APIRouter, status
from datetime import datetime

from app.schemas.salary import SalaryReportData, PostSalaryReportData
from app.controllers.salaries.get_group_report import get_group_report, GroupByEnum
from app.controllers.salaries.insert_salary import insert_salary
from app.database.execute_query_with_connection import execute_query_with_connection

router = APIRouter()


@router.post(
    '/',
    status_code=status.HTTP_202_ACCEPTED,
    response_model=None,
)
async def post_salary_handler(salary_report: PostSalaryReportData) -> None:
    execute_query_with_connection(
        lambda db_connection: insert_salary(
            db_connection,
            salary_report,
            datetime.now(),
        )
    )


@router.get(
    "/report/group/{group_by}/",
    status_code=status.HTTP_200_OK,
    response_model=List[SalaryReportData],
)
async def get_salary_group_report_handler(group_by: GroupByEnum) -> List[SalaryReportData]:
    group_report = execute_query_with_connection(
        lambda db_connection: get_group_report(db_connection, group_by)
    )

    return group_report
