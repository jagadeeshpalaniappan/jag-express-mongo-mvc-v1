require("dotenv").config();

const db = require("./src/app/db");
db.init();

const api = require("./src/app/api");
api.init();
