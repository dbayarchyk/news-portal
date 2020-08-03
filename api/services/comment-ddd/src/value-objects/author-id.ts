import { ValueObject } from "./value-object";
import { Result } from "../utils/result";

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

  public static create(
    authorId: string | null | undefined
  ): Result<AuthorId, string> {
    if (authorId === null || authorId === undefined || authorId.length === 0) {
      return Result.fail("Author id must be defined");
    }

    return Result.ok(new AuthorId({ value: authorId }));
  }
}
