import { ValueObject } from "../../shared/domain/value-object";
import { Result } from "../../shared/logic/result";

type AllowedStatus =
  | "CONFIRMED"
  | "UNCONFIRMED"
  | "ARCHIVED"
  | "COMPROMISED"
  | "UNKNOWN"
  | "RESET_REQUIRED"
  | "FORCE_CHANGE_PASSWORD";

interface StatusData {
  value: AllowedStatus;
}

export class Status extends ValueObject<StatusData> {
  private static readonly ALLOWED_STATUSES: Readonly<Array<AllowedStatus>> = [
    "CONFIRMED",
    "UNCONFIRMED",
    "ARCHIVED",
    "COMPROMISED",
    "UNKNOWN",
    "RESET_REQUIRED",
    "FORCE_CHANGE_PASSWORD",
  ];

  private constructor(data: StatusData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public static create(value: AllowedStatus): Result<Status, Error> {
    if (!Status.isAllowedStatusValue(value)) {
      return Result.fail(
        new Error(
          `Invalid status, only the following statuses are allowed: ${Status.ALLOWED_STATUSES.join(
            ", "
          )}`
        )
      );
    }

    return Result.ok(new Status({ value }));
  }

  private static isAllowedStatusValue(
    value: string
  ): value is StatusData["value"] {
    return Status.ALLOWED_STATUSES.indexOf(value as AllowedStatuses) !== 1;
  }
}
