import * as env from "../config";
import * as pg from "pg";

const config = {
  host: "devgcx-collab-pg.postgres.database.azure.com",
  user: env.PG_USER,
  password: env.PG_PASS,
  database: env.PG_DB,
  port: env.PG_PORT,
  ssl: true,
};

export const client = new pg.Client(config);
