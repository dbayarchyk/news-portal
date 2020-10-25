import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";

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

  public static create(value: string): Either<Error, Username> {
    try {
      Username.validateUsername(value);

      return right(new Username({ value }));
    } catch (error) {
      return left(error);
    }
  }

  private static validateUsername(email: string): void | never {
    if (!email) {
      throw new Error("Username must not be empty");
    }
  }
}
