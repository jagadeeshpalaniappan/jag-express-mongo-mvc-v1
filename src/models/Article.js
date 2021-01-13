const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

ArticleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Article = mongoose.model("Article", ArticleSchema, "Articles");
module.exports = { ArticleSchema, Article };
