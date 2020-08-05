import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { ITechnologyRepository } from "../repositories/technology-repository";
import { TechnologyMapper } from "../mappers/technology-mapper";
import { TechnologyCollectionDTO } from "../dtos/technology-dto";

export class GetTechnologiesController extends Controller {
  private technologyRepository: ITechnologyRepository;

  public constructor(technologyRepository: ITechnologyRepository) {
    super();
    this.technologyRepository = technologyRepository;
  }

  public async handle(
    _: Request,
    res: Response<TechnologyCollectionDTO>
  ): Promise<void> {
    const technologies = await this.technologyRepository.findTechnologies();
    const technologiesDTO = technologies.map((technology) =>
      TechnologyMapper.toDTO(technology)
    );

    res.setHeader("Cache-Control", "max-age=300");
    res.status(200);
    res.json({
      items: technologiesDTO,
    });
  }
}
