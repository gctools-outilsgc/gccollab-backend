import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../db/db.connection";
import * as sql from "mssql";
import { sluggify } from "../helperScripts/sluggifyString";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const {
    username,
    title,
    summary,
    status,
  }: {
    username: string;
    title: string;
    summary: string;
    status: number;
  } = req.body;

  const slug: string = sluggify(title);
  const metaTitle: string = summary;
  try {
    let db = await connect();
    await db
      .request()
      .input("title", sql.NVarChar(75), title)
      .input("slug", sql.NVarChar(100), slug)
      .input("summary", sql.NVarChar(100), summary)
      .input("metaTitle", sql.NVarChar(100), metaTitle)
      .input("status", sql.Int, status)
      .input("username", sql.NVarChar(50), username)
      .execute("gcc_create_group");

    context.res = {
      status: 200,
      body: { message: "group creation successful" },
    };
  } catch (e) {
    context.res = {
      status: 400,
      body: { message: e.code },
    };
  }
};

export default httpTrigger;
