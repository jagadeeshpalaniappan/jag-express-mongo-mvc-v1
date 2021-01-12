const express = require("express");
const app = express();
require("./middlewares")(app);
require("./routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

function init() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = { app, init };
