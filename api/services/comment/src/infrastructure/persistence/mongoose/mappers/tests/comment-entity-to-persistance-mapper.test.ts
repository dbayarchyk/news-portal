import { CommentEntityToPersistanceMapper } from "../comment-entity-to-persistance-mapper";
import { Comment } from "../../../../../domain/comment/comment";
import { UniqueEntityID } from "../../../../../shared/domain/unique-entity-id";
import { Content } from "../../../../../domain/comment/content";
import { ArticleId } from "../../../../../domain/comment/article-id";
import { AuthorId } from "../../../../../domain/comment/author-id";
import { ParentCommentId } from "../../../../../domain/comment/parent-comment-id";
import { Timestamp } from "../../../../../domain/comment/timestamp";
import { CommentPersistance } from "../../comment-model";

describe("CommentEntityToPersistanceMapper", () => {
  describe("mapEntityToPersistance", () => {
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

      expect(
        CommentEntityToPersistanceMapper.mapEntityToPersistance(comment)
      ).toEqual<CommentPersistance>({
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
});
