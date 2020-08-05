function canArchiveArticle(article, currentUser) {
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

export default canArchiveArticle;
