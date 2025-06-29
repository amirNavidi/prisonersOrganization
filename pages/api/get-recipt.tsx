import  {APICaller}  from "../../utilities/APICaller";
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCode , StatusMessage } from '../../Types/statusManager';


interface BodyType {
    CustomerUID:string,
    LoginToken:string,
    TransactionReceiptUID:string
  }
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const { CustomerUID, LoginToken , TransactionReceiptUID } :BodyType = req.body ;
    console.log(CustomerUID , LoginToken , TransactionReceiptUID,"recipt values");

   try{
      if(!CustomerUID || !LoginToken || !TransactionReceiptUID){
        return res.status(StatusCode.UNAUTHORIZED).json({message:StatusMessage[StatusCode.UNAUTHORIZED]})
      }else{
         const result =await APICaller(req,'GetTransactionReceipt',{CustomerUID , LoginToken , TransactionReceiptUID})
         console.log(result ,"this is location result");
         return res.status(StatusCode.SUCCESS).json({message:StatusMessage[StatusCode.SUCCESS],data:result})
      }
   }catch(err){
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message:StatusMessage[StatusCode.INTERNAL_SERVER_ERROR],error:err})
   }

}