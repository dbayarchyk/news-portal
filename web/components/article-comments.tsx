import React from "react";
import { useQuery } from "react-query";

import { ArticleComments_ArticleFragment } from "../generated/graphql-types";
import { getCommentsByArticleId } from "../api/comment";
import CommentsTree from "./comments-tree";
import CommentForm from "./comment-form";

type ArticleCommentsProps = {
  article: ArticleComments_ArticleFragment;
};

const ArticleComments: React.FCWithFragments<ArticleCommentsProps> = ({
  article,
}) => {
  const { data, isLoading, refetch } = useQuery(
    `article-${article}-comments`,
    () => getCommentsByArticleId(article.sys.id),
    { enabled: article.areCommentsEnabled }
  );

  const handleCommentCreation = () => {
    refetch();
  };

  return (
    <section>
      <h1 id="comments">Comments</h1>

      {article.areCommentsEnabled ? (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <CommentsTree describedBy="comments" comments={data.items} />
          )}
          <CommentForm
            articleId={article.sys.id}
            onCreate={handleCommentCreation}
          />
        </>
      ) : (
        <p>Disabled</p>
      )}
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
