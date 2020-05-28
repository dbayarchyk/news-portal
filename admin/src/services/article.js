import fetch from "isomorphic-fetch";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/article"
  : "http://api-article-service:5000";

export async function getArticles() {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles`);
}

export async function getArticleById(id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);
}
