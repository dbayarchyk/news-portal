import React from "react";

import ArticlePreview from "../article-preview";
import Stack from "../ui/layouts/stack";
import HeadlineText from "../ui/headline-text";
import HeadlineDash from "../ui/headline-dash";
import { TopArticles_ArticleCollectionFragment } from "../../generated/graphql-types";
import styles from "./top-articles.module.scss";

type TopArticlesProps = {
  articleCollection: TopArticles_ArticleCollectionFragment;
};

const TopArticles: React.FCWithFragments<TopArticlesProps> = ({
  articleCollection,
}) => {
  if (articleCollection.items.length === 0) {
    return null;
  }

  const headlineId = "top-news";
  const hasEnoughItemsToStretchFirstItem = articleCollection.items.length > 4;

  return (
    <Stack as="section" scale="4">
      <HeadlineText level="2" id={headlineId}>
        <HeadlineDash /> Top news
      </HeadlineText>

      <ul className={styles.list} aria-labelledby={headlineId}>
        {articleCollection.items.map((article, articleIndex) => {
          const isArticlePreviewStretched = hasEnoughItemsToStretchFirstItem && articleIndex === 0;
          
          return (
            <li
              key={article.slug}
              className={
                [styles.listItem]
                  .concat(isArticlePreviewStretched ? [styles.stretchedListItem] : [])
                  .join(" ")
              }
            >
              <ArticlePreview
                className={styles.listItemContent}
                article={article}
              />
            </li>
          );
        })}
      </ul>
    </Stack>
  );
};

TopArticles.fragments = {
  articleCollection: /* GraphQL */ `
    fragment TopArticles_articleCollection on ArticleCollection {
      items {
        slug
        ...ArticlePreview_article
      }
    }
    ${ArticlePreview.fragments.article}
  `,
};

export default TopArticles;
