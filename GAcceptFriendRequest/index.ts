import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser, targetUser } = req.body;

  client.submit(
    `g.E().where(outV().hasId(targetUser)).and(inV().hasId(sourceUser)).property(Cardinality.single, 'status', 2)`,
    { sourceUser, targetUser }
  );
};

export default httpTrigger;
