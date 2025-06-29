import  {APICaller}  from "../../utilities/APICaller";
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCode , StatusMessage } from '../../Types/statusManager';


interface BodyType {
    CityID: number;
    ProvinceID: number;
  }
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const { ProvinceID, CityID } :BodyType = req.body ;
   try{
      if(!ProvinceID || !CityID){
        return res.status(StatusCode.UNAUTHORIZED).json({message:StatusMessage[StatusCode.UNAUTHORIZED]})
      }else{
         const result =await APICaller(req,'GetCommunitys',{ProvinceID , CityID})
         console.log(result ,"this is location result");
         return res.status(StatusCode.SUCCESS).json({message:StatusMessage[StatusCode.SUCCESS],data:result})
      }
   }catch(err){
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message:StatusMessage[StatusCode.INTERNAL_SERVER_ERROR],error:err})
   }

}