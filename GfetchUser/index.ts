import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const sourceUser = context.bindingData.user;

  await client
    .submit("g.V(sourceUser).valueMap(true)", { sourceUser })
    .then((result) => {
      context.res = {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
        body: { data: result },
      };
    })
    .catch((err) => {
      context.res = {
        headers: {
          "Content-Type": "application/json",
        },
        status: err.status,
        body: `Error returned \n${err}`,
      };
    });
};

export default httpTrigger;
