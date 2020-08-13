import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import "isomorphic-fetch";

import { HomePageAllArticlesQuery } from "../generated/graphql-types";
import { getHeadTitle } from "../utils/head-title";
import ArticlePreview from "../components/article-preview";
import ArticlePreviews from "../components/article-previews";

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
              ...ArticlePreviews_articleCollection
            }
          }
          ${ArticlePreviews.fragments.articleCollection}
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
      articleCollection: data.articleCollection,
    },
  };
};

type HomePageProps = {
  articleCollection: HomePageAllArticlesQuery["articleCollection"];
};

const HomePage: React.FC<HomePageProps> = ({ articleCollection }) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle()}</title>
      </Head>

      <ArticlePreviews articleCollection={articleCollection} />
    </>
  );
};

export default HomePage;
