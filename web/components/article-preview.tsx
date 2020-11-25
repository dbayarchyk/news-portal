import React from "react";
import NextLink from "next/link";

import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import Link from "./ui/link";
import Stack from "./ui/layouts/stack";
import { ArticlePreview_ArticleFragment } from "../generated/graphql-types";
import styles from "./article-preview.module.scss";

type ArticlePreviewProps = {
  className?: string;
  article: ArticlePreview_ArticleFragment;
  isCondensed?: boolean;
};

const ArticlePreview: React.FCWithFragments<ArticlePreviewProps> = ({
  className,
  article,
  isCondensed,
}) => {
  return (
    <article
      className={[className, styles.article].concat(isCondensed ? [styles.condensedArticle] : []).join(" ")}
      data-testid="article-preview"
    >
      <Stack className={styles.header} scale="2">
        <HeadlineText level="3" data-testid="article-title">
          <NextLink href={`articles/[slug]`} as={`articles/${article.slug}`}>
            <Link className={styles.titleLink}>{article.title}</Link>
          </NextLink>
        </HeadlineText>

        <BodyText type="secondary">
          {new Date(article.sys.publishedAt).toLocaleDateString()}
        </BodyText>
      </Stack>

      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={article.previewImage.url}
          title={article.previewImage.title}
          alt={article.previewImage.description}
        />
      </div>
    </article>
  );
};

ArticlePreview.fragments = {
  article: /* GraphQL */ `
    fragment ArticlePreview_article on Article {
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
    }
  `,
};

export default ArticlePreview;
