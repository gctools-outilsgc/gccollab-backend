import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   const {user, message, image, lang} = req.body
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.body
    };

};

export default httpTrigger;