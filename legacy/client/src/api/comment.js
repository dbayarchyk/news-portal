import queryString from "query-string";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/comment"
  : "http://api-gateway-service:5000/comment";

export function getComments(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/comments/?${queryString.stringify(queryParams)}`
  );
}

export async function createComment(fetch, requestData) {
  const response = await fetch(`${ARTICLE_SERVICE_URL}/v1/comments/`, {
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
