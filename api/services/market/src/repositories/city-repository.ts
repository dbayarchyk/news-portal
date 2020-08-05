import { City as CityModel } from "../database/models/city";
import { City } from "../entities/city";
import { CityMapper } from "../mappers/city-mapper";

export interface ICityRepository {
  findCities(): Promise<City[]>;
  save(city: City): Promise<void>;
  exists(city: City): Promise<boolean>;
}

export class CityRepository implements ICityRepository {
  public async findCities(): Promise<City[]> {
    const rawCities = await CityModel.find().lean();

    return rawCities.map((rawCity) => CityMapper.toEntity(rawCity));
  }

  public async save(city: City): Promise<void> {
    const cityExists = await this.exists(city);
    const cityPersistence = CityMapper.toPersistence(city);

    if (cityExists) {
      await CityModel.update({ _id: city.id.value }, cityPersistence);
    } else {
      await CityModel.create(cityPersistence);
    }
  }

  public async exists(city: City): Promise<boolean> {
    const rawCity = await CityModel.findById(city.id.value).lean();

    if (rawCity === null) {
      return false;
    }

    return true;
  }
}
