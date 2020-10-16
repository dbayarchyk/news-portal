import { UniqueEntityID } from "./unique-entity-id";

function isEntity(value: unknown): value is Entity {
  return value instanceof Entity;
}

export abstract class Entity {
  private readonly id: UniqueEntityID;

  public constructor(id?: UniqueEntityID | null) {
    this.id = id ? id : new UniqueEntityID();
  }

  public getId(): UniqueEntityID {
    return this.id;
  }

  public equals(object: Entity | null): boolean {
    if (object === null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (isEntity(object) === false) {
      return false;
    }

    return this.id.equals(object.id);
  }
}
