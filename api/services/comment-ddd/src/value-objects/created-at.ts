import { ValueObject } from "./value-object";

interface CreatedAtProps {
  value: string;
}

export class CreatedAt extends ValueObject<CreatedAtProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: CreatedAtProps) {
    super(props);
  }

  public static create(
    createdAt: string | null | undefined
  ): CreatedAt | never {
    return new CreatedAt({ value: createdAt || null });
  }
}
