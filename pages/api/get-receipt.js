import  {APICaller}  from "../../utilities/APICaller";


export default async function handler(req , res){
    try{
        const {customerUID , token} =req.body;
        if(!customerUID || !token ){
            return res.status(417).json({message:'Unauthorized'})
        }else{
            const backendResponse = await APICaller(req,'GetHelpCachReceipts',{CustomerUID:customerUID , LoginToken:token})
            console.log(backendResponse , 'this is get receip data');
            if(backendResponse?.length>0){
                return res.status(200).json({data:backendResponse})
            }else{
                return res.status(503).json({message:'An error occured'})
            }
            
        }

    }catch(err){
        console.log(err,'this is receipt err');
        return res.status(500).json({message:'Server error'})
    }
}