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
