import  {APICaller}  from "../../utilities/APICaller";
import { parse } from "cookie";

export default async function handler (req,res){
     const cookies = parse(req.headers.cookie || '');
     const token = cookies.token || null;
     const customerUID = cookies.CustomerUID || null;
     try{
         if(token &&customerUID){
              const backendResponse = await APICaller( req,'GetExit',{CustomerUID:customerUID , LoginToken:token,TokenType:'24'})
              console.log(backendResponse ,"this is backend log"); 
            if(backendResponse.response.status==200){
                return  res.status(200).json({message:'success exit',status:200})
            }else{
                return res.status(400).json({message:'An error occured'})
            }
         }else{
          return  res.status(417).json({message:'Unauthorized'})
         }
     }catch{
       return res.status(500).json({message:'An error occured'})
     }
}