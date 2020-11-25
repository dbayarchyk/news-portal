import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";

import { HomePageRecentArticlesQuery, HomePageTopArticlesQuery } from "../generated/graphql-types";
import graphql from '../api/contentful/graphql';
import { getHeadTitle } from "../utils/head-title";
import RecentArticles from "../components/recent-articles";
import TopArticles from "../components/top-articles";
import AllArticles from "../components/all-articles";
import Stack from "../components/ui/layouts/stack";

type HomePageProps = {
  recentArticleCollection: HomePageRecentArticlesQuery["articleCollection"];
  topArticleCollection: HomePageTopArticlesQuery['articleCollection'];
};

const HomePage: React.FC<HomePageProps> = ({ recentArticleCollection }) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle()}</title>
      </Head>

      <Stack scale="8">
        <RecentArticles articleCollection={recentArticleCollection} />
        <TopArticles articleCollection={recentArticleCollection} />
        <AllArticles articleCollection={recentArticleCollection} />
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const recentArticlesResult = await queryRecentArticles();
  const topArticlesResult = await queryTopArticles();

  return {
    props: {
      recentArticleCollection: recentArticlesResult.data.articleCollection,
      topArticleCollection: topArticlesResult.data.articleCollection,
    },
  };
};

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

async function queryTopArticles() {
  return await graphql(
    /* GraphQL */ `
      query HomePageTopArticles {
        articleCollection(
          limit: 5
          order: [sys_publishedAt_DESC]
        ) {
          ...TopArticles_articleCollection
        }
      }
      ${TopArticles.fragments.articleCollection}
    `,
  );
}

export default HomePage;
