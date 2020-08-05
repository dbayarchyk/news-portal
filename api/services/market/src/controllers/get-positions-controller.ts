import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { IPositionRepository } from "../repositories/position-repository";
import { PositionMapper } from "../mappers/position-mapper";
import { PositionCollectionDTO } from "../dtos/position-dto";

export class GetPositionsController extends Controller {
  private positionRepository: IPositionRepository;

  public constructor(positionRepository: IPositionRepository) {
    super();
    this.positionRepository = positionRepository;
  }

  public async handle(
    _: Request,
    res: Response<PositionCollectionDTO>
  ): Promise<void> {
    const positions = await this.positionRepository.findPositions();
    const positionsDTO = positions.map((position) =>
      PositionMapper.toDTO(position)
    );

    res.setHeader("Cache-Control", "max-age=300");
    res.status(200);
    res.json({
      items: positionsDTO,
    });
  }
}
