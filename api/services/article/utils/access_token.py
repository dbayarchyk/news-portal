import jwt

ACCESS_TOKEN_SECRET = 'secret_access_token'

def decode_access_token(access_token):
    return jwt.decode(
        access_token,
        ACCESS_TOKEN_SECRET,
        algorithms=['HS256'],
    )