import jwtDecode from "jwt-decode";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";
import AccessDeniedError from "../errors/accessDeniedError";

const AUTH_SERVICE_URL = process.browser
  ? "api/auth"
  : "http://api-auth-service:5000";

class AuthHttpService {
  constructor(fetch, accessTokenService) {
    this.fetch = fetch;
    this.accessTokenService = accessTokenService;
  }

  getAuthHeaders() {
    const accessToken = this.accessTokenService.getToken();

    if (!accessToken) {
      return {};
    }

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async signIn(requestData) {
    const response = await this.fetch(`${AUTH_SERVICE_URL}/v1/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    switch (response.status) {
      case 400: {
        throw new ValidationErrors(responseData);
      }

      case 200: {
        if (!responseData.access_token) {
          throw new UnknownError();
        }

        const accessTokenPayload = jwtDecode(responseData.access_token);

        if (!["WRITER", "ADMIN"].includes(accessTokenPayload.role)) {
          throw new AccessDeniedError();
        }

        if (process.browser) {
          this.accessTokenService.setInMemoryToken(responseData.access_token);
        }

        break;
      }

      default: {
        throw new UnknownError();
      }
    }
  }

  async refresh() {
    const response = await this.fetch(`${AUTH_SERVICE_URL}/v1/refresh`, {
      credentials: "include",
    });

    const responseData = await response.json();

    if (response.status !== 200 || !responseData.access_token) {
      throw new UnknownError();
    }

    if (process.browser) {
      this.accessTokenService.setInMemoryToken(responseData.access_token);
    }

    return responseData.access_token;
  }

  async singOut() {
    await this.fetch(`${AUTH_SERVICE_URL}/v1/signout`);
  }
}

export default AuthHttpService;
