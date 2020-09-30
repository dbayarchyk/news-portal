import { CommentMapper } from "../comment-mapper";
import { Comment } from "../../domain/comment/comment";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";
import { Content } from "../../domain/comment/content";
import { ArticleId } from "../../domain/comment/article-id";
import { AuthorId } from "../../domain/comment/author-id";
import { ParentCommentId } from "../../domain/comment/parent-comment-id";
import { Timestamp } from "../../domain/comment/timestamp";

describe("CommentMapper", () => {
  describe("toEntity", () => {
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

      const comment = CommentMapper.toEntityFromPersistance(commentPersistance);

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

  describe("toPersistence", () => {
    it("should map comment entity to persistance", () => {
      const comment = new Comment(
        {
          content: Content.create("Nice article!").value,
          authorId: AuthorId.create("some-author-id").value,
          articleId: ArticleId.create("some-article-id").value,
          parentCommentId: ParentCommentId.create("some-comment-id").value,
          createdAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
          updatedAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
        },
        new UniqueEntityID("some-id")
      );

      expect(CommentMapper.toPersistenceFromEntity(comment)).toEqual({
        _id: "some-id",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "2020-09-19T11:50:04.716Z",
        updatedAt: "2020-09-19T11:50:04.716Z",
      });
    });
  });

  describe("toDTO", () => {
    it("should map comment entity to DTO", () => {
      const comment = new Comment(
        {
          content: Content.create("Nice article!").value,
          authorId: AuthorId.create("some-author-id").value,
          articleId: ArticleId.create("some-article-id").value,
          parentCommentId: ParentCommentId.create("some-comment-id").value,
          createdAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
          updatedAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
        },
        new UniqueEntityID("some-id")
      );

      expect(CommentMapper.toDTOFromEntity(comment)).toEqual({
        id: "some-id",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "2020-09-19T11:50:04.716Z",
        updatedAt: "2020-09-19T11:50:04.716Z",
      });
    });
  });
});
