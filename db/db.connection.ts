import * as env from "../config";
import * as pg from "pg";

const config = {
  host: "devgcx-collab-pg.postgres.database.azure.com",
  user: env.PGUSER,
  password: env.PGPASS,
  database: env.PGDB,
  port: env.PGPORT,
  ssl: true,
};

export const pool = new pg.Pool(config);
