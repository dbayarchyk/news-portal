import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";
import { ValidationError } from "../../shared/errors/validation-error";

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

  public static create(value: string): Either<ValidationError, Username> {
    try {
      Username.validateUsername(value);

      return right(new Username({ value }));
    } catch (error) {
      return left(error);
    }
  }

  private static validateUsername(email: string): void | never {
    if (!email) {
      throw new ValidationError("Username must not be empty");
    }
  }
}
