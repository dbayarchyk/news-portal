import { v4 as uuidv4 } from "uuid";

import { ValueObject } from ".//value-object";

interface UniqueIdProps {
  value: string;
}

export class UniqueId extends ValueObject<UniqueIdProps> {
  public get value(): string {
    return this.props.value;
  }

  private constructor(props: UniqueIdProps) {
    super(props);
  }

  public static create(id?: string | null): UniqueId {
    return new UniqueId({ value: id || uuidv4() });
  }
}
