export class Identifier<T> {
  public constructor(private value: T) {
    this.value = value;
  }

  public equals(id?: Identifier<T> | null): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (id instanceof this.constructor === false) {
      return false;
    }

    return id.toValue() === this.value;
  }

  public toString(): string {
    return String(this.value);
  }

  public toValue(): T {
    return this.value;
  }
}
