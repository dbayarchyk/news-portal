def validate_article_id(article_id):
    if article_id is None:
        raise ValueError('Please provide an article id.')

def validate_content(content):
    if content is None or len(content) == 0:
        raise ValueError('Please provide a content.')
