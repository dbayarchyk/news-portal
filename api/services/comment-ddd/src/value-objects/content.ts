import { ValueObject } from ".//value-object";

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

  public static create(content: string | null | undefined): Content | never {
    if (
      content === undefined ||
      content === null ||
      content.length < 1 ||
      content.length > 1000
    ) {
      throw new Error(
        "Content must be greater than 1 characters or less than 1000"
      );
    }

    return new Content({ value: content });
  }
}
