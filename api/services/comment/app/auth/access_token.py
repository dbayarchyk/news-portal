from jwt import decode, ExpiredSignatureError

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

ACCESS_TOKEN_SECRET = 'secret_access_token'

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_access_token(auth_token: str = Depends(oauth2_scheme)):
    return auth_token


def decode_access_token(access_token: str):
    try:
        return decode(
            access_token,
            ACCESS_TOKEN_SECRET,
            algorithms=['HS256'],
        )
    except (Exception, ExpiredSignatureError):
        return None


async def get_access_token_payload(access_token: str = Depends(get_access_token)):
    payload = decode_access_token(access_token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload
