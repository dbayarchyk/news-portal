import { UniqueId } from "../value-objects/unique-id";

function isEntity(value: unknown): value is Entity<unknown> {
  return value instanceof Entity;
}

export abstract class Entity<T> {
  protected readonly _id: UniqueId;
  protected props: T;

  public constructor(props: T, id?: UniqueId | null) {
    this._id = id ? id : UniqueId.create();
    this.props = props;
  }

  public equals(object: Entity<T> | null | undefined): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (isEntity(object) === false) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
