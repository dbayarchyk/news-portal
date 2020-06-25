function canCreateComment(currentUser) {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  return currentUser.permissions.includes("COMMENT_CREATE");
}

export default canCreateComment;
