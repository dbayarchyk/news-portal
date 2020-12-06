import "isomorphic-fetch";

type QueryResult<Query> = {
  data: Query;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphql = async <Query = any, Variables extends Record<string, any> = unknown>(query: string, variables: Variables = {} as Variables): Promise<QueryResult<Query>> => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );
  const responsePayload = await response.json();

  return responsePayload;
};

export default graphql;