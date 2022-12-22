import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../db/db.connection";
import * as sql from "mssql";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const {
    sourceUser,
    targetUser,
    id,
  }: { sourceUser: string; targetUser: string; id: number } = req.body;
  const status = 3;
  try {
    let db = await connect();
    await db
      .request()
      .input("sourceUser", sql.NVarChar(50), sourceUser)
      .input("targetUser", sql.NVarChar(50), targetUser)
      .input("id", sql.Int, id)
      .input("status", sql.SmallInt, status)
      .execute("gcc_accept_friend_connection");
    context.res = {
      status: 200,
      body: {
        message: `${sourceUser} as connected successfully with ${targetUser}`,
      },
    };
  } catch (e) {
    context.res = {
      status: 400,
      body: { message: e.code },
    };
  }
};

export default httpTrigger;
