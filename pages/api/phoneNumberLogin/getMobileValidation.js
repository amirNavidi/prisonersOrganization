import  {APICaller}  from "../../../utilities/APICaller";
// import { serialize } from 'cookie';
export default async function handler(req , res){
    const {CustomerMobile , ValidationCode} =req.body;
    if(req.method==='POST'){
        if(!CustomerMobile || !ValidationCode) {
            return res.status(400).json({message : "Bad Parameters"})
    }
      const backendResponse = await APICaller(req,"VerifyMobileCodePublic",{CustomerMobile,ValidationCode,"SendSMSType":"10"})

      console.log(backendResponse ," for test");

      if(backendResponse[0].CustomerUID){
        // const { code, CustomerUID } = backendResponse.data[0];
        // res.setHeader('Set-Cookie', [
        //   serialize('token', code, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24 ,
        //     path: '/',
        //   }),
        //   serialize('CustomerUID', CustomerUID, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24  ,
        //     path: '/',
        //   }),
        // ]);
        return res.status(200).json({status:200 , data:backendResponse})
      }else{
        return res.status(417).json({message:'an error acured'})
      }
  }
}