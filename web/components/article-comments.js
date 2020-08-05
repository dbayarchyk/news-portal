import React from "react";

function ArticleComments({ article }) {
  return (
    <section>
      <h1>Comments</h1>

      <p>{article.areCommentsEnabled ? "Enabled" : "Disabled"}</p>
    </section>
  );
}

ArticleComments.fragments = {
  article: /* GraphQL */ `
    fragment ArticleComments_article on Article {
      sys {
        id
      }
      areCommentsEnabled
    }
  `,
};

export default ArticleComments;
