import { ValueObject } from ".//value-object";

interface AuthorIdProps {
  value: string;
}

export class AuthorId extends ValueObject<AuthorIdProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: AuthorIdProps) {
    super(props);
  }

  public static create(authorId: string | null | undefined): AuthorId | never {
    if (authorId === null || authorId === undefined || authorId.length === 0) {
      throw new Error("Author id must be defined");
    }

    return new AuthorId({ value: authorId });
  }
}
