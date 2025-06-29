import { StatusCode, StatusMessage } from "../../Types/statusManager";
import { APICaller } from "../../utilities/APICaller";
import { NextApiRequest , NextApiResponse } from "next";


interface BodyType {
    LoginToken:string;
    CustomerUID :string;
    ChallengeUID:string;
    IsExpiredChallenge:string;
    IsVerified:string;
    IsActive:string;
}


export default async function handler(req:NextApiRequest , res:NextApiResponse){
    const {LoginToken, CustomerUID , ChallengeUID,IsExpiredChallenge,IsVerified,IsActive}:BodyType=req.body;
    try{
        if(!LoginToken){
            return res.status(StatusCode.UNAUTHORIZED).json({message:StatusMessage[StatusCode.UNAUTHORIZED]})
        }else{
            const result =await APICaller(req , "GetChallengeByUser" , {LoginToken,CustomerUID ,ChallengeUID,IsExpiredChallenge,IsVerified,IsActive});
            console.log(result,"this is profile challenge result");

            if(result){
                return res.status(StatusCode.SUCCESS).json({message:StatusMessage[StatusCode.SUCCESS],data:result});
            }else{
                return res.status(StatusCode.SERVER_UNAVAILABLE).json({message:StatusMessage[StatusCode.SERVER_UNAVAILABLE]})
            }
        }
    }catch(err){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message:StatusMessage[StatusCode.INTERNAL_SERVER_ERROR]})
    }
}