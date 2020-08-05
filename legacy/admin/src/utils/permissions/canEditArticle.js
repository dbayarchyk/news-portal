function canEditArticle(article, currentUser) {
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

export default canEditArticle;
