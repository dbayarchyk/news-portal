import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { GetTopArticleUrlsUseCase } from "../../../application/use-cases/get-top-article-urls";

@controller("/top-article-urls")
export class GetCurrentUserController extends BaseHttpController {
  public constructor(
    @inject(IOCTypes.GetTopArticleUrlsUseCase)
    private readonly getTopArticleUrlsUseCase: GetTopArticleUrlsUseCase
  ) {
    super();
  }

  @httpGet("/")
  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    const topArticleUrls = await this.getTopArticleUrlsUseCase.execute();

    // The data is valid for 1 day.
    res.setHeader("Cache-Control", "max-age=86400");
    res.status(200);
    res.send(topArticleUrls);
  }
}
