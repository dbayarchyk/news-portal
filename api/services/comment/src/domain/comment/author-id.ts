import { ValueObject } from "../../shared/domain/value-object";
import { Result } from "../../shared/logic/result";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";

interface AuthorIdData {
  value: UniqueEntityID;
}

export class AuthorId extends ValueObject<AuthorIdData> {
  private constructor(data: AuthorIdData) {
    super(data);
  }

  public getValue(): UniqueEntityID {
    return this.data.value;
  }

  public static create(value: string): Result<AuthorId, string> {
    try {
      AuthorId.validateValue(value);

      const authorId = new AuthorId({
        value: new UniqueEntityID(value),
      });

      return Result.ok(authorId);
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  private static validateValue(value: string): void | never {
    if (!value) {
      throw new Error("AuthorId string must not be empty");
    }
  }
}
