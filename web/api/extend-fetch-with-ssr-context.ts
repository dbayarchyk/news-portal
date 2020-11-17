import { NextPageContext, GetServerSidePropsContext } from 'next';

const extendFetchWithSSRContext = (
  context: NextPageContext | GetServerSidePropsContext,
  fetch: typeof window.fetch,
) =>
  (input: RequestInfo, init: RequestInit = {}): ReturnType<typeof window.fetch> =>
    fetch(
      input,
      {
        ...init,
        headers: {
          ...context.req.headers as HeadersInit,
          ...init.headers
        }
      },
    );

export default extendFetchWithSSRContext;
