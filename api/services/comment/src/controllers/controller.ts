import { Request, Response } from "express";

export abstract class Controller {
  public abstract async handle(req: Request, res: Response): Promise<void>;
}
