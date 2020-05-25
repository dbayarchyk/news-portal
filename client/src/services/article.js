import fetch from "isomorphic-fetch";

const ARTICLE_SERVICE_URL = "http://api-services-article:5000";

export async function getArticles() {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles`);
}

export async function getArticleById(id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);
}
