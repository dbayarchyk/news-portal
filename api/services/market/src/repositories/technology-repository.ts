import { Technology as TechnologyModel } from "../database/models/technology";
import { Technology } from "../entities/technology";
import { TechnologyMapper } from "../mappers/technology-mapper";

export interface ITechnologyRepository {
  findTechnologyById(id: string): Promise<Technology | null>;
  findTechnologies(): Promise<Technology[]>;
  save(technology: Technology): Promise<void>;
  exists(technology: Technology): Promise<boolean>;
}

export class TechnologyRepository implements ITechnologyRepository {
  public async findTechnologyById(id: string): Promise<Technology | null> {
    const rawTechnology = await TechnologyModel.findById(id).lean();

    if (rawTechnology === null) {
      return null;
    }

    return TechnologyMapper.toEntity(rawTechnology);
  }

  public async findTechnologies(): Promise<Technology[]> {
    const rawTechnologies = await TechnologyModel.find().lean();

    return rawTechnologies.map((rawTechnology) =>
      TechnologyMapper.toEntity(rawTechnology)
    );
  }

  public async save(technology: Technology): Promise<void> {
    const technologyExists = await this.exists(technology);
    const technologyPersistence = TechnologyMapper.toPersistence(technology);

    if (technologyExists) {
      await TechnologyModel.update(
        { _id: technology.id.value },
        technologyPersistence
      );
    } else {
      await TechnologyModel.create(technologyPersistence);
    }
  }

  public async exists(technology: Technology): Promise<boolean> {
    const rawTechnology = await TechnologyModel.findById(
      technology.id.value
    ).lean();

    if (rawTechnology === null) {
      return false;
    }

    return true;
  }
}
