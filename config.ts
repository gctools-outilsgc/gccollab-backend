import * as env from "dotenv";

env.config({
  path: ".env",
});
export const AZ_SQL_USER = process.env.AZ_SQL_USER;
export const AZ_SQL_PASS = process.env.AZ_SQL_PASS;
export const AZ_SQL_URL = process.env.AZ_SQL_URL;
export const AZ_SQL_DB = process.env.AZ_SQL_DB;
export const AZ_GCDB_ENDPOINT = process.env.AZ_GCDB_ENDPOINT;
export const AZ_GCDB_PK = process.env.AZ_GCDB_PK;
export const AZ_GCDB_DB = process.env.AZ_GCDB_DB;
export const AZ_GCDB_COLL = process.env.AZ_GCDB_COLL;
