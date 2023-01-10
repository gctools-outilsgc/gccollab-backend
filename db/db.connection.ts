import * as env from "../config";
import * as sql from "mssql";
import * as Gremlin from "gremlin";

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

const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(
  `/dbs/${env.AZ_GCDB_DB}/colls/${env.AZ_GCDB_COLL}`,
  env.AZ_GCDB_PK
);

const client = new Gremlin.driver.Client(env.AZ_GCDB_ENDPOINT, {
  authenticator,
  traversalsource: "g",
  rejectUnauthorized: true,
  mimeType: "application/vnd.gremlin-v2.0+json",
});

export default client;
