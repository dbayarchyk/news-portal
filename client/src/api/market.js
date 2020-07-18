import queryString from "query-string";

import ValidationErrors from "../errors/validationErrors";
import UnknownError from "../errors/unknownError";
import handle422ValidationError from "../utils/responseHandlers/handle422ValidationError";

const MARKET_SERVICE_URL = process.browser
  ? "api/market"
  : "http://api-gateway-service:5000/market";

export function getPositions(fetch, queryParams = {}) {
  return fetch(
    `${MARKET_SERVICE_URL}/v1/positions/?${queryString.stringify(queryParams)}`
  );
}

export function getTechnologies(fetch, queryParams = {}) {
  return fetch(
    `${MARKET_SERVICE_URL}/v1/technologies/?${queryString.stringify(
      queryParams
    )}`
  );
}

export function getCities(fetch, queryParams = {}) {
  return fetch(
    `${MARKET_SERVICE_URL}/v1/cities/?${queryString.stringify(queryParams)}`
  );
}

export async function reportSalary(fetch, requestData) {
  const response = await fetch(`${MARKET_SERVICE_URL}/v1/salaries/`, {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  switch (response.status) {
    case 422: {
      return handle422ValidationError(await response.json());
    }

    case 201: {
      return await response.json();
    }

    default: {
      throw new UnknownError();
    }
  }
}

export async function getGroupedSalaryReport(fetch, groupBy) {
  return fetch(`${MARKET_SERVICE_URL}/v1/salaries/report/group/${groupBy}/`);
}
