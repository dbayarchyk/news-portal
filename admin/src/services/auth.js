import fetch from "isomorphic-fetch";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";

const AUTH_SERVICE_URL = process.browser
  ? "api/auth"
  : "http://api-auth-service:5000";

let inMemoryToken = null;

export function getAuthHeaders() {
  if (!inMemoryToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${inMemoryToken.access_token}`,
  };
}

export async function signIn(requestData) {
  const response = await fetch(`${AUTH_SERVICE_URL}/v1/signin`, {
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

      inMemoryToken = {
        access_token: responseData.access_token,
      };

      break;
    }

    default: {
      throw new UnknownError();
    }
  }
}

export async function refresh() {
  const response = await fetch(`${AUTH_SERVICE_URL}/v1/refresh`);

  const responseData = await response.json();

  if (response.status !== 200 || !responseData.access_token) {
    throw new UnknownError();
  }

  inMemoryToken = {
    access_token: responseData.access_token,
  };
}

export async function singOut() {
  inMemoryToken = null;

  await fetch(`${AUTH_SERVICE_URL}/v1/signout`);
}
