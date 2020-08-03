import { ValueObject } from ".//value-object";

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
  ): ParentCommentId | never {
    if (typeof parentCommentId === "string" && parentCommentId.length < 1) {
      throw new Error(
        "Parent comment id string must be greater than 1 character"
      );
    }

    return new ParentCommentId({ value: parentCommentId || null });
  }
}
