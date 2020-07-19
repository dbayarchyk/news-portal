from typing import List, Optional
from pydantic import BaseModel
from datetime import date

from app.schemas.pagination import Pagination


class Article(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    status: str
    created_date: date


class ArticlesPagination(Pagination[Article]):
    items: List[Article]


class ArticleInput(BaseModel):
    title: str
    content: str
