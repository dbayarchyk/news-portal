import { ValueObject } from "./value-object";

interface UpdatedAtProps {
  value: string;
}

export class UpdatedAt extends ValueObject<UpdatedAtProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: UpdatedAtProps) {
    super(props);
  }

  public static create(updatedAt?: string | null): UpdatedAt | never {
    const value = updatedAt ? updatedAt : new Date().toISOString();

    return new UpdatedAt({ value });
  }
}
