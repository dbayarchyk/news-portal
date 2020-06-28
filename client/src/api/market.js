import queryString from "query-string";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/market"
  : "http://api-gateway-service:5000/market";

export function getPositions(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/positions?${queryString.stringify(queryParams)}`
  );
}

export function getProgrammingLanguages(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/programming_languages?${queryString.stringify(
      queryParams
    )}`
  );
}

export function getCities(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/cities?${queryString.stringify(queryParams)}`
  );
}
