import  {APICaller}  from "../../utilities/APICaller";

export default async function handler(req,res) {
    const {CustomerUID , LoginToken ,MobileNumber,BirthDate,NationalCode,FirstName}=req.body;
    console.log(CustomerUID , LoginToken ,MobileNumber,BirthDate,NationalCode,FirstName);
    try{
            const backendResponse =await APICaller(req,'SetProfile',{CustomerUID , LoginToken ,MobileNumber,BirthDate,NationalCode,FirstName})
            console.log(backendResponse,"this is backend response for set profile");
            if(backendResponse[0].Reault){
                return res.status(200).json({message:'ok',status:200})
            }else{
                console.log(backendResponse.data,"err log");
                return res.status(500).json({message:"An Error occure",err:backendResponse.data })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'An error occured'})
        
    }
}