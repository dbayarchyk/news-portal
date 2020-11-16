import "isomorphic-fetch";
import { NextPageContext } from 'next';

type Context = NextPageContext;

const DEFAULT_CONTEXT = { req: { headers: {} } } as Context;

const getAPIFetch = (context: Context = DEFAULT_CONTEXT) =>
  (relativeUrl: string, init?: RequestInit): Promise<Response> =>
    fetch(
      getFullAPIUrl(relativeUrl),
      {
        ...(init ? { init }: {}),
        headers: {
          ...context.req.headers as HeadersInit,
          ...(init?.headers ? init.headers : {}),
        },
      },
    );

const getFullAPIUrl = (relativeUrl: string) => `${getAPIBaseUrl()}${relativeUrl}`;

const SERVICE_NAME = "ingress-nginx-controller";
const NAMESPACE = "ingress-nginx";
const getAPIBaseUrl = () =>
  typeof window === "undefined"
    ? `http://${SERVICE_NAME}.${NAMESPACE}.svc.cluster.local/api`
    : "/api";

export default getAPIFetch;
