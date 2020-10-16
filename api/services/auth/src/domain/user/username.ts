import { ValueObject } from "../../shared/domain/value-object";
import { Result } from "../../shared/logic/result";

interface UsernameData {
  value: string;
}

export class Username extends ValueObject<UsernameData> {
  private constructor(data: UsernameData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public static create(value: string): Result<Username, Error> {
    try {
      Username.validateUsername(value);

      return Result.ok(new Username({ value }));
    } catch (error) {
      return Result.fail(error);
    }
  }

  private static validateUsername(email: string): void | never {
    if (!email) {
      throw new Error("Username must not be empty");
    }
  }
}
