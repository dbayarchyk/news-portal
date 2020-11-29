import { shallowEqual } from "shallow-equal-object";

interface ValueObjectData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectData> {
  protected readonly data: T;

  public constructor(data: T) {
    this.data = Object.freeze(data);
  }

  public equals(
    comparingValueObject: ValueObject<T> | null | undefined
  ): boolean {
    if (comparingValueObject === null || comparingValueObject === undefined) {
      return false;
    }

    if (comparingValueObject.data === undefined) {
      return false;
    }

    return shallowEqual(this.data, comparingValueObject.data);
  }
}
