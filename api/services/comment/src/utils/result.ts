interface SuccessProps<TValue> {
  status: "success";
  value: TValue;
}

interface FailureProps<TError> {
  status: "failure";
  error: TError;
}

type Status = SuccessProps<unknown>["status"] | FailureProps<unknown>["status"];
type ResultProps<TValue, TError> = SuccessProps<TValue> | FailureProps<TError>;
type CombinedResults<TRecordKey extends string> = Record<
  TRecordKey,
  Result<unknown, unknown>
>;

export class Result<TValue, TError> {
  private readonly props: ResultProps<TValue, TError>;

  public get value(): TValue | never {
    if (this.props.status === "failure") {
      throw new Error("Can't retrieve the value from a failed result.");
    }

    return this.props.value;
  }

  public get error(): TError | never {
    if (this.props.status === "success") {
      throw new Error("Can't retrieve the error from a successful result.");
    }

    return this.props.error;
  }

  private constructor(props: ResultProps<TValue, TError>) {
    this.props = props;
  }

  public checkStatus(status: Status): boolean {
    return this.props.status === status;
  }

  public static ok<TResultValue>(
    value?: TResultValue
  ): Result<TResultValue, never> {
    return new Result<TResultValue, never>({
      status: "success",
      value: value as TResultValue,
    });
  }

  public static fail<TResultError>(
    error: TResultError
  ): Result<never, TResultError> {
    return new Result<never, TResultError>({
      status: "failure",
      error: error,
    });
  }

  public static combine<TResults extends CombinedResults<string>>(
    results: TResults
  ): Result<TResults, Partial<TResults>> {
    const failedResults: Partial<TResults> = {};

    for (const resultKey in results) {
      const result = results[resultKey];

      if (result.checkStatus("failure")) {
        failedResults[resultKey] = result;
      }
    }

    if (Object.values(failedResults).length > 0) {
      return Result.fail(failedResults);
    }

    return Result.ok(results);
  }
}
