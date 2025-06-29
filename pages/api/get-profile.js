import  {APICaller}  from "../../utilities/APICaller";

export default async function handler (req , res){
    try{
        const {customerUID,LoginToken} =req.body;
        console.log(customerUID,LoginToken,"body of get profile");
        
        if(!customerUID || !LoginToken){
            return res.status(417).json({message:'Unouthorized'})
        }else{
            const backendResponse = await APICaller(req ,'GetProfile',{CustomerUID:customerUID , LoginToken})
            console.log(backendResponse,"this is getProfile backend response");
            return res.status(200).json({message:'Its OK',data:backendResponse })
        }
    }catch(err){
        console.log(err,"get profile server error");
        return res.status(500).json({message:'Server error'});
    }
}