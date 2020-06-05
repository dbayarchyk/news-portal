import jwtDecode from "jwt-decode";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";
import { setInMemoryAccessToken } from "./accessToken";

const AUTH_SERVICE_URL = process.browser
  ? "api/auth"
  : "http://api-auth-service:5000";

export async function signIn(fetch, requestData) {
  const response = await fetch(`${AUTH_SERVICE_URL}/v1/signin`, {
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

    case 200: {
      const data = await response.json();

      if (!data.access_token) {
        throw new UnknownError();
      }

      const accessTokenPayload = jwtDecode(data.access_token);

      if (!["WRITER", "ADMIN"].includes(accessTokenPayload.role)) {
        throw new AccessDeniedError();
      }

      if (process.browser) {
        setInMemoryAccessToken(data.access_token);
      }

      break;
    }

    default: {
      throw new UnknownError();
    }
  }
}

export async function refresh(fetch) {
  const response = await fetch(`${AUTH_SERVICE_URL}/v1/refresh`, {
    credentials: "include",
  });

  const responseData = await response.json();

  if (response.status !== 200 || !responseData.access_token) {
    throw new UnknownError();
  }

  if (process.browser) {
    setInMemoryAccessToken(responseData.access_token);
  }

  return responseData.access_token;
}

export async function singOut(fetch) {
  await fetch(`${AUTH_SERVICE_URL}/v1/signout`);
  setInMemoryToken(null);
}
