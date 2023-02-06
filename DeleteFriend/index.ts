import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pool } from "../db/db.connection";
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await pool.connect();
  const { sourceUser, targetUser } = req.body || req.query;
  const query = {
    name: "Remove Friend Connection",
    text: "CALL remove_friend($1, $2)",
    values: [sourceUser, targetUser],
  };
  try {
    const result = await pool.query(query);
    context.res = {
      header: { "Content-Type": "application/json" },
      body: "Connection deleted",
    };
  } catch (err) {
    context.res = {
      header: { "Content-Type": "application/json" },
      body: err.detail,
      status: 500,
    };
  }
};

export default httpTrigger;
