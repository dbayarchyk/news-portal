import { ValueObject } from "../../shared/domain/value-object";
import { Result } from "../../shared/logic/result";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";

interface ParentCommentIdData {
  value: UniqueEntityID | null;
}

export class ParentCommentId extends ValueObject<ParentCommentIdData> {
  private constructor(data: ParentCommentIdData) {
    super(data);
  }

  public getValue(): UniqueEntityID | null {
    return this.data.value;
  }

  public static create(value?: string | null): Result<ParentCommentId, string> {
    try {
      ParentCommentId.validateValue(value);

      const timestamp = new ParentCommentId({
        value: value ? new UniqueEntityID(value) : null,
      });

      return Result.ok(timestamp);
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  private static validateValue(value: string | null | undefined): void | never {
    if (typeof value === "undefined" || value === null) {
      return;
    }

    if (value.length === 0) {
      throw new Error("ParentCommentId string must not be empty");
    }
  }
}
