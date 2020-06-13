import queryString from "query-string";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/article"
  : "http://api-gateway-service:5000/article";

export function getArticles(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/articles?${queryString.stringify(queryParams)}`
  );
}

export function getArticleById(fetch, id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);
}
