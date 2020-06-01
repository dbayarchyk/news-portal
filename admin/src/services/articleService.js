import queryString from "query-string";

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
}

export default ArticleService;
