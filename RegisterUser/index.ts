/*
This function passes params taken from request body as RAW JSON and executes the register user SQL procedure
Record is auto timestamped upon creation
*/

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../db/db.connection";
import * as sql from "mssql";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const {
    firstName,
    lastName,
    username,
    email,
    mobile,
  }: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobile: string;
  } = req.body;

  try {
    let db = await connect();
    await db
      .request()
      .input("firstName", sql.NVarChar(50), firstName)
      .input("lastName", sql.NVarChar(50), lastName)
      .input("username", sql.NVarChar(50), username)
      .input("email", sql.NVarChar(50), email)
      .input("mobile", sql.NVarChar(15), mobile)
      .execute("gcc_register_user");
    context.res = {
      status: 200,
      body: { message: "User registration successful" },
    };
  } catch (e) {
    context.res = {
      status: 400,
      body: { message: e.code },
    };
  }
};

export default httpTrigger;
