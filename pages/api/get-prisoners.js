import  {APICaller}  from "../../utilities/APICaller";

export default async function handler(req , res){
    const PrisonerUID =req.body.Prisoner?req.body.Prisoner:null;
    const PrisonerGender =req.body.PrisonerGender?req.body.PrisonerGender:null;
    const PrisonerCity =req.body.PrisonerCity?req.body.PrisonerCity:null;
    const filter =false;
    const filterItem =()=>{
        if(PrisonerGender&&PrisonerCity){
            return filter=true
        }
    }
    filterItem();
    console.log(filter , "thi is filter in prosoners");
    
     try{
        const backendResponse = await APICaller(req,'GetPrisoners',{'PrisonerUID':PrisonerUID});
        if(backendResponse){
            return res.status(200).json({message:'OK',backendResponse})
        }else{
            return res.status(503).json({message:'An error occured'})
        }
     }catch(err){
        console.log(err,'get prisoners err');
        return res.status(500).json({message:'Server error'})        
     }
}