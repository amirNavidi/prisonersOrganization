import  {APICaller}  from "../../utilities/APICaller";
import type { NextApiRequest, NextApiResponse } from 'next';
import { StatusCode , StatusMessage } from '../../Types/statusManager';

export default async function handler (req:NextApiRequest,res:NextApiResponse){

    interface BodyType {
        CustomerUID: string;
        LoginToken: string;
        FromUID:string;
        ToUID:string;
        TransferType:string;
        Amount:string;
        AccountKind:string;
      }

    const {CustomerUID,LoginToken,FromUID,ToUID,TransferType,Amount,AccountKind}:BodyType=req.body;
    try{
      if(!CustomerUID||!LoginToken||!FromUID||!ToUID||!TransferType||!Amount||!AccountKind){
        return  res.status(StatusCode.UNAUTHORIZED).json({message:StatusMessage[StatusCode.UNAUTHORIZED]})
      }else{
        const backendResponse =await APICaller(req,'SetWalletMoneyTransferPrison',{CustomerUID,LoginToken,FromUID,ToUID,TransferType,Amount,AccountKind})
        console.log(backendResponse,"set wallet transfer result");
        return res.status(StatusCode.SUCCESS).json({message:StatusCode.SUCCESS,data:backendResponse[0].TransactionReceiptUID});
      }
    }catch(err){
        return res.status(StatusCode.SERVER_UNAVAILABLE).json({message:StatusMessage[StatusCode.SERVER_UNAVAILABLE]})
    }
}