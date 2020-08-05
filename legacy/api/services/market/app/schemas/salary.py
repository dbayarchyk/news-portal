from pydantic import BaseModel, Field
from typing import List


class SalaryReportData(BaseModel):
    name: str
    count: int
    min: int
    max: int
    average: int
    lower_quartile: int
    median: int
    upper_quartile: int


class PostSalaryReportData(BaseModel):
    position_id: int
    city_id: int
    technology_id: int
    annual_salary: int = Field(ge=0)
    work_experience: int = Field(ge=1, le=80)
