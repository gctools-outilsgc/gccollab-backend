import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   const {username, password} = req.body
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: 'auth_gettoken called'
    };

};

export default httpTrigger;