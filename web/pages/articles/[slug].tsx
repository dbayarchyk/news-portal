import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import "isomorphic-fetch";

import Article from "../../components/article";
import ArticleComments from "../../components/article-comments";
import Center from "../../components/ui/layouts/center";
import Stack from "../../components/ui/layouts/stack";
import { ArticlePageQuery } from "../../generated/graphql-types";
import { getHeadTitle } from "../../utils/head-title";

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
          query ArticlePageAllArticles {
            articleCollection {
              items {
                sys {
                  id
                }
                slug
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await queryAllArticles();
  const paths = data.articleCollection.items.map((item) => ({
    params: {
      slug: item.slug,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

async function queryArticle(slug) {
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
      }),
    }
  );
  const responsePayload = await response.json();

  return responsePayload;
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
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
