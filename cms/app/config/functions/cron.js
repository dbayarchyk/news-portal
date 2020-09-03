"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }

  // Every minute
  "*/1 * * * *": async function publishScheduledArticles() {
    // fetch articles to publish
    const draftArticleToPublish = await strapi.api.article.services.article.find(
      {
        status: "DRAFT",
        publishedAt_lt: new Date(),
      }
    );

    // update status of articles
    draftArticleToPublish.forEach(async (article) => {
      await strapi.api.article.services.article.update(
        { id: article.id },
        { status: "PUBLISHED" }
      );
    });
  },
};
