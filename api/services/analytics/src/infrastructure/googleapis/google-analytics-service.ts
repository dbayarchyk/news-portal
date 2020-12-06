import { injectable } from "inversify";
import { google, analytics_v3 } from "googleapis";

import { AnalyticsService } from "../../application/services/analytics-service";

@injectable()
export class GoogleAnalyticsService implements AnalyticsService {
  public async getTopArticleUrls(): Promise<string[]> {
    const analytics = google.analytics({
      auth: await this.getAuthClient(),
      version: "v3",
    });
    const res = await analytics.data.ga.get({
      ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
      dimensions: "ga:pagePath",
      "max-results": 5,
      metrics: "ga:pageviews",
      filters: "ga:pagePath=~^/articles/.+",
      sort: "-ga:pageviews",
      "include-empty-rows": true,
      "start-date": "7daysAgo",
      "end-date": "today",
    });

    return this.mapResponseDataToUrls(res.data);
  }

  private async getAuthClient() {
    const auth = new google.auth.GoogleAuth({
      scopes: [
        "https://www.googleapis.com/auth/analytics.readonly",
      ],
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replaceAll('\\n', '\n')
      }
    });
    
    return auth.getClient();
  }

  private mapResponseDataToUrls(data: analytics_v3.Schema$GaData): string[] {
    if (!data.columnHeaders || !data.rows) {
      return [];
    }

    const pagePathIndex = data.columnHeaders?.findIndex(header => header.name === "ga:pagePath");

    if (pagePathIndex === -1) {
      return [];
    }

    return data.rows.map(row => row[pagePathIndex]);
  }
}
