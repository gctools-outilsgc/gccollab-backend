import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   const {user, guid, limit, offset, lang, api_version} = req.params
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.params
    };

};

export default httpTrigger;