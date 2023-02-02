import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pool } from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser, targetUser, rejected } = req.body;
  const statusCode = rejected == "accepted" ? 1 : 2;
  const query = {
    name: "accept_friend_request",
    text: "CALL accept_friend_request($1, $2, $3)",
    values: [sourceUser, targetUser, statusCode],
  };
  await pool.connect();
  try {
    const result = await pool.query(query);
    console.log(result);
    context.res = {
      status: 200,
      headers: { "Content-type": "application/json" },
      body:
        rejected == 1
          ? `Friend request accepted`
          : `Friend request rejected successfully`,
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
