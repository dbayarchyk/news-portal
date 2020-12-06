import React from "react";

import ArticlePreview from "../article-preview";
import Stack from "../ui/layouts/stack";
import HeadlineText from "../ui/headline-text";
import HeadlineDash from "../ui/headline-dash";
import { RecentArticles_ArticleCollectionFragment } from "../../generated/graphql-types";
import styles from "./recent-articles.module.scss";

type RecentArticlesProps = {
  articleCollection: RecentArticles_ArticleCollectionFragment;
};

const RecentArticles: React.FCWithFragments<RecentArticlesProps> = ({
  articleCollection,
}) => {
  if (articleCollection.items.length === 0) {
    return null;
  }

  const headlineId = "recent-news";

  return (
    <Stack as="section" scale="4">
      <HeadlineText level="2" id={headlineId}>
        <HeadlineDash /> Recent news
      </HeadlineText>

      <ul className={styles.list} aria-labelledby={headlineId}>
        {articleCollection.items.map((article) => (
          <li key={article.slug}>
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

RecentArticles.fragments = {
  articleCollection: /* GraphQL */ `
    fragment RecentArticles_articleCollection on ArticleCollection {
      items {
        slug
        ...ArticlePreview_article
      }
    }
    ${ArticlePreview.fragments.article}
  `,
};

export default RecentArticles;
