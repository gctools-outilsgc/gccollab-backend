import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const { firstName, lastName, username, email, mobile } = req.body;

  client
    .submit(
      `g.addV(label)
      .property('id', id)
      .property('firstName', firstName)
      .property('lastName', lastName)
      .property('email', email)
      .property('username',username)
      .property('mobile', mobile)
      .property('registeredAt', registeredAt )
      .property('status', status )
      .property('isAdmin', isAdmin )
      .property('pk', 'pk')`,

      {
        label: "user",
        id: username,
        firstName,
        lastName,
        username,
        email,
        mobile,
        status: 1,
        isAdmin: 0,
        registeredAt: Date.now(),
      }
    )
    .then((result) => {
      console.log(JSON.stringify(result));
    });
};

export default httpTrigger;
