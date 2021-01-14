const dao = require("../dao/article");

function create(articles) {
  console.log("svc:create");
  return dao.create(articles);
}

module.exports = {
  ...dao,
  create,
};
