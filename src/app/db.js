const appConfig = require("./config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function init() {
  // console.log("dbUrl:", appConfig.dbUrl);
  mongoose
    .connect(appConfig.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
}

module.exports = { mongoose, init };
