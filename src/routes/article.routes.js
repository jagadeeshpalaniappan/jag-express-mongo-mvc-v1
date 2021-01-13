const articleCtrl = require("../controllers/article.controller.js");

var router = require("express").Router();

// Create a new Article
router.post("/", articleCtrl.create);

// Retrieve all Articles
router.get("/", articleCtrl.findAll);

// Retrieve all published Articles
router.get("/published", articleCtrl.findAllPublished);

// Retrieve a single Article with id
router.get("/:id", articleCtrl.findOne);

// Update a Article with id
router.put("/:id", articleCtrl.update);

// Delete a Article with id
router.delete("/:id", articleCtrl.delete);

// Create a new Article
router.delete("/", articleCtrl.deleteAll);

module.exports = router;
