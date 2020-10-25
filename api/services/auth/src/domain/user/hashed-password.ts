import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";

interface HashedPasswordData {
  value: string;
}

export class HashedPassword extends ValueObject<HashedPasswordData> {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 32;
  private static readonly AT_LEAST_1_SYMBOL_REGEX = /\D/i;

  private constructor(data: HashedPasswordData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public static createFromUnHashedPassword(
    unHashedPassword: string
  ): Either<Error, HashedPassword> {
    try {
      HashedPassword.validateUnHashedPassword(unHashedPassword);

      const hashedPassword = HashedPassword.hashPassword(unHashedPassword);

      return right(new HashedPassword({ value: hashedPassword }));
    } catch (error) {
      return left(error);
    }
  }

  public static createFromHashedPassword(
    hashedPassword: string
  ): HashedPassword {
    return new HashedPassword({ value: hashedPassword });
  }

  private static validateUnHashedPassword(
    unHashedPassword: string
  ): void | never {
    if (!unHashedPassword) {
      throw new Error("Password must not be empty");
    }

    if (
      unHashedPassword.length < HashedPassword.MIN_LENGTH ||
      unHashedPassword.length > HashedPassword.MAX_LENGTH
    ) {
      throw new Error(
        `Password length must be greater than ${HashedPassword.MIN_LENGTH} or less than ${HashedPassword.MAX_LENGTH}`
      );
    }

    if (!HashedPassword.AT_LEAST_1_SYMBOL_REGEX.test(unHashedPassword)) {
      throw new Error(
        `Password password must include at least 1 letter or symbol`
      );
    }
  }

  private static hashPassword(unHashedPassword: string): string {
    return unHashedPassword;
  }
}
