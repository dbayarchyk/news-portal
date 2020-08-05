import { Position } from "../entities/position";
import { PositionName } from "../value-objects/position-name";
import { UniqueId } from "../value-objects/unique-id";
import { PositionDTO } from "../dtos/position-dto";
import { PositionPersistance } from "../database/models/position";

export class PositionMapper {
  public static toEntity(raw: PositionPersistance): Position {
    const position = new Position(
      {
        name: PositionName.create(raw.name).value,
      },
      raw._id ? UniqueId.create(raw._id) : null
    );

    return position;
  }

  public static toPersistence(position: Position): PositionPersistance {
    return {
      _id: position.id.value,
      name: position.name.value,
    };
  }

  public static toDTO(position: Position): PositionDTO {
    return {
      id: position.id.value,
      name: position.name.value,
    };
  }
}
