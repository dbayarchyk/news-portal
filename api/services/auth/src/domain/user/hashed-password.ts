import * as bcrypt from 'bcrypt';

import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";
import { ValidationError } from "../../shared/errors/validation-error";

interface HashedPasswordData {
  value: string;
}

export class HashedPassword extends ValueObject<HashedPasswordData> {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 32;
  private static readonly AT_LEAST_1_SYMBOL_REGEX = /\D/i;
  private static readonly AT_LEAST_1_NUMBER_REGEX = /\d/i;

  private constructor(data: HashedPasswordData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public async equalsToPlainTextPassword(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.getValue());
  }

  public static async createFromUnHashedPassword(
    unHashedPassword: string
  ): Promise<Either<ValidationError, HashedPassword>> {
    try {
      HashedPassword.validateUnHashedPassword(unHashedPassword);

      const hashedPassword = await HashedPassword.hashPassword(unHashedPassword);

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
      throw new ValidationError("Password must not be empty");
    }

    if (
      unHashedPassword.length < HashedPassword.MIN_LENGTH ||
      unHashedPassword.length > HashedPassword.MAX_LENGTH
    ) {
      throw new ValidationError(
        `Password length must be greater than ${HashedPassword.MIN_LENGTH} or less than ${HashedPassword.MAX_LENGTH} characters`
      );
    }

    if (!HashedPassword.AT_LEAST_1_SYMBOL_REGEX.test(unHashedPassword)) {
      throw new ValidationError(
        `Password password must include at least 1 letter or symbol`
      );
    }

    if (!HashedPassword.AT_LEAST_1_NUMBER_REGEX.test(unHashedPassword)) {
      throw new ValidationError(
        `Password password must include at least 1 number`
      );
    }
  }

  private static async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    return hashedPassword;
  }
}
