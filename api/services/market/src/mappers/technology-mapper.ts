import { Technology } from "../entities/technology";
import { TechnologyName } from "../value-objects/technology-name";
import { UniqueId } from "../value-objects/unique-id";
import { TechnologyDTO } from "../dtos/technology-dto";
import { TechnologyPersistance } from "../database/models/technology";

export class TechnologyMapper {
  public static toEntity(raw: TechnologyPersistance): Technology {
    const technology = new Technology(
      {
        name: TechnologyName.create(raw.name).value,
      },
      raw._id ? UniqueId.create(raw._id) : null
    );

    return technology;
  }

  public static toPersistence(technology: Technology): TechnologyPersistance {
    return {
      _id: technology.id.value,
      name: technology.name.value,
    };
  }

  public static toDTO(technology: Technology): TechnologyDTO {
    return {
      id: technology.id.value,
      name: technology.name.value,
    };
  }
}
