from typing import List, Generic, TypeVar
from pydantic import BaseModel

ItemType = TypeVar('ItemType')


class Pagination(BaseModel, Generic[ItemType]):
    page: int
    page_size: int
    items_count: int
    items: List[ItemType]
