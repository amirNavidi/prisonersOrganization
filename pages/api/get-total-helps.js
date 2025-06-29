import  {APICaller}  from "../../utilities/APICaller";

export default async function handler(req , res) {
    try{
        const HelpTypeUID = req.body.HelpTypeUID?req.body.HelpTypeUID:null
        const {customerUID , token}=req.body;
        if(!customerUID||!token) {
            return res.status(417).json({message:'Unauthorized'})
        }else{
            const backendResponse = await APICaller(req,'GetTotalHelps',{CustomerUID:customerUID,LoginToken:token,HelpTypeUID})
            if(backendResponse){
                console.log(backendResponse , 'this is total help response');
                return res.status(200).json({backendResponse})
            }else{
                return res.status(503).json({message:'An error occured'})
            }
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({message:'server error'})
    }
}