from pydantic import BaseModel
from typing import List

from app.schemas.pagination import Pagination


class Position(BaseModel):
    id: str
    name: str


class PositionsPagination(Pagination[Position]):
    items: List[Position]
