import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { exit } from "process";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser } = req.body || req.query;

  await client
    .submit(`g.V(sourceUser).outE(label).inV().id()`, {
      sourceUser,
      label: "friend",
    })
    .then((result) => {
      console.log(result.length);
      if (result.length == 0) {
        throw new Error("Query returned no records");
      } else {
        context.res = {
          headers: {
            "Content-Type": "application/json",
          },
          body: { data: result._items },
        };
      }
    })
    .catch((err) => {
      context.res = {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
        body: "No data returned",
      };
    });
};

export default httpTrigger;
