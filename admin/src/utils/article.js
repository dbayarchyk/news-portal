import queryString from "query-string";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/article"
  : "http://api-article-service:5000";

export function getArticles(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/articles?${queryString.stringify(queryParams)}`
  );
}

export function getArticleById(fetch, id) {
  return fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`);
}

export async function createArticle(fetch, requestData) {
  const response = await fetch(`${ARTICLE_SERVICE_URL}/v1/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  switch (response.status) {
    case 400: {
      const errors = await response.json();
      throw new ValidationErrors(errors);
    }

    case 201: {
      const createdArticle = await response.json();
      return createdArticle;
    }

    default: {
      throw new UnknownError();
    }
  }
}

export async function updateArticleById(fetch, id, requestData) {
  const response = await fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  switch (response.status) {
    case 400: {
      const errors = await response.json();
      throw new ValidationErrors(errors);
    }

    case 200: {
      const updatedArticle = await response.json();
      return updatedArticle;
    }

    default: {
      throw new UnknownError();
    }
  }
}

export async function publishArticleById(fetch, id) {
  const response = await fetch(
    `${ARTICLE_SERVICE_URL}/v1/articles/${id}/publish`,
    {
      method: "POST",
    }
  );

  const responseData = await response.json();

  switch (response.status) {
    case 200: {
      return responseData;
    }

    default: {
      if (responseData.message) {
        throw new Error(responseData.message);
      }

      throw new UnknownError();
    }
  }
}

export async function archiveArticleById(fetch, id) {
  const response = await fetch(
    `${ARTICLE_SERVICE_URL}/v1/articles/${id}/archive`,
    {
      method: "POST",
    }
  );

  const responseData = await response.json();

  switch (response.status) {
    case 200: {
      return responseData;
    }

    default: {
      if (responseData.message) {
        throw new Error(responseData.message);
      }

      throw new UnknownError();
    }
  }
}
