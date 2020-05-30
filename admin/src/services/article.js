import fetch from "isomorphic-fetch";

import { getAuthHeaders } from "./auth";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/article"
  : "http://api-article-service:5000";

export async function getArticles() {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
}

export async function getArticleById(id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
}
