import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser } = req.body || req.query;

  await client
    .submit(
      `g.V(sourceUser).valueMap().local(unfold()
    .where(select(keys).is(without(["pk"])))
    .group().by(select(keys)).by(select(values)))`,
      { sourceUser }
    )
    .then((result) => {
      if (result._items.length == 0) {
        throw new Error();
      } else {
        context.res = {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
          body: { data: result._items[0] },
        };
      }
    })
    .catch((err) => {
      context.res = {
        headers: {
          "Content-Type": "application/json",
        },
        status: err.statusCode || 400,
        body: `${`Bad request sent to server. Either no data was returned, or data is missing from request`}`,
      };
    });
};

export default httpTrigger;
