import { CommentPersistanceToEntityMapper } from "../comment-persistance-to-entity-mapper";

describe("CommentPersistanceToEntityMapper", () => {
  describe("mapEntityToPersistance", () => {
    it("should map comment persistance to entity", () => {
      const commentPersistance = {
        _id: "some-id",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "2020-09-19T11:50:04.716Z",
        updatedAt: "2020-09-19T11:50:04.716Z",
      };

      const comment = CommentPersistanceToEntityMapper.mapPersistanceToEntity(
        commentPersistance
      );

      expect(comment.id.toValue()).toBe(commentPersistance._id);
      expect(comment.getContent().getValue()).toBe(commentPersistance.content);
      expect(comment.getAuthorId().getValue().toValue()).toBe(
        commentPersistance.authorId
      );
      expect(comment.getArticleId().getValue().toValue()).toBe(
        commentPersistance.articleId
      );
      expect(comment.getParentCommentId().getValue()?.toValue()).toBe(
        commentPersistance.parentCommentId
      );
      expect(comment.getCreatedAt().getValue()).toBe(
        commentPersistance.createdAt
      );
      expect(comment.getUpdatedAt().getValue()).toBe(
        commentPersistance.updatedAt
      );
    });
  });
});
