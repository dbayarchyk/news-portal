import queryString from "query-string";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";

const MARKET_SERVICE_URL = process.browser
  ? "api/market"
  : "http://api-gateway-service:5000/market";

export function getPositions(fetch, queryParams = {}) {
  return fetch(
    `${MARKET_SERVICE_URL}/v1/positions?${queryString.stringify(queryParams)}`
  );
}

export function getProgrammingLanguages(fetch, queryParams = {}) {
  return fetch(
    `${MARKET_SERVICE_URL}/v1/programming_languages?${queryString.stringify(
      queryParams
    )}`
  );
}

export function getCities(fetch, queryParams = {}) {
  return fetch(
    `${MARKET_SERVICE_URL}/v1/cities?${queryString.stringify(queryParams)}`
  );
}

export async function reportSalary(fetch, requestData) {
  const response = await fetch(`${MARKET_SERVICE_URL}/v1/salaries`, {
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
      return await response.json();
    }

    default: {
      throw new UnknownError();
    }
  }
}
