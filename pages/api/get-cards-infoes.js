import  {APICaller}  from "../../utilities/APICaller";

export default async function handler(req,res) {
    const {TypeHelpCategory}=req.body;
    try{
        const backendResponse =await APICaller(req, 'GetTypeHelps',{TypeHelpCategory})
        return res.status(200).json({message :' OK ' ,backendResponse})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'})
    }
}