import queryString from "query-string";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";
import AuthService from "./authService";
import AccessTokenService from "./accessTokenService";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/article"
  : "http://api-article-service:5000";

class ArticleService {
  constructor(fetch, serverSession) {
    this.fetch = fetch;
    this.authService = new AuthService(
      this.fetch,
      new AccessTokenService(serverSession)
    );
  }

  async getArticles(queryParams = {}) {
    return this.fetch(
      `${ARTICLE_SERVICE_URL}/v1/articles?${queryString.stringify(
        queryParams
      )}`,
      {
        headers: {
          ...this.authService.getAuthHeaders(),
        },
      }
    );
  }

  async getArticleById(id) {
    return this.fetch(`${ARTICLE_SERVICE_URL}/v1/articles/${id}`, {
      headers: {
        ...this.authService.getAuthHeaders(),
      },
    });
  }

  async createArticle(requestData) {
    const response = await this.fetch(`${ARTICLE_SERVICE_URL}/v1/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.authService.getAuthHeaders(),
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    switch (response.status) {
      case 400: {
        throw new ValidationErrors(responseData);
      }

      case 201: {
        return responseData;
      }

      default: {
        throw new UnknownError();
      }
    }
  }

  async updateArticleById(id, requestData) {
    const response = await this.fetch(
      `${ARTICLE_SERVICE_URL}/v1/articles/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...this.authService.getAuthHeaders(),
        },
        body: JSON.stringify(requestData),
      }
    );

    const responseData = await response.json();

    switch (response.status) {
      case 400: {
        throw new ValidationErrors(responseData);
      }

      case 200: {
        return responseData;
      }

      default: {
        throw new UnknownError();
      }
    }
  }
}

export default ArticleService;
