import { ValueObject } from ".//value-object";

interface ParentCommentIdProps {
  value: string | null;
}

export class ParentCommentId extends ValueObject<ParentCommentIdProps> {
  public get value(): string {
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
        "Parent comment id must be not greater than 1 characters"
      );
    }

    return new ParentCommentId({ value: parentCommentId || null });
  }
}
