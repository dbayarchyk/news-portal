import React from "react";
import Head from "next/head";
import "isomorphic-fetch";

import Article from "../../components/article";
import ArticleComments from "../../components/article-comments";
import HeadTitle from "../../components/head-title";

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
          query ArticlePageAllArticlesQuery {
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

export const getStaticPaths = async () => {
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
          query ArticlePageQuery {
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

export const getStaticProps = async ({ params: { slug } }) => {
  const { data } = await queryArticle(slug);

  return {
    props: {
      article: data.articleCollection.items[0],
    },
  };
};

function ArticlePage({ article }) {
  return (
    <>
      <Head>
        <HeadTitle>{article.title}</HeadTitle>
      </Head>

      <div>
        <Article article={article} />
        <ArticleComments article={article} />
      </div>
    </>
  );
}

export default ArticlePage;
