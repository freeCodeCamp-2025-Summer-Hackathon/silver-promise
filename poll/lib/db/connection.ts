import { Pool } from "pg";
require("dotenv").config();

const connectionPool = new Pool({
  connection: process.env.DATABASE_URL,
});

module.exports = connectionPool;

