import { City as CityModel } from "../database/models/city";
import { City } from "../entities/city";
import { CityMapper } from "../mappers/city-mapper";

export interface ICityRepository {
  findCityById(id: string): Promise<City | null>;
  findCityByName(name: string): Promise<City | null>;
  findCities(): Promise<City[]>;
  save(city: City): Promise<void>;
  exists(city: City): Promise<boolean>;
}

export class CityRepository implements ICityRepository {
  public async findCityById(id: string): Promise<City | null> {
    const rawCity = await CityModel.findById(id).lean();

    if (rawCity === null) {
      return null;
    }

    return CityMapper.toEntity(rawCity);
  }

  public async findCityByName(name: string): Promise<City | null> {
    const rawCity = await CityModel.findOne({ name }).lean();

    if (rawCity === null) {
      return null;
    }

    return CityMapper.toEntity(rawCity);
  }

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
