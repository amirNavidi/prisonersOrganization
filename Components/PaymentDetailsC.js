import { useEffect, useState } from "react";
import bankLogo from '../public/images/Parsian.png'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { errorToast } from "../Template/ToastifyT";
import TokenChecker from "../utilities/TokenChecher";
import PulseLoader from "react-spinners/PulseLoader";

export default function PaymentDetailsC() {
    const ObjectUID =Cookies.get('ObjectUID');
    const CustomerUID = Cookies.get('CustomerUID');
    const token =Cookies.get('token');
    const TransactionReceiptUID =Cookies.get('TransactionReceiptUID');
    const router=useRouter();
    let pathname =router.pathname;
    const [selected, setSelected] = useState(false);
    const [load , setLoad] =useState(false);
    const [howPay , setHowPay]=useState(0)
    const howIsPay =(type)=>{
           setHowPay(type);
    }
    const [checked, setChecked] = useState(false);
    const [err , setErr]=useState('');
    const handleChange = () => {
        setChecked(!checked);
        setErr('');
      };

      const isComplited =Cookies.get('IsComplited');
      const [allowed , setAllowed] =useState(false);
      const checkToken =async ()=>{
        setLoad(true)
        const isValid = await TokenChecker(CustomerUID , token , 'PrisonersDetail' );
        if(isValid.status==200){
            setAllowed(true)
            setLoad(false)
        }else{
            setAllowed(false);
            router.push('/phonenumberlogin');
        }
    }

    const [factor , setFactor] =useState({
        CustomerName :'',
        Date:'',
        Price:'',
        detailName:'',
        PayID:''
    })
    const { CustomerName,Date,Price,detailName,PayID} =factor;
      const getRecipt =async()=>{
        const result = await fetch("/api/get-recipt",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            "CustomerUID":CustomerUID,
            "LoginToken":token,
            "TransactionReceiptUID":TransactionReceiptUID
          })
        })
        const data =await result.json();
        console.log(data.data[0] , "recipt data");

        if(data){
            setFactor({
             CustomerName :data.data[0].FromTitle,
             Date:data.data[0].TransactionReceiptDate,
             Price:data.data[0].Amount,
             detailName:data.data[0].ToTitle,
             PayID:data.data[0].TransactionReceiptNumber
            })
        }
      }


      useEffect(()=>{
        checkToken();
        getRecipt();
      },[])

      const [gateWay, setGateWay] =useState(1)
      const gateWayHandler=(ev)=>{
         setSelected(true);
         setGateWay(ev.target.value)
      }
      const confirmTransfer=async()=>{
         if(allowed){
            const result =await fetch('/api/confirm-transfer',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    CustomerUID,
                    LoginToken:token,
                    TransactionReceiptUID:TransactionReceiptUID,
                    PaymentGatewayUID:gateWay,
                    IsUnknown:howPay
                })
            })
            const data =await result.json();
            return data.statusCode;

         }else{
            errorToast('ابتدا وارد حساب کاربری خود شوید')
         }

      }

      const payHandler=async()=>{
        if(!checked){
            setErr('لطفا موافقت خود با قوانین را اعلام بفرمایید');
         }else{
            setErr('');
           const allowPay=await confirmTransfer();
           if(allowPay==200){
                if(pathname=='/prisoners-detail/payment-details'){
                    router.push({
                        query:ObjectUID,
                        pathname:'success-pay'
                    })
                }else if(pathname=='/choosing-challenge/payment-details'){
                    router.push({
                        query:ObjectUID,
                        pathname:'success-pay'
                    })
                }
           }
         }
    }
    const [nature , setNature]=useState(1)

    if(load){
        return (
            <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
                   <PulseLoader
                    color="#1f7e64"
                    margin={5}
                    size={23}
                    />
            </div>
        )
    }

    return (
       <div className='flex lg:flex-row lg:justify-between lg:mb-5 flex-col lg:mx-[120px] mx-4 mb-28 '>
           <div className='flex flex-col w-full lg:w-[65%] '>
               <div className="border-2 px-5 mt-5 h-[220px] rounded-[16px] ">
                    <span className='block text-[20px] mt-5 mb-8'>اطلاعات رسید نیکو کاری</span>
                    <div className='flex justify-between my-4 text-[16px] text-secondary600'>
                       <span>کد پیگیری</span>
                       <span>{PayID}</span>
                    </div>
                    <div className='flex justify-between text-[16px] text-secondary600'>
                        <span>مبلغ</span>
                        <div><span>{Price}</span><span>ریال</span></div>
                    </div>
                    <div className='flex justify-between my-4 text-[16px] text-secondary600'>
                        <span>عنوان </span>
                        <span>{detailName}</span>
                    </div>

               </div>
               <div className='flex flex-col border-2 pr-5 h-[220px] my-5 rounded-[16px]'>
                    <span className='text-[20px] mt-5 mb-8'>درگاه پرداخت</span>
                <div
                    className=" flex flex-col justify-end items-start w-[50px] mb-8 cursor-pointer "
                    onClick={(ev) => gateWayHandler(ev)}
                    >
                    <Image src={bankLogo} className="h-10" alt="Logo" width={48} height={48} />
                    </div>
                    <div className='flex mt-3'>
                        <input
                            type="radio"
                            checked={gateWay==1&&true}
                            value={1}
                            onChange={(ev) => gateWayHandler(ev)}
                            className=" w-5 accent-blue-500 cursor-pointer"
                        /><label className='mr-2 text-[16px] text-secondary600'>بانک  پارسیان</label>
                    </div>
               </div>
           </div>
           {/* secoud parent------------- */}
           <div className='w-full flex flex-col items-center lg:w-[30%] h-[460px] rounded-[16px]  border-2 mt-5 px-4'>
                <span className=' block text-[20px] text-secondary600  mt-5 mb-12 ml-autp '>مشخصات نیکوکار</span>
                <div className="flex justify-center w-10/12 mb-5">
                            {/* <button onClick={()=>setNature(1)} className={`w-6/12 border border-primary400 h-[50px] rounded-xl rounded-l-none ${nature==1&& "text-white"} ${nature==1&& "bg-primary400"} `} >افراد حقیقی</button>
                            <button onClick={()=>setNature(2)} className={`w-6/12 border border-primary400 h-[50px] rounded-xl rounded-r-none ${nature==2&& "text-white"} ${nature==2&& "bg-primary400"} `} >افراد حقوقی</button> */}
                            <div className={`flex items-center justify-center w-6/12 border border-primary400 h-[50px] rounded-xl rounded-l-none ${nature==1&& "text-white"} ${nature==1&& "bg-primary400"} `} >افراد حقیقی</div>
                            <div className={`flex items-center justify-center w-6/12 border border-primary400 h-[50px] rounded-xl rounded-r-none ${nature==2&& "text-white"} ${nature==2&& "bg-primary400"} `} >افراد حقوقی</div>

                </div>
                <button style={{border:`1px solid ${howPay==0?'#5486ea':'#bfbfbf'}`}} onClick={()=>howIsPay(0)} className='flex justify-start items-center pr-5 rounded-[8px] w-[95%] h-[56px] mx-auto'>
                     <input  onChange={() => howIsPay(0)} checked={howPay==0?true:false} type="radio" className="cursor-pointer w-5 h-5"/><label style={{color:howPay==0?'#5486ea':'#bfbfbf'}} className={`cursor-pointer text-[12px] mr-2`}>میخواهم ناشناس پرداخت کنم </label>
                </button>
                <button style={{border:`1px solid ${howPay==1?'#5486ea':'#bfbfbf'}`}} onClick={()=>isComplited&&isComplited==1&&howIsPay(1)} className='flex my-8 justify-start items-center pr-5 rounded-[8px] w-[95%] h-[56px] mx-auto'>
                     <input disabled={(isComplited&&isComplited==0)?true:false} onChange={() => howIsPay(1)} checked={howPay==1?true:false} type="radio" className="cursor-pointer w-5 h-5"/><label style={{color:howPay==1?'#5486ea':'#bfbfbf'}} className={`cursor-pointer text-[12px] mr-2`}>میخواهم نام خودم نمایش داده شود </label>
                </button>

                {
                   isComplited&&isComplited==0&&
                   <p className='px-4 text-[12px] text-gray-500'>در صورت تمایل به ارسال نام خود <Link href={'/profile'}><span className='text-primary500 cursor-pointer'>اطلاعات کاربری</span></Link>  خود را تکمیل کنید.</p>
                }

                <button onClick={payHandler} className='bg-primary400 mt-10 mb-2  rounded-[10px] text-white w-6/12 h-[56px]'>
                      پرداخت
                </button>
                <span className='text-[12px] text-red-500 mb-4'>{err}</span>
                <div className="flex justify-center items-center mb-4 space-x-2 ">
                <input
                    type="checkbox"
                    id="terms"
                    checked={checked}
                    onChange={handleChange}
                    className="h-3 w-3 text-Base ml-2  border-gray-300 rounded focus:ring focus:ring-blue-300"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-700">
                        <Link href='/verification/costofverification/rules'><small className='text-primary500  underline underline-offset-4 text-[12px]'>کلیه قوانین و مقررات </small></Link> سایت را مطالعه کرده و پذیرفته ام.
                    </label>
                </div>
           </div>
       </div>
    );
  }
