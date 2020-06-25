function canViewPublishedArticles(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return (
    currentUser.permissions.includes("ARTICLE_VIEW_ALL_PUBLISHED") ||
    currentUser.permissions.includes("ARTICLE_VIEW_OWN_PUBLISHED")
  );
}

export default canViewPublishedArticles;
