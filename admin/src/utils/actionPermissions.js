export function canEditArticle(article, currentUser) {
  if (!currentUser || !currentUser.permissions || !currentUser.id || !article) {
    return false;
  }

  switch (article.status) {
    case "DRAFT": {
      return (
        currentUser.permissions.includes("ARTICLE_UPDATE_ALL_DRAFT") ||
        (currentUser.permissions.includes("ARTICLE_UPDATE_OWN_DRAFT") &&
          article.author_id === currentUser.id)
      );
    }

    case "PUBLISHED": {
      return (
        currentUser.permissions.includes("ARTICLE_UPDATE_ALL_PUBLISHED") ||
        (currentUser.permissions.includes("ARTICLE_UPDATE_OWN_PUBLISHED") &&
          article.author_id === currentUser.id)
      );
    }

    case "ARCHIVED": {
      return (
        currentUser.permissions.includes("ARTICLE_UPDATE_ALL_ARCHIVED") ||
        (currentUser.permissions.includes("ARTICLE_UPDATE_OWN_ARCHIVED") &&
          article.author_id === currentUser.id)
      );
    }

    default: {
      return false;
    }
  }
}

export function canPublishArticle(article, currentUser) {
  if (!currentUser || !currentUser.permissions || !currentUser.id || !article) {
    return false;
  }

  switch (article.status) {
    case "DRAFT": {
      return (
        currentUser.permissions.includes("ARTICLE_PUBLISH_ALL_DRAFT") ||
        (currentUser.permissions.includes("ARTICLE_PUBLISH_OWN_DRAFT") &&
          article.author &&
          article.author.id === currentUser.id)
      );
    }

    case "ARCHIVED": {
      return (
        currentUser.permissions.includes("ARTICLE_PUBLISH_ALL_ARCHIVED") ||
        (currentUser.permissions.includes("ARTICLE_PUBLISH_OWN_ARCHIVED") &&
          article.author &&
          article.author.id === currentUser.id)
      );
    }

    default: {
      return false;
    }
  }
}

export function canArchiveArticle(article, currentUser) {
  if (!currentUser || !currentUser.permissions || !currentUser.id || !article) {
    return false;
  }

  switch (article.status) {
    case "DRAFT": {
      return (
        currentUser.permissions.includes("ARTICLE_ARCHIVE_ALL_DRAFT") ||
        (currentUser.permissions.includes("ARTICLE_ARCHIVE_OWN_DRAFT") &&
          article.author &&
          article.author.id === currentUser.id)
      );
    }

    case "PUBLISHED": {
      return (
        currentUser.permissions.includes("ARTICLE_ARCHIVE_ALL_PUBLISHED") ||
        (currentUser.permissions.includes("ARTICLE_ARCHIVE_OWN_PUBLISHED") &&
          article.author &&
          article.author.id === currentUser.id)
      );
    }

    default: {
      return false;
    }
  }
}

export function canViewDraftArticles(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return (
    currentUser.permissions.includes("ARTICLE_VIEW_ALL_DRAFT") ||
    currentUser.permissions.includes("ARTICLE_VIEW_OWN_DRAFT")
  );
}

export function canViewPublishedArticles(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return (
    currentUser.permissions.includes("ARTICLE_VIEW_ALL_PUBLISHED") ||
    currentUser.permissions.includes("ARTICLE_VIEW_OWN_PUBLISHED")
  );
}

export function canViewArchivedArticles(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return (
    currentUser.permissions.includes("ARTICLE_VIEW_ALL_ARCHIVED") ||
    currentUser.permissions.includes("ARTICLE_VIEW_OWN_ARCHIVED")
  );
}
