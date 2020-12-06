export interface AnalyticsService {
  getTopArticleUrls(): Promise<string[]>;
}
