import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { sourceUser, targetUser } = req.body;

  client.submit(
    `g.V(sourceUser).addE(relationship).to(g.V(targetUser)).property('status',1).property('type',1).property('pk', 'pk')`,
    {
      sourceUser,
      relationship: "friend",
      targetUser,
    }
  );
};

export default httpTrigger;
