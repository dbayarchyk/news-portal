import { Container } from "inversify";

import { AnalyticsService } from '../../application/services/analytics-service';
import { GetTopArticleUrlsUseCase } from '../../application/use-cases/get-top-article-urls';
import { GoogleAnalyticsService } from '../googleapis/google-analytics-service';
import { IOCTypes } from "./types";

export const iocContainer = new Container();

iocContainer
  .bind<AnalyticsService>(IOCTypes.AnalyticsService)
  .to(GoogleAnalyticsService);

iocContainer
  .bind<GetTopArticleUrlsUseCase>(IOCTypes.GetTopArticleUrlsUseCase)
  .to(GetTopArticleUrlsUseCase)