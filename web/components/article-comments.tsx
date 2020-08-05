import React from "react";

import { ArticleComments_ArticleFragment } from "../generated/graphql-types";

type ArticleCommentsProps = {
  article: ArticleComments_ArticleFragment;
};

const ArticleComments: React.FCWithFragments<ArticleCommentsProps> = ({
  article,
}) => {
  return (
    <section>
      <h1>Comments</h1>

      <p>{article.areCommentsEnabled ? "Enabled" : "Disabled"}</p>
    </section>
  );
};

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
