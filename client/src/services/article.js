import fetch from "isomorphic-fetch";

const ARTICLE_SERVICE_URL = "http://localhost:5001";

export async function getArticles() {
  const result = await fetch(`${ARTICLE_SERVICE_URL}/v1/articles`);

  return result.json();
}

export async function getArticleById(id) {
  const result = await fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);

  return result.json();
}
