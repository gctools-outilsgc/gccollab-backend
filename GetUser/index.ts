import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pool } from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const queryStringExists = req.body.username == undefined;

  const username = queryStringExists ? req.query.username : req.body.username;

  const query = {
    name: "get_user",
    text: "SELECT get_user($1)",
    values: [username],
  };

  await pool.connect();
  try {
    const results = await pool.query(query);
    context.res = {
      // status: 200, /* Defaults to 200 */
      headers: { "Content-Type": "application/json" },
      body: results.rows,
    };
  } catch (err) {
    context.res = {
      status: 400,
      // status: 200, /* Defaults to 200 */
      headers: { "Content-Type": "application/json" },
      body: err.detail,
    };
  }
};

export default httpTrigger;
