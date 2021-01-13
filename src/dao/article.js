const { AppErr } = require("../app/error");

const { Article } = require("../models/article");

// Create and Save a new Article
exports.create = async (article) => {
  try {
    // Create a Article
    const articleDoc = new Article(article);
    // Save Article in the database
    const data = await articleDoc.save(article);
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_CREATE_DB_ERR");
  }
};

// Retrieve all Articles from the database.
exports.findAll = async ({ title, published }) => {
  try {
    var condition = {};
    if (title) condition.title = { $regex: new RegExp(title), $options: "i" };
    if (published) condition.published = true;

    const articles = await Article.find(condition);
    return articles;
  } catch (err) {
    throw new AppErr(err, "AE_FINDALL_DB_ERR");
  }
};

// Find a single Article with an id
exports.findOne = async ({ id }) => {
  try {
    const data = await Article.findById(id);
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_FIND_DB_ERR", id);
  }
};

// Update a Article by the id
exports.update = async ({ id, article }) => {
  try {
    const data = await Article.findByIdAndUpdate(id, article, {
      useFindAndModify: false,
    });
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_UPDATE_DB_ERR", id);
  }
};

// Delete a Article with the specified id
exports.delete = async ({ id }) => {
  try {
    const data = await Article.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_DEL_DB_ERR", id);
  }
};

// Delete all Articles from the database.
exports.deleteAll = async () => {
  try {
    const data = await Article.deleteMany({});
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_DELALL_DB_ERR");
  }
};
