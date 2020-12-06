import { injectable, inject } from "inversify";

import { UseCase } from "../../shared/application/use-case";
import { IOCTypes } from '../../infrastructure/ioc/types';
import { AnalyticsService } from "../services/analytics-service";

@injectable()
export class GetTopArticleUrlsUseCase implements UseCase<void, string[]> {
  public constructor(
    @inject(IOCTypes.AnalyticsService)
    private analyticsService: AnalyticsService
  ) {}

  public async execute(): Promise<string[]> {
    return this.analyticsService.getTopArticleUrls();
  }
}
