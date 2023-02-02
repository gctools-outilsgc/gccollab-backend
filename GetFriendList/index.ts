import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pool } from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (req.body == undefined) {
    context.res = {
      status: 400,
      // status: 200, /* Defaults to 200 */
      headers: { "Content-Type": "application/json" },
      body: "No data passed",
    };
    return;
  }
  const query = {
    name: "get_user",
    text: "SELECT get_friend_list($1)",
    values: [req.body.username],
  };

  await pool.connect();
  try {
    const results = await pool.query(query);
    context.res = {
      // status: 200, /* Defaults to 200 */
      headers: { "Content-Type": "application/json" },
      body: { data: results.rows },
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
