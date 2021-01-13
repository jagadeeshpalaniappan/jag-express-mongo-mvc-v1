const { AppErr, getErr } = require("../app/error");
const dao = require("../dao/article");

// Create and Save a new Article
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send(getErr(null, "AE_CREATE_VALIDATION", "title"));
    return;
  }

  try {
    const article = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };
    const createdArticle = await dao.create(article);
    res.send(createdArticle);
  } catch (err) {
    res.status(500).send(getErr(err, "AE_CREATE_ERR"));
  }
};

// Retrieve all Articles from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  const published = req.query.published;
  try {
    const data = await dao.findAll({ title, published });
    res.send(data);
  } catch (err) {
    res.status(500).send(getErr(err, "AE_FINDALL_ERR"));
  }
};

// Find a single Article with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await dao.findOne({ id });
    if (!data) res.status(404).send(getErr(null, "AE_FIND_NOTFOUND", id));
    else res.send(data);
  } catch (err) {
    res.status(500).send(getErr(err, "AE_FIND_ERR", id));
  }
};

// Update a Article by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send(getErr(null, "AE_UPDATE_VALIDATION", id));
  }
  try {
    const data = await dao.update({ id, article: req.body });
    if (!data) res.status(404).send(getErr(null, "AE_UPDATE_NOTFOUND", id));
    else res.send({ ...req.body, id });
  } catch (err) {
    res.status(500).send(getErr(err, "AE_UPDATE_ERR", id));
  }
};

// Delete a Article with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await dao.delete({ id });
    if (!data) res.status(404).send(getErr(null, "AE_DEL_NOTFOUND", id));
    else res.send(getErr(null, "AE_DEL_SUCCESS", id));
  } catch (err) {
    res.status(500).send(getErr(err, "AE_DEL_ERR", id));
  }
};

// Delete all Articles from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await dao.deleteAll();
    res.send(getErr(null, "AE_DELALL_SUCCESS", data.deletedCount));
  } catch (err) {
    res.status(500).send(getErr(err, "AE_DELALL_ERR"));
  }
};
