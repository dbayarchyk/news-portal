import fetch from "isomorphic-fetch";

const isBrowser = typeof window !== "undefined";
const ARTICLE_SERVICE_URL = isBrowser
  ? "api/article"
  : "http://api-article-service:5000";

export async function getArticles() {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles`);
}

export async function getArticleById(id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);
}
