import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";

interface TimestampData {
  value: string;
}

export class Timestamp extends ValueObject<TimestampData> {
  private constructor(data: TimestampData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public static create(value?: string | null): Either<Error, Timestamp> {
    try {
      Timestamp.validateValue(value);

      const date = value ? new Date(value) : new Date();

      const timestamp = new Timestamp({
        value: date.toISOString(),
      });

      return right(timestamp);
    } catch (error) {
      return left(error);
    }
  }

  private static validateValue(
    isoDateString: string | null | undefined
  ): void | never {
    if (typeof isoDateString === "undefined" || isoDateString === null) {
      return;
    }

    const date = new Date(isoDateString);
    const isDateInvalid = isNaN(date.getTime());

    if (isDateInvalid) {
      throw new Error("Timestamp value is invalid");
    }
  }
}
