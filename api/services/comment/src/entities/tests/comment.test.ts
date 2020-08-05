import { Comment } from "../../entities/comment";
import { Content } from "../../value-objects/content";
import { ArticleId } from "../../value-objects/article-id";
import { AuthorId } from "../../value-objects/author-id";
import { ParentCommentId } from "../../value-objects/parent-comment-id";
import { CreatedAt } from "../../value-objects/created-at";
import { UpdatedAt } from "../../value-objects/updated-at";

describe("Comment Entity", () => {
  let comment: Comment;

  beforeEach(() => {
    comment = new Comment({
      content: Content.create("Nice comments!").value,
      articleId: ArticleId.create("test-article").value,
      authorId: AuthorId.create("test-author").value,
      parentCommentId: ParentCommentId.create("test-comment-id").value,
      createdAt: CreatedAt.create(null),
      updatedAt: UpdatedAt.create(null),
    });
  });

  describe("content getter", () => {
    it("should return content value", () => {
      expect(
        comment.content.equals(Content.create("Nice comments!").value)
      ).toBe(true);
    });
  });

  describe("articleId getter", () => {
    it("should return article id value", () => {
      expect(
        comment.articleId.equals(ArticleId.create("test-article").value)
      ).toBe(true);
    });
  });

  describe("authorId getter", () => {
    it("should return author id value", () => {
      expect(
        comment.authorId.equals(AuthorId.create("test-author").value)
      ).toBe(true);
    });
  });
});
