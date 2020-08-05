import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import "isomorphic-fetch";

import HeadTitle from "../components/head-title";
import { HomePageAllArticlesQuery } from "../generated/graphql-types";

async function queryAllArticles() {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query HomePageAllArticles {
            articleCollection {
              items {
                slug
                title
                sys {
                  publishedAt
                }
              }
            }
          }
        `,
      }),
    }
  );
  const responsePayload = await response.json();

  return responsePayload;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await queryAllArticles();

  return {
    props: {
      articlesCollection: data.articleCollection,
    },
  };
};

type HomePageProps = {
  articlesCollection: HomePageAllArticlesQuery["articleCollection"];
};

const HomePage: React.FC<HomePageProps> = ({ articlesCollection }) => {
  return (
    <>
      <Head>
        <HeadTitle />
      </Head>

      <ul>
        {articlesCollection.items.map((article) => (
          <li key={article.slug}>
            <h2>
              <Link href={`articles/[slug]`} as={`articles/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            </h2>
            <p>{new Date(article.sys.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
