import { shallowEqual } from "shallow-equal-object";

interface ValueObjectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T;

  public constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(
    comparingValueObject: ValueObject<T> | null | undefined
  ): boolean {
    if (comparingValueObject === null || comparingValueObject === undefined) {
      return false;
    }

    if (comparingValueObject.props === undefined) {
      return false;
    }

    return shallowEqual(this.props, comparingValueObject.props);
  }
}
