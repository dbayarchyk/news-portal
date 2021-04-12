import { NextPageContext, GetServerSidePropsContext } from 'next';

const extendFetchWithSSRContext = (
  context: NextPageContext | GetServerSidePropsContext,
  fetch: typeof global.fetch,
) =>
  (input: RequestInfo, init: RequestInit = {}): ReturnType<typeof window.fetch> =>
    fetch(
      input,
      {
        ...init,
        headers: {
          cookie: context.req.headers.cookie,
          ...init.headers
        }
      },
    );

export default extendFetchWithSSRContext;
