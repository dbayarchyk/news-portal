import { CommentRepository } from "../../../domain/comment/comment-repository";
import { CommentDTO } from "../../dto/comment-dto";
import {
  CreateCommentUseCase,
  CreateCommentRequest,
  CreateCommentValidationErrors,
} from "../create-comment";
import { MockCommentRepository } from "./mocks/mock-comment-repository";

describe("CreateCommentUseCase", () => {
  let commentRepository: CommentRepository;
  let commentRepositorySaveSpy: jest.SpyInstance;
  let useCase: CreateCommentUseCase;

  beforeEach(() => {
    commentRepository = new MockCommentRepository();
    commentRepositorySaveSpy = jest.spyOn(commentRepository, "save");
    useCase = new CreateCommentUseCase(commentRepository);
  });

  it("should store a comment and return its DTO", async () => {
    const request: CreateCommentRequest = {
      content: "Wow, what an article!",
      articleId: "some-article-id",
      authorId: "some-author-id",
      parentCommentId: null,
    };

    const result = await useCase.execute(request);

    expect(commentRepositorySaveSpy).toHaveBeenCalled();
    expect(result.checkStatus("success")).toBe(true);

    if (result.checkStatus("success")) {
      expect(result.value).toEqual<CommentDTO>({
        id: expect.any(String),
        content: "Wow, what an article!",
        articleId: "some-article-id",
        authorId: "some-author-id",
        parentCommentId: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    }
  });

  describe("when there is an invalid value in the request DTO", () => {
    it("should return the validation errors", async () => {
      const request: CreateCommentRequest = {
        content: "",
        articleId: "some-article-id",
        authorId: "some-author-id",
        parentCommentId: null,
      };

      const result = await useCase.execute(request);

      expect(result.checkStatus("failure")).toBe(true);

      if (result.checkStatus("failure")) {
        expect(result.error).toEqual<CreateCommentValidationErrors>({
          content: expect.any(String),
        });
      }
    });

    it("should not call the comment repository save method", async () => {
      const request: CreateCommentRequest = {
        content: "",
        articleId: "some-article-id",
        authorId: "some-author-id",
        parentCommentId: null,
      };

      await useCase.execute(request);

      expect(commentRepositorySaveSpy).not.toHaveBeenCalled();
    });
  });
});
