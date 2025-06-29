import  {APICaller}  from "../../../utilities/APICaller";
global.usersPhoneNumber = [];
// import logger from '../../../utilities/logger';

export default async function handler(req, res) {
    const { CustomerMobile, uuid } = req.body;
    console.log(req.body,"about request");
    // logger.info(`New request: ${req.method} ${req.url}`);

    if (req.method === "POST") {
        if (!CustomerMobile || !uuid) {
            return res.status(400).json({ message: "Bad Params" });
        }
        try {
            const backendResponse = await APICaller(req,'SendSMSPublic', { "CustomerMobile": CustomerMobile , "SendSMSType":"10" });
            console.log(backendResponse,'send sms response');

            if (backendResponse[0].Reault === 'Its OK') {
                global.usersPhoneNumber.push({ id: uuid , number:CustomerMobile });
                console.log(usersPhoneNumber,'this is pushed item')
                return res.status(200).json({ message: "OK", status: 200 });
            } else {
                return res.status(500).json({ message: "Failed to fetch customer info", status: 500 });
            }
        } catch (error) {
            console.error("Error fetching customer info:", error);
            return res.status(500).json({ message: "Server error", status: 500 });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}

