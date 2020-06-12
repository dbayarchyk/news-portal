export function canEditArticle(article, tokenPayload) {
  if (
    !tokenPayload ||
    !tokenPayload.permissions ||
    !tokenPayload.sub ||
    !article
  ) {
    return false;
  }

  switch (article.status) {
    case "DRAFT": {
      return (
        tokenPayload.permissions.includes("ARTICLE_UPDATE_ALL_DRAFT") ||
        (tokenPayload.permissions.includes("ARTICLE_UPDATE_OWN_DRAFT") &&
          article.author_id === tokenPayload.sub)
      );
    }

    case "PUBLISHED": {
      return (
        tokenPayload.permissions.includes("ARTICLE_UPDATE_ALL_PUBLISHED") ||
        (tokenPayload.permissions.includes("ARTICLE_UPDATE_OWN_PUBLISHED") &&
          article.author_id === tokenPayload.sub)
      );
    }

    case "ARCHIVED": {
      return (
        tokenPayload.permissions.includes("ARTICLE_UPDATE_ALL_ARCHIVED") ||
        (tokenPayload.permissions.includes("ARTICLE_UPDATE_OWN_ARCHIVED") &&
          article.author_id === tokenPayload.sub)
      );
    }

    default: {
      return false;
    }
  }
}

export function canPublishArticle(article, tokenPayload) {
  if (
    !tokenPayload ||
    !tokenPayload.permissions ||
    !tokenPayload.sub ||
    !article
  ) {
    return false;
  }

  switch (article.status) {
    case "DRAFT": {
      return (
        tokenPayload.permissions.includes("ARTICLE_PUBLISH_ALL_DRAFT") ||
        (tokenPayload.permissions.includes("ARTICLE_PUBLISH_OWN_DRAFT") &&
          article.author &&
          article.author.id === tokenPayload.sub)
      );
    }

    case "ARCHIVED": {
      return (
        tokenPayload.permissions.includes("ARTICLE_PUBLISH_ALL_ARCHIVED") ||
        (tokenPayload.permissions.includes("ARTICLE_PUBLISH_OWN_ARCHIVED") &&
          article.author &&
          article.author.id === tokenPayload.sub)
      );
    }

    default: {
      return false;
    }
  }
}

export function canArchiveArticle(article, tokenPayload) {
  if (
    !tokenPayload ||
    !tokenPayload.permissions ||
    !tokenPayload.sub ||
    !article
  ) {
    return false;
  }

  switch (article.status) {
    case "DRAFT": {
      return (
        tokenPayload.permissions.includes("ARTICLE_ARCHIVE_ALL_DRAFT") ||
        (tokenPayload.permissions.includes("ARTICLE_ARCHIVE_OWN_DRAFT") &&
          article.author &&
          article.author.id === tokenPayload.sub)
      );
    }

    case "PUBLISHED": {
      return (
        tokenPayload.permissions.includes("ARTICLE_ARCHIVE_ALL_PUBLISHED") ||
        (tokenPayload.permissions.includes("ARTICLE_ARCHIVE_OWN_PUBLISHED") &&
          article.author &&
          article.author.id === tokenPayload.sub)
      );
    }

    default: {
      return false;
    }
  }
}

export function canViewDraftArticles(tokenPayload) {
  if (!tokenPayload || !tokenPayload.permissions) {
    return false;
  }

  return (
    tokenPayload.permissions.includes("ARTICLE_VIEW_ALL_DRAFT") ||
    tokenPayload.permissions.includes("ARTICLE_VIEW_OWN_DRAFT")
  );
}

export function canViewPublishedArticles(tokenPayload) {
  if (!tokenPayload || !tokenPayload.permissions) {
    return false;
  }

  return (
    tokenPayload.permissions.includes("ARTICLE_VIEW_ALL_PUBLISHED") ||
    tokenPayload.permissions.includes("ARTICLE_VIEW_OWN_PUBLISHED")
  );
}

export function canViewArchivedArticles(tokenPayload) {
  if (!tokenPayload || !tokenPayload.permissions) {
    return false;
  }

  return (
    tokenPayload.permissions.includes("ARTICLE_VIEW_ALL_ARCHIVED") ||
    tokenPayload.permissions.includes("ARTICLE_VIEW_OWN_ARCHIVED")
  );
}
