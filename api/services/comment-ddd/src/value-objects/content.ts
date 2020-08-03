import { ValueObject } from "./value-object";
import { Result } from "../utils/result";

interface ContentProps {
  value: string;
}

export class Content extends ValueObject<ContentProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: ContentProps) {
    super(props);
  }

  public static create(
    content: string | null | undefined
  ): Result<Content, string> {
    if (
      content === undefined ||
      content === null ||
      content.length < 1 ||
      content.length > 1000
    ) {
      return Result.fail(
        "Content must be greater than 1 or less than 1000 characters"
      );
    }

    return Result.ok(new Content({ value: content }));
  }
}
