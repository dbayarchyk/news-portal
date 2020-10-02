import { CommentRepository } from "../../../domain/comment/comment-repository";
import { Comment } from "../../../domain/comment/comment";
import { UniqueEntityID } from "../../../shared/domain/unique-entity-id";
import { Content } from "../../../domain/comment/content";
import { ArticleId } from "../../../domain/comment/article-id";
import { AuthorId } from "../../../domain/comment/author-id";
import { ParentCommentId } from "../../../domain/comment/parent-comment-id";
import { Timestamp } from "../../../domain/comment/timestamp";
import { CommentDTO } from "../../dto/comment-dto";
import { GetCommentsByArticleIdUseCase } from "../get-comments-by-article-id";
import { MockCommentRepository } from "./mocks/mock-comment-repository";

describe("GetCommentsByArticleIdUseCase", () => {
  let commentRepository: CommentRepository;
  let useCase: GetCommentsByArticleIdUseCase;

  beforeEach(() => {
    commentRepository = new MockCommentRepository();
    useCase = new GetCommentsByArticleIdUseCase(commentRepository);
  });

  it("should return comment DTOs filtered by the article id", async () => {
    const articleId = "some-article-id";

    await fillRepositoryWithComments(articleId);

    const result = await useCase.execute({ articleId });

    expect(result).toEqual<CommentDTO[]>([
      {
        id: "comment-1",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "2020-09-19T11:50:04.716Z",
        updatedAt: "2020-09-19T11:50:04.716Z",
      },
      {
        id: "comment-3",
        content: "Nice article!",
        authorId: "some-author-id",
        articleId: "some-article-id",
        parentCommentId: "some-comment-id",
        createdAt: "2020-09-19T11:50:04.716Z",
        updatedAt: "2020-09-19T11:50:04.716Z",
      },
    ]);
  });

  async function fillRepositoryWithComments(articleId: string): Promise<void> {
    await commentRepository.save(
      new Comment(
        {
          content: Content.create("Nice article!").value,
          authorId: AuthorId.create("some-author-id").value,
          articleId: ArticleId.create(articleId).value,
          parentCommentId: ParentCommentId.create("some-comment-id").value,
          createdAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
          updatedAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
        },
        new UniqueEntityID("comment-1")
      )
    );
    await commentRepository.save(
      new Comment(
        {
          content: Content.create("Nice article!").value,
          authorId: AuthorId.create("some-author-id").value,
          articleId: ArticleId.create("some-random-article-id").value,
          parentCommentId: ParentCommentId.create("some-comment-id").value,
          createdAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
          updatedAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
        },
        new UniqueEntityID("comment-2")
      )
    );
    await commentRepository.save(
      new Comment(
        {
          content: Content.create("Nice article!").value,
          authorId: AuthorId.create("some-author-id").value,
          articleId: ArticleId.create(articleId).value,
          parentCommentId: ParentCommentId.create("some-comment-id").value,
          createdAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
          updatedAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
        },
        new UniqueEntityID("comment-3")
      )
    );
    await commentRepository.save(
      new Comment(
        {
          content: Content.create("Nice article!").value,
          authorId: AuthorId.create("some-author-id").value,
          articleId: ArticleId.create("some-random-article-id").value,
          parentCommentId: ParentCommentId.create("some-comment-id").value,
          createdAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
          updatedAt: Timestamp.create("2020-09-19T11:50:04.716Z").value,
        },
        new UniqueEntityID("comment-4")
      )
    );
  }
});
