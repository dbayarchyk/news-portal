const extendFetchWithBaseAPI = (fetch: typeof window.fetch) => 
  (input: RequestInfo, init?: RequestInit): ReturnType<typeof window.fetch> =>
    fetch(`${getAPIBaseUrl()}${input}`, init);

const getAPIBaseUrl = () =>
  typeof window === "undefined"
    ? process.env.SERVER_SIDE_API_URL
    : process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL;

export default extendFetchWithBaseAPI;
