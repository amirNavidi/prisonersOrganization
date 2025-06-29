import { StatusCode, StatusMessage } from "../../Types/statusManager";
import { APICaller } from "../../utilities/APICaller";
import { NextApiRequest , NextApiResponse } from "next";


interface BodyType {
   CustomerUID:string,
   ChallengeUID:string,
   LoginToken:string,
   ChallengeName:string,
   ChallengePrice:string,
   ChallengeFromDate:string,
   ChallengeFromDateName:string,
   ChallengeToDate:string,
   ChallengeToDateName:string,
   ChallengeType:string,
   ChallengeDescription:string,
   ChallengeImage:string,
   ChallengeCity:string|null,
   IsActive:boolean
}

export default async function handler(req:NextApiRequest , res:NextApiResponse){
    const {
           LoginToken,
           CustomerUID ,
           ChallengePrice ,
           ChallengeName ,
           ChallengeFromDate ,
           ChallengeFromDateName ,
           ChallengeToDate,
           ChallengeToDateName,
           ChallengeType ,
           ChallengeDescription ,
           ChallengeImage ,
           ChallengeCity,
           IsActive,
           ChallengeUID
        }:BodyType=req.body;

    try{
        if(!LoginToken){
            return res.status(StatusCode.UNAUTHORIZED).json({message:StatusMessage[StatusCode.UNAUTHORIZED]})
        }else{
            console.log(22222);

            const result =await APICaller(req , "SetChallenge" ,{
                LoginToken,
                CustomerUID ,
                ChallengePrice ,
                ChallengeName ,
                ChallengeFromDate ,
                ChallengeFromDateName ,
                ChallengeToDate,
                ChallengeToDateName,
                ChallengeType ,
                ChallengeDescription ,
                ChallengeImage ,
                ChallengeCity,
                IsActive,
                ChallengeUID
            })

            if(result){
                return res.status(StatusCode.SUCCESS).json({message:StatusMessage[StatusCode.SUCCESS] ,status:StatusCode.SUCCESS});
            }else{
                return res.status(StatusCode.SERVER_UNAVAILABLE).json({message:StatusMessage[StatusCode.SERVER_UNAVAILABLE]})
            }
        }
    }catch(err){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message:StatusMessage[StatusCode.INTERNAL_SERVER_ERROR]})
    }
}