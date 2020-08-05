import { Entity } from "./entity";
import { UniqueId } from "../value-objects/unique-id";
import { PositionName } from "../value-objects/position-name";

interface PositionProps {
  name: PositionName;
}

export class Position extends Entity<PositionProps> {
  public get id(): UniqueId {
    return this._id;
  }

  public get name(): PositionName {
    return this.props.name;
  }

  public constructor(props: PositionProps, id?: UniqueId | null) {
    super(props, id);
  }
}
