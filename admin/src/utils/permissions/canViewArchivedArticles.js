function canViewArchivedArticles(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return (
    currentUser.permissions.includes("ARTICLE_VIEW_ALL_ARCHIVED") ||
    currentUser.permissions.includes("ARTICLE_VIEW_OWN_ARCHIVED")
  );
}

export default canViewArchivedArticles;
