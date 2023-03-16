import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   const { user, password, lang} = req.params
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: 'login_user called'
    };

};

export default httpTrigger;