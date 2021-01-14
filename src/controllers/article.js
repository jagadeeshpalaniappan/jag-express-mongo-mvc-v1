const { getMsg } = require("../utils/status");
const svc = require("../services/article");

const mapArticle = ({ title, description, published }) => ({
  title,
  description,
  published: !!published,
});

// Create and Save one or many new Articles
async function create(req, res) {
  const articles = Array.isArray(req.body)
    ? req.body.map(mapArticle)
    : [mapArticle(req.body)];

  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send(getMsg(null, "AE_CREATE_VALIDATION", "title"));
  //   return;
  // }

  try {
    const createdArticle = await svc.create(articles);
    res.send(createdArticle);
  } catch (err) {
    res.status(500).send(getMsg(err, "AE_CREATE_ERR"));
  }
}

// Retrieve all Articles from the database.
async function findAll(req, res) {
  const title = req.query.title;
  const published = req.query.published;
  try {
    const data = await svc.findAll({ title, published });
    res.send(data);
  } catch (err) {
    res.status(500).send(getMsg(err, "AE_FINDALL_ERR"));
  }
}

// Find a single Article with an id
async function findOne(req, res) {
  const id = req.params.id;
  try {
    const data = await svc.findOne({ id });
    if (!data) res.status(404).send(getMsg(null, "AE_FIND_NOTFOUND", id));
    else res.send(data);
  } catch (err) {
    res.status(500).send(getMsg(err, "AE_FIND_ERR", id));
  }
}

// Update a Article by the id in the request
async function update(req, res) {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send(getMsg(null, "AE_UPDATE_VALIDATION", id));
  }
  try {
    const data = await svc.update({ id, article: req.body });
    if (!data) res.status(404).send(getMsg(null, "AE_UPDATE_NOTFOUND", id));
    else res.send({ ...req.body, id });
  } catch (err) {
    res.status(500).send(getMsg(err, "AE_UPDATE_ERR", id));
  }
}

// Delete a Article with the specified id in the request
async function deleteOne(req, res) {
  const id = req.params.id;

  try {
    const data = await svc.deleteOne({ id });
    if (!data) res.status(404).send(getMsg(null, "AE_DEL_NOTFOUND", id));
    else res.send(getMsg(null, "AE_DEL_SUCCESS", id));
  } catch (err) {
    res.status(500).send(getMsg(err, "AE_DEL_ERR", id));
  }
}

// Delete all Articles from the database.
async function deleteAll(req, res) {
  try {
    const data = await svc.deleteAll();
    res.send(getMsg(null, "AE_DELALL_SUCCESS", data.deletedCount));
  } catch (err) {
    res.status(500).send(getMsg(err, "AE_DELALL_ERR"));
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
