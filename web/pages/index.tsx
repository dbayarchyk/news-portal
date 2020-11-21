import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";

import { HomePageAllArticlesQuery } from "../generated/graphql-types";
import graphql from '../api/contentful/graphql';
import { getHeadTitle } from "../utils/head-title";
import RecentArticles from "../components/recent-articles";

async function queryRecentArticles() {
  return await graphql(
    /* GraphQL */ `
      query HomePageRecentArticles {
        articleCollection(
          limit: 4
          order: [sys_publishedAt_DESC]
        ) {
          ...RecentArticles_articleCollection
        }
      }
      ${RecentArticles.fragments.articleCollection}
    `,
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await queryRecentArticles();

  return {
    props: {
      recentArticleCollection: data.articleCollection,
    },
  };
};

type HomePageProps = {
  recentArticleCollection: HomePageAllArticlesQuery["articleCollection"];
};

const HomePage: React.FC<HomePageProps> = ({ recentArticleCollection }) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle()}</title>
      </Head>

      <RecentArticles articleCollection={recentArticleCollection} />
    </>
  );
};

export default HomePage;
