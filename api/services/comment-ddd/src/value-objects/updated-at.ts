import { ValueObject } from "./value-object";

interface UpdatedAtProps {
  value: string | null;
}

export class UpdatedAt extends ValueObject<UpdatedAtProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: UpdatedAtProps) {
    super(props);
  }

  public static create(
    updatedAt: string | null | undefined
  ): UpdatedAt | never {
    return new UpdatedAt({ value: updatedAt || null });
  }
}
