import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { sourceUser, targetUser } = req.body;
    if (sourceUser.length == 0 || targetUser.length == 0) {
      context.res = {
        status: 400,
        body: "Bad request sent to server. Either no data was returned, or data is missing from request",
      };
    } else {
      await client
        .submit(
          `g.V(sourceUser).addE(relationship).to(g.V(targetUser)).property('status',1).property('type',1).property('pk', 'pk').property('id',id)`,
          {
            sourceUser,
            relationship: "friend",
            targetUser,
            id: `${sourceUser}-${targetUser}`,
          }
        )
        .then((result) => {
          if (result.length <= 1) {
            context.res = {
              status: 200,
              body: `Request was sent successfully`,
            };
          }
        })
        .catch((err) => {
          const errMessage = err.statusMessage.substring(
            err.statusMessage.indexOf("Errors :"),
            err.statusMessage.indexOf("]") + 1
          );
          context.res = {
            status: err.statusCode || 400,
            body:
              `${errMessage}` ||
              `Server did not recieve data in a proper format`,
          };
        });
    }
  } catch (e) {
    context.res = {
      status: 400,
      body: e,
    };
  }
};

export default httpTrigger;
