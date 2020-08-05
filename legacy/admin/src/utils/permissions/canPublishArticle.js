function canPublishArticle(article, currentUser) {
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

export default canPublishArticle;
