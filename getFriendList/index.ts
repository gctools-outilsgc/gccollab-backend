import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { connect } from "../db/db.connection";
import * as sql from "mssql";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser }: { sourceUser: string } = req.body || req.query;
  let records;
  const executeQuery = async (source) => {
    try {
      let db = await connect();
      let query;
      if (!source) {
        throw new Error("No source defined");
      }
      query = await db
        .request()
        .input("sourceUser", sql.NVarChar(50), source)
        .execute("gcc_list_friends");
      console.log(query);

      return { data: query.recordset, rows: query.rowsAffected };
    } catch (e) {
      console.log(e.message);
      return { error: e.message };
    }
  };

  records = await executeQuery(sourceUser);
  if (records.data && records.data.length > 0) {
    context.res = {
      status: 200,
      body: { data: records.data },
    };
  } else if (records.error) {
    context.res = {
      status: 400,
      body: records.error,
    };
  } else if (records.rows < 1 && records.data.length == 0) {
    context.res = {
      status: 200,
      body: {
        data: records.data,
      },
    };
  }
};
export default httpTrigger;
