import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pool } from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { firstName, lastName, username, mobile, email } = req.body;
  const query = {
    name: "get_user",
    text: "CALL register_user($1, $2, $3, $4, $5)",
    values: [firstName, lastName, username, mobile, email],
  };

  await pool.connect();
  try {
    const result = await pool.query(query);
    context.res = {
      status: 200,
      headers: { "Content-type": "application/json" },
      body: `Registered successfully`,
    };
  } catch (err) {
    context.res = {
      status: 500,
      headers: { "Content-type": "application/json" },
      body: err.detail,
    };
  }
};

export default httpTrigger;
