import { ValueObject } from "./value-object";

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
  ): ArticleId | never {
    if (
      articleId === null ||
      articleId === undefined ||
      articleId.length === 0
    ) {
      throw new Error("Article id must be defined");
    }

    return new ArticleId({ value: articleId });
  }
}
