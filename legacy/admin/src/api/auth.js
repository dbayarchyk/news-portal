import jwtDecode from "jwt-decode";

import AccessDeniedError from "../errors/accessDeniedError";
import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";
import handle422ValidationError from '../utils/responseHandlers/handle422ValidationError';

const AUTH_SERVICE_URL = process.browser
  ? "api/auth"
  : "http://api-gateway-service:5000/auth";

export async function signIn(fetch, requestData) {
  const formData = new FormData();

  formData.append("username", requestData.username);
  formData.append("password", requestData.password);

  const response = await fetch(`${AUTH_SERVICE_URL}/v1/token/access/`, {
    method: "POST",
    body: formData,
  });

  switch (response.status) {
    case 400: {
      const error = await response.json();
      throw new ValidationErrors(error.detail);
    }

    case 422: {
      return handle422ValidationError(await response.json());
    }

    case 200: {
      const data = await response.json();

      if (!data.access_token) {
        throw new UnknownError();
      }

      try {
        const accessTokenPayload = jwtDecode(data.access_token);

        if (!["WRITER", "ADMIN"].includes(accessTokenPayload.role)) {
          throw new AccessDeniedError();
        }
      } catch {
        throw new AccessDeniedError();
      }

      return data.access_token;
    }

    default: {
      throw new UnknownError();
    }
  }
}

export async function refresh(fetch) {
  const response = await fetch(`${AUTH_SERVICE_URL}/v1/token/access/refresh/`, {
    credentials: "include",
  });

  const responseData = await response.json();

  if (response.status !== 200 || !responseData.access_token) {
    throw new UnknownError();
  }

  return responseData.access_token;
}

export async function singOut(fetch) {
  return fetch(`${AUTH_SERVICE_URL}/v1/token/access/forget/`);
}
