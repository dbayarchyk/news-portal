def get_authorization_header(headers):
    return headers['Authorization'].split(' ')[1] if 'Authorization' in headers else None