const AUTH_SERVICE_API =
  typeof window !== "undefined"
    ? `${process.env.NEXT_PUBLIC_API_URL}/auth`
    : `http://auth-service:8000`;

export default AUTH_SERVICE_API;
