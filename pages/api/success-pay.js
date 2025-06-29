import  {APICaller}  from "../../utilities/APICaller";

export default async function handler (req , res){
    try{
        const { CustomerUID,token,page,uid} =req.body;
    if(!CustomerUID||!token){
        return res.status(417).json({message:'Unautorized'})
    }else{
        const backendResponse = await APICaller(req,'PayReceipts',{CustomerUID:CustomerUID,LoginToken:token,PageName:page,HelpDetailUID:uid})
        if(backendResponse[0].CustomerName){
            return res.status(200).json({data:backendResponse[0]})
        }else{
            return res.status(503).json({message:'backendErr'})
        }        
        
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:''})
        
    }
}