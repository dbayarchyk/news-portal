export class Identifier<T> {
  public constructor(private value: T) {}

  public equals(id: Identifier<T> | null | undefined): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (id instanceof this.constructor === false) {
      return false;
    }

    return id.toValue() === this.value;
  }

  public toValue(): T {
    return this.value;
  }
}
