import  {APICaller}  from "../../utilities/APICaller";
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCode , StatusMessage } from '../../Types/statusManager';




interface BodyType {
    ProvinceID:string;
    RangeList:string[];
  }
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {ProvinceID , RangeList} :BodyType = req.body ;
   try{
         const result =await APICaller(req,'GetCountPrisonDeptRanges',{ProvinceID , RangeList})
         if(result.Data){
            return res.status(StatusCode.SUCCESS).json({message:StatusMessage[StatusCode.SUCCESS],data:result})
         }else{
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message:StatusMessage[StatusCode.INTERNAL_SERVER_ERROR]})
         }
      }catch(err){
      return res.status(StatusCode.SERVER_UNAVAILABLE).json({message:StatusMessage[StatusCode.SERVER_UNAVAILABLE],error:err})
   }

}