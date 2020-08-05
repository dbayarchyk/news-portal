import { Entity } from "./entity";
import { UniqueId } from "../value-objects/unique-id";
import { CityName } from "../value-objects/city-name";

interface CityProps {
  name: CityName;
}

export class City extends Entity<CityProps> {
  public get id(): UniqueId {
    return this._id;
  }

  public get name(): CityName {
    return this.props.name;
  }

  public constructor(props: CityProps, id?: UniqueId | null) {
    super(props, id);
  }
}
