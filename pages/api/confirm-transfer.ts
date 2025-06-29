import  {APICaller}  from "../../utilities/APICaller";
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCode , StatusMessage } from '../../Types/statusManager';


interface BodyType {
    PaymentGatewayUID: number;
    TransactionReceiptUID: number;
    LoginToken:string;
    CustomerUID:string;
    IsUnknown:number
  }

  export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const { PaymentGatewayUID, TransactionReceiptUID , LoginToken, CustomerUID  , IsUnknown} :BodyType = req.body;
    try{
        const result =await APICaller(req,'SetConfirmTransfer',{ PaymentGatewayUID, TransactionReceiptUID , LoginToken, CustomerUID  ,IsUnknown})
        if(result[0].Reault){
            return res.status(StatusCode.SUCCESS).json({message:StatusMessage[StatusCode.SUCCESS],statusCode:StatusCode.SUCCESS})
        }else{
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message:StatusMessage[StatusCode.INTERNAL_SERVER_ERROR]})
        }
    }catch(err){
        return res.status(StatusCode.SERVER_UNAVAILABLE).json({message:StatusMessage[StatusCode.SERVER_UNAVAILABLE]})
    }
  }