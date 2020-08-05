from pydantic import BaseModel
from typing import List

from app.schemas.pagination import Pagination


class City(BaseModel):
    id: str
    name: str


class CitiesPagination(Pagination[City]):
    items: List[City]
