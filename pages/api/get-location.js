import  {APICaller}  from "../../utilities/APICaller";

export default async function (req , res){
try{
    const {location}=req.body;
    const provinces = req.body.ProvinceID ? req.body.ProvinceID :null
    const backendResponse =await APICaller(req ,location,provinces&&{ProvinceID:provinces});

    
    console.log(backendResponse ,"this is location log");
    
    if(backendResponse){
        return res.status(200).json({data:backendResponse});
    }else{
        return res.status.json({message:'An error occured'});
    }        
}catch(err){
        console.log(err , 'get Province err');
        return res.status(500).json({message:'Server error'});
    }
}

