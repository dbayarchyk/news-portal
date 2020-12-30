const extendFetchWithBaseAPI = (fetch: typeof window.fetch) => 
  (input: RequestInfo, init?: RequestInit): ReturnType<typeof window.fetch> =>
    fetch(`${getAPIBaseUrl()}${input}`, init);

const SERVICE_NAME = "nginx-ingress-ingress-nginx-controller";
const NAMESPACE = "ingress-nginx";
const getAPIBaseUrl = () =>
  typeof window === "undefined"
    ? `http://${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local/api`
    : "/api";

export default extendFetchWithBaseAPI;
