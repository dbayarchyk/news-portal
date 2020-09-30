import { ValueObject } from "../../shared/domain/value-object";
import { Result } from "../../shared/logic/result";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";

interface ArticleIdData {
  value: UniqueEntityID;
}

export class ArticleId extends ValueObject<ArticleIdData> {
  private constructor(data: ArticleIdData) {
    super(data);
  }

  public getValue(): UniqueEntityID {
    return this.data.value;
  }

  public static create(value: string): Result<ArticleId, string> {
    try {
      ArticleId.validateValue(value);

      const articleId = new ArticleId({
        value: new UniqueEntityID(value),
      });

      return Result.ok(articleId);
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  private static validateValue(value: string): void | never {
    if (!value) {
      throw new Error("ArticleId string must not be empty");
    }
  }
}
