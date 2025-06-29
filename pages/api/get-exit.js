import  {APICaller}  from "../../utilities/APICaller";

export default async function handler (req,res){
    const {token , customerUID} =req.body;
     try{
         if(token &&customerUID){
              const backendResponse = await APICaller(req , 'GetExit',{CustomerUID:customerUID , LoginToken:token,TokenType:'10'})
              console.log(backendResponse ,"this is backend log"); 
            if(backendResponse=='Login Token is Exit'){
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