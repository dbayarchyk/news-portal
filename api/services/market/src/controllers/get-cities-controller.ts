import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { ICityRepository } from "../repositories/city-repository";
import { CityMapper } from "../mappers/city-mapper";
import { CityCollectionDTO } from "../dtos/city-dto";

export class GetCitiesController extends Controller {
  private cityRepository: ICityRepository;

  public constructor(cityRepository: ICityRepository) {
    super();
    this.cityRepository = cityRepository;
  }

  public async handle(
    _: Request,
    res: Response<CityCollectionDTO>
  ): Promise<void> {
    const cities = await this.cityRepository.findCities();
    const citiesDTO = cities.map((city) => CityMapper.toDTO(city));

    res.setHeader("Cache-Control", "max-age=300");
    res.status(200);
    res.json({
      items: citiesDTO,
    });
  }
}
