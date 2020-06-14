import queryString from "query-string";

const ARTICLE_SERVICE_URL = process.browser
  ? "api/comment"
  : "http://api-gateway-service:5000/comment";

export function getComments(fetch, queryParams = {}) {
  return fetch(
    `${ARTICLE_SERVICE_URL}/v1/comments?${queryString.stringify(queryParams)}`
  );
}
