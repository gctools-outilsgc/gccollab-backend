import * as env from "dotenv";

env.config({
  path: ".env",
});
export const PG_USER = process.env.PG_USER;
export const PG_PASS = process.env.PG_PASS;
export const PG_DB = process.env.PG_DB;
export const PG_PORT = process.env.PG_PORT;
