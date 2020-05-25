import fetch from "isomorphic-fetch";

const ARTICLE_SERVICE_URL = "http://localhost:5001";

export async function getArticles() {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles`);
}

export async function getArticleById(id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);
}
