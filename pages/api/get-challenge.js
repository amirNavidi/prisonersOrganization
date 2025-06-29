import  {APICaller}  from "../../utilities/APICaller";
export default async function handler(req,res){
    const {challengeUID} =req.body;
    try{
      const backendResponse =await APICaller(req,'GetChallenges',{"ChallengeUID":challengeUID});
      console.log(backendResponse , 'this is response cahllenge');
      if(backendResponse){
        return res.status(200).json({message:'OK',backendResponse})
      }else{
        return res.status(503).json({message:'An error ocurred'})
      }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'})

    }
}