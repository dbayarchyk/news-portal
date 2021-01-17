import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import graphql from '../../api/contentful/graphql';
import Article from "../../components/article";
import ArticleComments from "../../components/article-comments";
import Center from "../../components/ui/layouts/center";
import Stack from "../../components/ui/layouts/stack";
import { ArticlePageQuery } from "../../generated/graphql-types";
import { getHeadTitle } from "../../utils/head-title";

async function queryArticle(slug) {
  const responsePayload = await graphql(
    /* GraphQL */ `
      query ArticlePage {
        articleCollection(
          where: { slug: "${slug}" }
        ) {
          items {
            ... Article_article
            ... ArticleComments_article
          }
        }
      }
      ${Article.fragments.article}
      ${ArticleComments.fragments.article}
    `,
  );

  return responsePayload;
}

export const getServerSideProps: GetServerSideProps = async ({ params: { slug } }) => {
  const { data } = await queryArticle(slug);

  return {
    props: {
      article: data.articleCollection.items[0],
    },
  };
};

type ArticlePageProps = {
  article: ArticlePageQuery["articleCollection"]["items"][0];
};

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle(article.title)}</title>
      </Head>

      <Center max="var(--line-length)">
        <Stack scale="6">
          <Article article={article} />
          <ArticleComments article={article} />
        </Stack>
      </Center>
    </>
  );
};

export default ArticlePage;
