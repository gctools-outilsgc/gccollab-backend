import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pool } from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser, targetUser } = req.body;
  const query = {
    name: "submit_friend_request",
    text: "CALL submit_friend_request($1, $2)",
    values: [sourceUser, targetUser],
  };
  await pool.connect();
  try {
    const result = await pool.query(query);
    console.log(result);
    context.res = {
      status: 200,
      headers: { "Content-type": "application/json" },
      body: `Friend request submitted successfully`,
    };
  } catch (err) {
    context.res = {
      status: 500,
      headers: { "Content-type": "application/json" },
      body: err,
    };
  }
};

export default httpTrigger;
