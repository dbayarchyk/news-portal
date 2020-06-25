function canViewDraftArticles(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return (
    currentUser.permissions.includes("ARTICLE_VIEW_ALL_DRAFT") ||
    currentUser.permissions.includes("ARTICLE_VIEW_OWN_DRAFT")
  );
}

export default canViewDraftArticles;
