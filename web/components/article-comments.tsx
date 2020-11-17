import React from "react";
import { useQuery } from "react-query";

import { ArticleComments_ArticleFragment } from "../generated/graphql-types";
import getCommentsByArticleId from "../api/comment/get-comments-by-article-id";
import fetchAPI from '../api/fetch-api';
import CommentsTree from "./comments-tree";
import CommentForm from "./comment-form";
import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import ErrorMessage from "./ui/error-message";
import Stack from "./ui/layouts/stack";

type ArticleCommentsProps = {
  article: ArticleComments_ArticleFragment;
};

const ArticleComments: React.FCWithFragments<ArticleCommentsProps> = ({
  article,
}) => {
  const { data, isLoading, isError, refetch } = useQuery(
    `article-${article.sys.id}-comments`,
    () => getCommentsByArticleId(fetchAPI, article.sys.id),
    {
      enabled: article.areCommentsEnabled,
    }
  );

  const handleCommentCreation = () => {
    refetch();
  };

  return (
    <Stack scale="3">
      <HeadlineText level="1" id="comments">
        Comments
      </HeadlineText>

      {article.areCommentsEnabled ? (
        <>
          {(() => {
            if (isLoading) {
              return <BodyText>Loading...</BodyText>;
            }

            if (isError) {
              return <ErrorMessage>Comments could not be loaded.</ErrorMessage>;
            }

            return (
              <CommentsTree
                describedBy="comments"
                comments={data.items}
                onReply={handleCommentCreation}
              />
            );
          })()}

          <CommentForm
            articleId={article.sys.id}
            onCreate={handleCommentCreation}
          />
        </>
      ) : (
        <BodyText>Comments are disabled.</BodyText>
      )}
    </Stack>
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
