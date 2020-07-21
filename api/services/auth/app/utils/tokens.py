from typing import Dict, Any
from datetime import datetime, timedelta
import jwt

ACCESS_TOKEN_SECRET = "secret_access_token"
REFRESH_TOKEN_SECRET = "secret_refresh_token"


def create_access_token(user) -> str:
    access_token = jwt.encode({
        "exp": datetime.utcnow() + timedelta(minutes=15),
        "sub": user.get("id"),
        "username": user.get("username"),
        "role": user.get("role"),
        "permissions": user.get("permissions", []),
    }, ACCESS_TOKEN_SECRET, algorithm="HS256").decode("utf-8")

    return access_token


def create_refresh_token(user) -> str:
    refresh_token = jwt.encode({
        "exp": datetime.utcnow() + timedelta(days=15),
        "sub": user.get("id"),
    }, REFRESH_TOKEN_SECRET, algorithm="HS256").decode("utf-8")

    return refresh_token

def decode_refresh_token(refresh_token: str) -> Dict[str, Any]:
    refresh_token_payload = jwt.decode(
        refresh_token,
        REFRESH_TOKEN_SECRET,
        algorithms=["HS256"],
    )

    return refresh_token_payload