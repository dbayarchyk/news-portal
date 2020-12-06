import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import {
  HomePageAllArticlesQuery,
  HomePageAllArticlesQueryVariables,
  HomePageRecentArticlesQuery,
  HomePageRecentArticlesQueryVariables,
  HomePageTopArticlesQuery,
  HomePageTopArticlesQueryVariables,
} from "../generated/graphql-types";
import graphql from '../api/contentful/graphql';
import getTopArticleUrls from '../api/analytics/get-top-article-urls';
import fetchAPI from "../api/fetch-api";
import extendFetchWithSSRContext from "../api/extend-fetch-with-ssr-context";
import { getHeadTitle } from "../utils/head-title";
import RecentArticles from "../components/recent-articles";
import TopArticles from "../components/top-articles";
import AllArticles from "../components/all-articles";
import Stack from "../components/ui/layouts/stack";

type HomePageProps = {
  recentArticleCollection: HomePageRecentArticlesQuery["articleCollection"];
  topArticleCollection: HomePageTopArticlesQuery['articleCollection'];
  allArticleCollection: HomePageAllArticlesQuery['articleCollection'];
};

const HomePage: React.FC<HomePageProps> = ({
  recentArticleCollection,
  topArticleCollection,
  allArticleCollection,
}) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle()}</title>
      </Head>

      <Stack scale="8">
        <RecentArticles articleCollection={recentArticleCollection} />
        <TopArticles articleCollection={topArticleCollection} />
        <AllArticles articleCollection={allArticleCollection} />
      </Stack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const topArticleUrls = await getTopArticleUrls(
    extendFetchWithSSRContext(context, fetchAPI),
  );
  const ARTICLES_BASE_PATH = "/articles/";
  const topArticleSlugs = topArticleUrls.map(url => url.replace(ARTICLES_BASE_PATH, ""));
  const recentArticlesResult = await queryRecentArticles(topArticleSlugs);
  const topArticlesResult = await queryTopArticles(topArticleSlugs);
  const recentAndTopArticleSlugs = [
    ...recentArticlesResult.data.articleCollection.items.filter(item => item.slug).map(item => item.slug),
    ...topArticleSlugs,
  ];
  const allArticlesResult = await queryAllArticles(recentAndTopArticleSlugs);

  return {
    props: {
      recentArticleCollection: recentArticlesResult.data.articleCollection,
      topArticleCollection: topArticlesResult.data.articleCollection,
      allArticleCollection: allArticlesResult.data.articleCollection,
    },
  };
};

async function queryRecentArticles(excludeSlugs: string[]) {
  return await graphql<HomePageRecentArticlesQuery, HomePageRecentArticlesQueryVariables>(
    /* GraphQL */ `
      query HomePageRecentArticles($excludeSlugs: [String!]!) {
        articleCollection(
          limit: 4
          order: [sys_publishedAt_DESC]
          where: {
            slug_not_in: $excludeSlugs
          }
        ) {
          ...RecentArticles_articleCollection
        }
      }
      ${RecentArticles.fragments.articleCollection}
    `,
    { excludeSlugs }
  );
}

async function queryTopArticles(slugs: string[]) {
  return await graphql<HomePageTopArticlesQuery, HomePageTopArticlesQueryVariables>(
    /* GraphQL */ `
      query HomePageTopArticles($slugs: [String!]!) {
        articleCollection(
          limit: 5
          order: [sys_publishedAt_DESC]
          where: {
            slug_in: $slugs
          }
        ) {
          ...TopArticles_articleCollection
        }
      }
      ${TopArticles.fragments.articleCollection}
    `,
    { slugs }
  );
}

async function queryAllArticles(excludeSlugs: string[]) {
  return await graphql<HomePageAllArticlesQuery, HomePageAllArticlesQueryVariables>(
    /* GraphQL */ `
      query HomePageAllArticles($excludeSlugs: [String!]!) {
        articleCollection(
          limit: 4
          order: [sys_publishedAt_DESC]
          where: {
            slug_not_in: $excludeSlugs
          }
        ) {
          ...AllArticles_articleCollection
        }
      }
      ${AllArticles.fragments.articleCollection}
    `,
    { excludeSlugs }
  );
}

export default HomePage;
