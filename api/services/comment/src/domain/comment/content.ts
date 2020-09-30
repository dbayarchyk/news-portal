import { ValueObject } from "../../shared/domain/value-object";
import { Result } from "../../shared/logic/result";

interface ContentData {
  value: string;
}

export class Content extends ValueObject<ContentData> {
  public static readonly MIN_LENGTH = 1;
  public static readonly MAX_LENGTH = 1000;

  private constructor(data: ContentData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public static create(value: string): Result<Content, string> {
    try {
      Content.validateValue(value);

      const content = new Content({ value });

      return Result.ok(content);
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  private static validateValue(value: string): void | never {
    if (
      !value ||
      value.length < Content.MIN_LENGTH ||
      value.length > Content.MAX_LENGTH
    ) {
      throw new Error(
        `Content length must be greater than ${Content.MIN_LENGTH} or less than ${Content.MAX_LENGTH} characters`
      );
    }
  }
}
