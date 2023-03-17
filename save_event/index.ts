import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   const {user, title, body, startdate, starttime,enddate, endtime, venue, room, allday,web_conference, url, additionnal, fees,contact_checkbox, contact_text,contact_email_text, contact_phone_text,picker_language, container_guid, event_guid,comments, access, status, lang} = req.body
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.body
    };

};

export default httpTrigger;