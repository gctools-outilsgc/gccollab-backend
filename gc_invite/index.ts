import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   const {email, en_message, fr_message} = req.body
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.body
    };

};

export default httpTrigger;