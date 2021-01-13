const errCodes = {
  // ARTICLE:
  AE_CREATE_DB_ERR: "DB error occurred while creating the Article.",
  AE_CREATE_ERR: "Some error occurred while creating the Article.",
  AE_CREATE_VALIDATION: "'%s' is required",

  AE_UPDATE_VALIDATION: "Cannot be updated with empty data",
  AE_UPDATE_NOTFOUND: "Article Not found [ID:%s], Cannot update",
  AE_UPDATE_DB_ERR: "DB error occurred while updating the Article [ID:%s].",
  AE_UPDATE_ERR: "Some error occurred while updating the Article [ID:%s].",

  AE_DEL_NOTFOUND: "Article Not found [ID:%s], Cannot delete",
  AE_DEL_DB_ERR: "DB error occurred while deleting the Article [ID:%s].",
  AE_DEL_ERR: "Some error occurred while deleting the Article [ID:%s].",
  AE_DEL_SUCCESS: "Article [ID:%s] was deleted successfully.",

  AE_DELALL_DB_ERR: "DB error occurred while deleting the Articles.",
  AE_DELALL_ERR: "Some error occurred while deleting the Articles.",
  AE_DELALL_SUCCESS: "%s Articles were deleted successfully.",

  AE_FIND_NOTFOUND: "Article not found [ID: %s]",
  AE_FIND_DB_ERR: "DB error occurred while getting the Article [ID: %s]",
  AE_FIND_ERR: "Some error occurred while getting the Article [ID: %s]",

  AE_FINDALL_DB_ERR: "DB error occurred while getting the Articles.",
  AE_FINDALL_ERR: "Some error occurred while getting the Articles.",

  AE_FINDALL_DB_ERR: "DB error occurred while getting the Articles.",
  AE_FINDALL_ERR: "Some error occurred while getting the Articles.",
};

module.exports = errCodes;
