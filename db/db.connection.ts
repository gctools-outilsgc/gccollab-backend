import * as env from "../config";
import * as sql from "mssql";

const config = {
  user: env.AZ_SQL_USER,
  password: env.AZ_SQL_PASS,
  server: env.AZ_SQL_URL,
  database: env.AZ_SQL_DB,
  options: {
    encrypt: true,
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

export const connect = async () => {
  try {
    const db = await sql.connect(config);
    return db;
  } catch (e) {
    console.error(e);
  }
};
