import { CommentMapper } from "../../mappers/comment-mapper";
import { Comment } from "../../entities/comment";
import { UniqueId } from "../../value-objects/unique-id";
import { Content } from "../../value-objects/content";
import { ArticleId } from "../../value-objects/article-id";
import { AuthorId } from "../../value-objects/author-id";
import { ParentCommentId } from "../../value-objects/parent-comment-id";
import { CreatedAt } from "../../value-objects/created-at";
import { UpdatedAt } from "../../value-objects/updated-at";

describe("CommentMapper", () => {
  describe("toEntity", () => {
    it("should map comment persistance to entity", () => {
      const commentPersistance = {
        _id: "some-id",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "some created date",
        updatedAt: "some updated date",
      };

      const comment = CommentMapper.toEntity(commentPersistance);

      expect(comment.id.value).toBe(commentPersistance._id);
      expect(comment.content.value).toBe(commentPersistance.content);
      expect(comment.authorId.value).toBe(commentPersistance.authorId);
      expect(comment.articleId.value).toBe(commentPersistance.articleId);
      expect(comment.parentCommentId.value).toBe(
        commentPersistance.parentCommentId
      );
      expect(comment.createdAt.value).toBe(commentPersistance.createdAt);
      expect(comment.updatedAt.value).toBe(commentPersistance.updatedAt);
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
          createdAt: CreatedAt.create("some created date"),
          updatedAt: UpdatedAt.create("some updated date"),
        },
        UniqueId.create("some-id")
      );

      expect(CommentMapper.toPersistence(comment)).toEqual({
        _id: "some-id",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "some created date",
        updatedAt: "some updated date",
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
          createdAt: CreatedAt.create("some created date"),
          updatedAt: UpdatedAt.create("some updated date"),
        },
        UniqueId.create("some-id")
      );

      expect(CommentMapper.toDTO(comment)).toEqual({
        id: "some-id",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "some created date",
        updatedAt: "some updated date",
      });
    });
  });
});
