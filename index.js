// require("dotenv").config();
const env = process.env.NODE_ENV || "";
require("dotenv").config({ path: `.env.${env.toLowerCase()}` });

const db = require("./src/app/db");
db.init();

const api = require("./src/app/api");
api.init();
