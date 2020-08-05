import { ValueObject } from "./value-object";

import { Result } from "../utils/result";

interface PositionNameProps {
  value: string;
}

export class PositionName extends ValueObject<PositionNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: PositionNameProps) {
    super(props);
  }

  public static create(name: string | null): Result<PositionName, string> {
    if (
      name === undefined ||
      name === null ||
      name.length < 1 ||
      name.length > 100
    ) {
      return Result.fail(
        "Position name must be greater than 1 or less than 100 characters"
      );
    }

    return Result.ok(new PositionName({ value: name }));
  }
}
