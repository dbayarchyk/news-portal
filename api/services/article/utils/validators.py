def validate_title(title):
    if title is None or len(title) == 0:
        raise ValueError('Please provide a title.')

def validate_content(content):
    if content is None or len(content) == 0:
        raise ValueError('Please provide a content.')

