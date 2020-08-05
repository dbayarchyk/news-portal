import React from "react";

import ArticleContentCollection from "./article-content-collection";

function Article({ article }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <p>{new Date(article.sys.publishedAt).toLocaleDateString()}</p>
      <img
        src={article.previewImage.url}
        title={article.previewImage.title}
        alt={article.previewImage.description}
      />
      <ArticleContentCollection article={article} />
    </article>
  );
}

Article.fragments = {
  article: /* GraphQL */ `
    fragment Article_article on Article {
      title
      slug
      previewImage {
        title
        description
        url
      }
      sys {
        publishedAt
      }
      ...ArticleContentCollection_article
    }
    ${ArticleContentCollection.fragments.article}
  `,
};

export default Article;
