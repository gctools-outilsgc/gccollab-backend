import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { client } from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const query = {
    name: "get_user",
    text: "SELECT get_user($1)",
    values: [req.body.username],
  };

  client.connect();
  const results = await client.query(query);

  context.res = {
    // status: 200, /* Defaults to 200 */
    headers: { "Content-Type": "application/json" },
    body: results.rows[0].get_user,
  };
};

export default httpTrigger;
