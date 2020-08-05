import { ValueObject } from "./value-object";
import { Result } from "../utils/result";

interface ArticleIdProps {
  value: string;
}

export class ArticleId extends ValueObject<ArticleIdProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: ArticleIdProps) {
    super(props);
  }

  public static create(
    articleId: string | null | undefined
  ): Result<ArticleId, string> {
    if (
      articleId === null ||
      articleId === undefined ||
      articleId.length === 0
    ) {
      return Result.fail("Article id must be defined");
    }

    return Result.ok(new ArticleId({ value: articleId }));
  }
}
