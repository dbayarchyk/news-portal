from fastapi import FastAPI, status

from app.routers import v1

app = FastAPI()


app.include_router(v1.router, prefix="/v1", tags=["API v1"],)
