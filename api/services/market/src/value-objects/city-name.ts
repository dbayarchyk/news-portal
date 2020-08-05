import { ValueObject } from "./value-object";

import { Result } from "../utils/result";

interface CityNameProps {
  value: string;
}

export class CityName extends ValueObject<CityNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: CityNameProps) {
    super(props);
  }

  public static create(name: string | null): Result<CityName, string> {
    if (
      name === undefined ||
      name === null ||
      name.length < 1 ||
      name.length > 100
    ) {
      return Result.fail(
        "City name must be greater than 1 or less than 100 characters"
      );
    }

    return Result.ok(new CityName({ value: name }));
  }
}
