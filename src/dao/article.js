const { AppErr } = require("../utils/status");

const { Article } = require("../models/article");

// Create and Save a new Article
async function create(articles) {
  try {
    // Create a Article
    const articleDocs = articles.map((article) => new Article(article));
    // Save Articles in the database
    const data = await Article.create(articleDocs);
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_CREATE_DB_ERR");
  }
}

// Retrieve all Articles from the database.
async function findAll({ title, published }) {
  try {
    var condition = {};
    if (title) condition.title = { $regex: new RegExp(title), $options: "i" };
    if (published) condition.published = true;

    const articles = await Article.find(condition);
    return articles;
  } catch (err) {
    throw new AppErr(err, "AE_FINDALL_DB_ERR");
  }
}

// Find a single Article with an id
async function findOne({ id }) {
  try {
    const data = await Article.findById(id);
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_FIND_DB_ERR", id);
  }
}

// Update a Article by the id
async function update({ id, article }) {
  try {
    const data = await Article.findByIdAndUpdate(id, article, {
      useFindAndModify: false,
    });
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_UPDATE_DB_ERR", id);
  }
}

// Delete a Article with the specified id
async function deleteOne({ id }) {
  try {
    const data = await Article.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_DEL_DB_ERR", id);
  }
}

// Delete all Articles from the database.
async function deleteAll() {
  try {
    const data = await Article.deleteMany({});
    return data;
  } catch (err) {
    throw new AppErr(err, "AE_DELALL_DB_ERR");
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
  deleteAll,
};
