import  {APICaller}  from "../../utilities/APICaller";

export default async function handler(req, res){
    try{
        const { customerUID , token ,PageName } =req.body;
        const backendData = await APICaller(req,'GetLoginTokenChecker',{CustomerUID:customerUID , LoginToken:token ,PageName})
        console.log(backendData ,'this is token checker backend data');
        
        if(backendData=='Login Token is Valid'){
            return res.status(200).json({message:'Valid' , status:200});
        }else{
            return res.status(503).json({message:'An error occured'});
        }
    }catch(err){
        console.log(err,'checker err');
        return res.status(500).json({message:'server error'});
    }
}
