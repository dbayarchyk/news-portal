import React from "react";

import ArticlePreview from "./article-preview";
import { ArticlePreviews_ArticleCollectionFragment } from "../generated/graphql-types";
import styles from "./article-previews.module.scss";

type ArticlePreviewsProps = {
  articleCollection: ArticlePreviews_ArticleCollectionFragment;
};

const ArticlePreviews: React.FCWithFragments<ArticlePreviewsProps> = ({
  articleCollection,
}) => {
  return (
    <ul className={styles.list}>
      {articleCollection.items.map((article) => (
        <li key={article.slug}>
          <ArticlePreview
            className={styles.listItemContent}
            article={article}
          />
        </li>
      ))}
    </ul>
  );
};

ArticlePreviews.fragments = {
  articleCollection: /* GraphQL */ `
    fragment ArticlePreviews_articleCollection on ArticleCollection {
      items {
        slug
        ...ArticlePreview_article
      }
    }
    ${ArticlePreview.fragments.article}
  `,
};

export default ArticlePreviews;
