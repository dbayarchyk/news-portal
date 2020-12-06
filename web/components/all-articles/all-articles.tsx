import React from "react";
import Link from "next/link";

import ArticlePreview from "../article-preview";
import Center from "../ui/layouts/center";
import Stack from "../ui/layouts/stack";
import SecondaryButton from "../ui/buttons/secondary-button";
import HeadlineText from "../ui/headline-text";
import HeadlineDash from "../ui/headline-dash";
import { AllArticles_ArticleCollectionFragment } from "../../generated/graphql-types";
import styles from "./all-articles.module.scss";

type AllArticlesProps = {
  articleCollection: AllArticles_ArticleCollectionFragment;
};

const AllArticles: React.FCWithFragments<AllArticlesProps> = ({
  articleCollection,
}) => {
  if (articleCollection.items.length === 0) {
    return null;
  }

  const headlineId = "all-news";

  return (
    <Stack as="section" scale="4" className={styles.section}>
      <HeadlineText level="2" id={headlineId}>
        <HeadlineDash /> All articles
      </HeadlineText>

      <Stack as="ul" className={styles.list} scale="4" aria-labelledby={headlineId}>
        {articleCollection.items.map((article) => (
          <li key={article.slug}>
            <ArticlePreview
              className={styles.listItemContent}
              article={article}
              isCondensed
            />
          </li>
        ))}
      </Stack>

      <Center>
        <Link href="./articles">
          <a>
            <SecondaryButton
              type="button"
              title="Show more articles"  
              tabIndex={-1}
            />
          </a>
        </Link>
      </Center>
    </Stack>
  );
};

AllArticles.fragments = {
  articleCollection: /* GraphQL */ `
    fragment AllArticles_articleCollection on ArticleCollection {
      items {
        slug
        ...ArticlePreview_article
      }
    }
    ${ArticlePreview.fragments.article}
  `,
};

export default AllArticles;
