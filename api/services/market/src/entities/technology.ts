import { Entity } from "./entity";
import { UniqueId } from "../value-objects/unique-id";
import { TechnologyName } from "../value-objects/technology-name";

interface TechnologyProps {
  name: TechnologyName;
}

export class Technology extends Entity<TechnologyProps> {
  public get id(): UniqueId {
    return this._id;
  }

  public get name(): TechnologyName {
    return this.props.name;
  }

  public constructor(props: TechnologyProps, id?: UniqueId | null) {
    super(props, id);
  }
}
