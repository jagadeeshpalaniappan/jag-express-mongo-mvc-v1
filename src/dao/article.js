const { Article } = require("../models/article");

// Create and Save a new Article
exports.create = (article) => {
  // Create a Article
  const articleDoc = new Article(article);
  // Save Article in the database
  return articleDoc.save(article);
};

// Retrieve all Articles from the database.
exports.findAll = ({ title }) => {
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  return Article.find(condition);
};

// Find a single Article with an id
exports.findOne = ({ id }) => {
  return Article.findById(id);
};

// Update a Article by the id in the request
exports.update = ({ id, article }) => {
  return Article.findByIdAndUpdate(id, article, { useFindAndModify: false });
};

// Delete a Article with the specified id in the request
exports.delete = ({ id }) => {
  return Article.findByIdAndRemove(id, { useFindAndModify: false });
};

// Delete all Articles from the database.
exports.deleteAll = () => {
  return Article.deleteMany({});
};

// Find all published Articles
exports.findAllPublished = () => {
  return Article.find({ published: true });
};
