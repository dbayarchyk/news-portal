import { ValueObject } from "./value-object";
import { Result } from "../utils/result";

interface ParentCommentIdProps {
  value: string | null;
}

export class ParentCommentId extends ValueObject<ParentCommentIdProps> {
  public get value(): string | null {
    return this.props.value;
  }

  private constructor(props: ParentCommentIdProps) {
    super(props);
  }

  public static create(
    parentCommentId: string | null | undefined
  ): Result<ParentCommentId, string> {
    if (typeof parentCommentId === "string" && parentCommentId.length < 1) {
      return Result.fail(
        "Parent comment id string must be greater than 1 character"
      );
    }

    return Result.ok(new ParentCommentId({ value: parentCommentId || null }));
  }
}
