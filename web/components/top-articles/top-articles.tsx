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
  const headlineId = "top-news";

  return (
    <Stack as="section" scale="4">
      <HeadlineText level="2" id={headlineId}>
        <HeadlineDash /> Top news
      </HeadlineText>

      <ul className={styles.list} aria-labelledby={headlineId}>
        {articleCollection.items.map((article) => (
          <li key={article.slug} className={styles.listItem}>
            <ArticlePreview
              className={styles.listItemContent}
              article={article}
            />
          </li>
        ))}
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
