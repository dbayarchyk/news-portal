import { ValueObject } from "./value-object";

import { Result } from "../utils/result";

interface TechnologyNameProps {
  value: string;
}

export class TechnologyName extends ValueObject<TechnologyNameProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: TechnologyNameProps) {
    super(props);
  }

  public static create(name: string | null): Result<TechnologyName, string> {
    if (
      name === undefined ||
      name === null ||
      name.length < 1 ||
      name.length > 100
    ) {
      return Result.fail(
        "Technology name must be greater than 1 or less than 100 characters"
      );
    }

    return Result.ok(new TechnologyName({ value: name }));
  }
}
