from pydantic import BaseModel
from typing import List

from app.schemas.pagination import Pagination


class Technology(BaseModel):
    id: str
    name: str


class TechnologiesPagination(Pagination[Technology]):
    items: List[Technology]
