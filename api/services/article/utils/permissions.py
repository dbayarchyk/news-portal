import requests

AUTH_SERVICE_ENDPOINT = 'http://api-auth-service:5000'

def get_visitor_permissions():
    try:
        result = requests.get(
            url = AUTH_SERVICE_ENDPOINT + '/v1/permissions/visitor'
        )

        if result.status_code != 200:
            return [result.status_code]

        data = result.json()

        return data['permissions'] if data is not None else []
    except Exception:
        return []

def get_permissions(access_token_payload):
    if access_token_payload is not None and access_token_payload['permissions'] is not None:
        return access_token_payload['permissions']

    # TODO: move that fallback in the app gateway service?
    visitor_permissions = get_visitor_permissions()

    return visitor_permissions if visitor_permissions is not None else []

def check_permission(all_permissions, required_permissions):
    return any(permission in all_permissions for permission in required_permissions)
