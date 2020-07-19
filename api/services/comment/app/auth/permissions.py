from typing import List

from fastapi import HTTPException, status


def check_permissions(access_token_payload, required_permissions: List[str]):
    all_permissions = access_token_payload.get("permissions", [])

    if any(permission in all_permissions for permission in required_permissions) is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
