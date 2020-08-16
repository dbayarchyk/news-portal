import { ValueObject } from "./value-object";

import { Result } from "../utils/result";

interface AnnualSalaryProps {
  value: number;
}

export class AnnualSalary extends ValueObject<AnnualSalaryProps> {
  public get value(): number {
    return this.props.value;
  }

  private constructor(props: AnnualSalaryProps) {
    super(props);
  }

  public static create(
    annualSalary: number | null
  ): Result<AnnualSalary, string> {
    if (
      typeof annualSalary !== "number" ||
      annualSalary <= 0 ||
      annualSalary > 300000
    ) {
      return Result.fail(
        "Annual salary must be a number greater than 1 or less than 300.000 ‎€"
      );
    }

    return Result.ok(new AnnualSalary({ value: annualSalary }));
  }
}
