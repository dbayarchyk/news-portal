from flask import Flask, request, make_response
import requests

AUTH_SERVICE_ENDPOINT = 'http://api-auth-service:5000'
ARTICLE_SERVICE_ENDPOINT = 'http://api-article-service:5000'

app = Flask(__name__)

def proxy_request(url):
    proxied_response = requests.request(
        request.method,
        url,
        params = request.args,
        stream = True,
        headers = request.headers,
        allow_redirects = True,
        data = request.data
    )

    response = make_response(
        proxied_response.content,
        proxied_response.status_code,
        dict(proxied_response.headers)
    )

    return response

@app.route('/auth/<path:path>', methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def auth_proxy(path):
    return proxy_request(f'{AUTH_SERVICE_ENDPOINT}/{path}')

@app.route('/article/<path:path>', methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def article_proxy(path):
    return proxy_request(f'{ARTICLE_SERVICE_ENDPOINT}/{path}')

def get_user_by_id(id):
    response = requests.get(
        f'{AUTH_SERVICE_ENDPOINT}/v1/users/{id}',
        params = request.args,
        headers = request.headers
    )

    if response.status_code != 200:
        return None
    
    return response.json()

def aggregate_article_with_author(article):
    author_id = article.pop('author_id', None)

    # TODO: fetch all users at once.
    user = get_user_by_id(author_id)

    aggregated_article = article.copy()
    aggregated_article['author'] = user

    return aggregated_article

@app.route('/article/v1/articles', methods=['GET'])
def get_articles_handler():
    articles_response = requests.get(
        f'{ARTICLE_SERVICE_ENDPOINT}/v1/articles',
        params = request.args,
        headers = request.headers
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
        aggregate_article_with_author,
        articles_response_data['items'],
    ))

    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in articles_response.headers.items() if name.lower() not in excluded_headers]

    return make_response(
        aggregated_response_data,
        articles_response.status_code,
        dict(headers)
    )

@app.route('/article/v1/articles/<id>', methods=['GET'])
def get_article_by_id_handler(id):
    article_response = requests.get(
        f'{ARTICLE_SERVICE_ENDPOINT}/v1/articles/{id}',
        params = request.args,
        headers = request.headers
    )

    if article_response.status_code != 200:
        return make_response(
            article_response.content,
            article_response.status_code,
            dict(article_response.headers)
        )

    article_response_data = article_response.json()
    aggregated_response_data = aggregate_article_with_author(article_response_data.copy())

    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in article_response.headers.items() if name.lower() not in excluded_headers]

    return make_response(
        aggregated_response_data,
        article_response.status_code,
        dict(headers)
    )

    



