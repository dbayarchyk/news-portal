from pydantic import BaseModel
from typing import List, Optional
from datetime import date

from app.schemas.pagination import Pagination


class Comment(BaseModel):
    id: int
    content: str
    author_id: int
    article_id: int
    parent_comment_id: Optional[int] = None
    created_date: date


class CommentsPagination(Pagination[Comment]):
    items: List[Comment]


class NewComment(BaseModel):
    content: str
    article_id: int
    parent_comment_id: Optional[int] = None
