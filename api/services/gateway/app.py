from flask import Flask, request, make_response
import requests

AUTH_SERVICE_ENDPOINT = 'http://api-auth-service:5000'
ARTICLE_SERVICE_ENDPOINT = 'http://api-article-service:5000'
COMMENT_SERVICE_ENDPOINT = 'http://api-comment-service:5000'
MARKET_SERVICE_ENDPOINT = 'http://api-market-service:8000'

app = Flask(__name__)


def proxy_request(url):
    proxied_response = requests.request(
        request.method,
        url,
        params=request.args,
        stream=True,
        headers=request.headers,
        allow_redirects=True,
        data=request.data
    )

    response = make_response(
        proxied_response.content,
        proxied_response.status_code,
        dict(proxied_response.headers)
    )

    return response


@app.route('/auth/<path:path>', methods=['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def auth_proxy(path):
    return proxy_request(f'{AUTH_SERVICE_ENDPOINT}/{path}')


@app.route('/article/<path:path>', methods=['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def article_proxy(path):
    return proxy_request(f'{ARTICLE_SERVICE_ENDPOINT}/{path}')


@app.route('/market/<path:path>', methods=['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def market_proxy(path):
    return proxy_request(f'{MARKET_SERVICE_ENDPOINT}/{path}')


@app.route('/comment/<path:path>', methods=['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def comment_proxy(path):
    return proxy_request(f'{COMMENT_SERVICE_ENDPOINT}/{path}')


def get_user_by_id(id):
    response = requests.get(
        f'{AUTH_SERVICE_ENDPOINT}/v1/users/{id}',
        params=request.args,
        headers=request.headers
    )

    if response.status_code != 200:
        return None

    return response.json()


def get_comments_count(article_id):
    response = requests.get(
        f'{COMMENT_SERVICE_ENDPOINT}/v1/comments?page_size=0&article_id={article_id}',
        params=request.args,
        headers=request.headers
    )

    if response.status_code != 200:
        return None

    response_data = response.json()

    return response_data['items_count']


def aggregate_article_with_author(article):
    author_id = article.pop('author_id', None)

    # TODO: fetch all users at once.
    user = get_user_by_id(author_id)

    aggregated_article = article.copy()
    aggregated_article['author'] = user

    return aggregated_article


def aggregate_article_with_comments_count(article):
    comments_count = get_comments_count(article['id'])

    aggregated_article = article.copy()
    aggregated_article['comments_count'] = comments_count

    return aggregated_article


def aggregate_article(article):
    aggregated_article_with_author = aggregate_article_with_author(article)
    aggregated_article_with_author_and_comments_count = aggregate_article_with_comments_count(
        aggregated_article_with_author
    )

    return aggregated_article_with_author_and_comments_count


@app.route('/article/v1/articles', methods=['GET'])
def get_articles_handler():
    articles_response = requests.get(
        f'{ARTICLE_SERVICE_ENDPOINT}/v1/articles',
        params=request.args,
        headers=request.headers
    )

    if articles_response.status_code != 200:
        return make_response(
            articles_response.content,
            articles_response.status_code,
            dict(articles_response.headers)
        )

    articles_response_data = articles_response.json()
    aggregated_response_data = articles_response_data.copy()

    aggregated_response_data['items'] = list(map(
        aggregate_article,
        articles_response_data['items'],
    ))

    excluded_headers = ['content-encoding',
                        'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in articles_response.headers.items(
    ) if name.lower() not in excluded_headers]

    return make_response(
        aggregated_response_data,
        articles_response.status_code,
        dict(headers)
    )


@app.route('/article/v1/articles/<id>', methods=['GET'])
def get_article_by_id_handler(id):
    article_response = requests.get(
        f'{ARTICLE_SERVICE_ENDPOINT}/v1/articles/{id}',
        params=request.args,
        headers=request.headers
    )

    if article_response.status_code != 200:
        return make_response(
            article_response.content,
            article_response.status_code,
            dict(article_response.headers)
        )

    article_response_data = article_response.json()
    aggregated_response_data = aggregate_article(article_response_data.copy())

    excluded_headers = ['content-encoding',
                        'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in article_response.headers.items(
    ) if name.lower() not in excluded_headers]

    return make_response(
        aggregated_response_data,
        article_response.status_code,
        dict(headers)
    )


def aggregate_comment_with_author(comment):
    author_id = comment.pop('author_id', None)

    # TODO: fetch all users at once.
    user = get_user_by_id(author_id)

    aggregated_comment = comment.copy()
    aggregated_comment['author'] = user

    return aggregated_comment


def aggregate_comment(comment):
    aggregated_comment_with_author = aggregate_comment_with_author(comment)

    return aggregated_comment_with_author


@app.route('/comment/v1/comments', methods=['GET'])
def get_comments_handler():
    comments_response = requests.get(
        f'{COMMENT_SERVICE_ENDPOINT}/v1/comments',
        params=request.args,
        headers=request.headers
    )

    if comments_response.status_code != 200:
        return make_response(
            comments_response.content,
            comments_response.status_code,
            dict(comments_response.headers)
        )

    comments_response_data = comments_response.json()
    aggregated_response_data = comments_response_data.copy()

    aggregated_response_data['items'] = list(map(
        aggregate_comment,
        comments_response_data['items'],
    ))

    excluded_headers = ['content-encoding',
                        'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in comments_response.headers.items(
    ) if name.lower() not in excluded_headers]

    return make_response(
        aggregated_response_data,
        comments_response.status_code,
        dict(headers)
    )


@app.route('/comment/v1/comments', methods=['POST'])
def create_comment_handler_v1():
    create_comment_response = requests.request(
        'POST',
        url=f'{COMMENT_SERVICE_ENDPOINT}/v1/comments',
        params=request.args,
        headers=request.headers,
        data=request.data
    )

    if create_comment_response.status_code != 201:
        return make_response(
            create_comment_response.content,
            create_comment_response.status_code,
            dict(create_comment_response.headers)
        )

    create_comment_response_data = create_comment_response.json()

    aggregated_response_data = aggregate_comment(
        create_comment_response_data.copy())

    excluded_headers = ['content-encoding',
                        'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in create_comment_response.headers.items(
    ) if name.lower() not in excluded_headers]

    return make_response(
        aggregated_response_data,
        create_comment_response.status_code,
        dict(headers)
    )
