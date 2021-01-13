const { Article } = require("../models/article");
const dao = require("../dao/article");

// Create and Save a new Article
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "title can not be empty!" });
    return;
  }

  try {
    const article = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };
    await dao.create(article);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Article.",
    });
  }
};

// Retrieve all Articles from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;

  try {
    const data = await dao.findAll({ title });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Articles.",
    });
  }
};

// Find a single Article with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await dao.findOne({ id });
    if (!data)
      res.status(404).send({ message: "Not found Article with id " + id });
    else res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Article with id=" + id,
    });
  }
};

// Update a Article by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  try {
    const data = await dao.update({ id, article: req.body });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Article with id=${id}. Maybe Article was not found!`,
      });
    } else res.send({ message: "Article was updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Article with id=" + id,
    });
  }
};

// Delete a Article with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await dao.delete({ id });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
      });
    } else {
      res.send({
        message: "Article was deleted successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Article with id=" + id,
    });
  }
};

// Delete all Articles from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await dao.deleteAll({ id });
    res.send({
      message: `${data.deletedCount} Articles were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all articles.",
    });
  }
};

// Find all published Articles
exports.findAllPublished = async (req, res) => {
  try {
    const data = await dao.findAllPublished();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving articles.",
    });
  }
};
