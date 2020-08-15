import React from "react";
import Link from "next/link";

import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import { ArticlePreview_ArticleFragment } from "../generated/graphql-types";
import styles from "./article-preview.module.scss";

type ArticlePreviewProps = {
  article: ArticlePreview_ArticleFragment;
};

const ArticlePreview: React.FCWithFragments<ArticlePreviewProps> = ({
  article,
}) => {
  return (
    <article className={styles.article}>
      <div>
        <HeadlineText level="2">
          <Link href={`articles/[slug]`} as={`articles/${article.slug}`}>
            <a className={styles.titleLink}>{article.title}</a>
          </Link>
        </HeadlineText>

        <BodyText type="secondary">
          {new Date(article.sys.publishedAt).toLocaleDateString()}
        </BodyText>
      </div>

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
