import { City } from "../entities/city";
import { CityName } from "../value-objects/city-name";
import { UniqueId } from "../value-objects/unique-id";
import { CityDTO } from "../dtos/city-dto";
import { CityPersistance } from "../database/models/city";

export class CityMapper {
  public static toEntity(raw: CityPersistance): City {
    const city = new City(
      {
        name: CityName.create(raw.name).value,
      },
      raw._id ? UniqueId.create(raw._id) : null
    );

    return city;
  }

  public static toPersistence(city: City): CityPersistance {
    return {
      _id: city.id.value,
      name: city.name.value,
    };
  }

  public static toDTO(city: City): CityDTO {
    return {
      id: city.id.value,
      name: city.name.value,
    };
  }
}
