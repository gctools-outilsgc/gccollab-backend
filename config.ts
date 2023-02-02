import * as env from "dotenv";

env.config({
  path: ".env",
});
export const PGUSER = process.env.PGUSER;
export const PGPASS = process.env.PGPASS;
export const PGDB = process.env.PGDB;
export const PGPORT = process.env.PGPORT;
