import { ValueObject } from "./value-object";

import { Result } from "../utils/result";

interface WorkExperienceProps {
  value: number;
}

export class WorkExperience extends ValueObject<WorkExperienceProps> {
  public get value(): number {
    return this.props.value;
  }

  private constructor(props: WorkExperienceProps) {
    super(props);
  }

  public static create(
    workExperience: number | null
  ): Result<WorkExperience, string> {
    if (
      typeof workExperience !== "number" ||
      workExperience <= 0 ||
      workExperience > 60
    ) {
      return Result.fail(
        "Work experience must be a number greater than 0 or less than 60 years"
      );
    }

    return Result.ok(new WorkExperience({ value: workExperience }));
  }
}
