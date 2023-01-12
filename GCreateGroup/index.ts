import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import client from "../db/db.connection";
import { sluggify } from "../helperScripts/sluggifyString";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { username, title, summary, status, pub } = req.body;

  const slug = sluggify(title);
  const metaTitle = summary;

  client
    .submit(
      `g.addV(label)
    .property('id', id)
    .property('title', title)
    .property('slug', slug)
    .property('summary', summary)
    .property('metaTitle', metaTitle)
    .property('status', status)
    .property('username', username)
    .property('createdAt', createdAt)
    .property('public', pub)
    .property('pk', 'pk')`,
      {
        label: "groups",
        id: title,
        title,
        slug,
        metaTitle,
        status,
        username,
        summary,
        pub,
        createdAt: Date.now(),
      }
    )
    .then((result) => {
      console.log(JSON.stringify(result));
    });
};

export default httpTrigger;
