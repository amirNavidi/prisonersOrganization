import Image from 'next/image';
import BaleLogo from '../public/images/bale.svg';
import EtaLogo from '../public/images/eta.svg';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { FormatNumber } from '../utilities/tomanSeprator';
import TokenChecker from '../utilities/TokenChecher';
import PulseLoader from "react-spinners/PulseLoader";



const SuccessPayC = () => {


    // validation---------------------------------
    const router=useRouter();
    const [load , setLoad] =useState(true);
    const CustomerUID = Cookies.get('CustomerUID');
    const token =Cookies.get('token');
    const TransactionReceiptUID =Cookies.get('TransactionReceiptUID');

    useEffect(()=>{
        const checkToken =async ()=>{
           const isValid = await TokenChecker(CustomerUID , token , 'SuccessPay' );
           if(isValid.status==200){
             setLoad(false);
           }else{
              router.push('/')
           }
        }

        checkToken();
    },[])

    const pathname =router.pathname;
    const ObjectUID = Cookies.get('ObjectUID');
    const PageName = Cookies.get('PageName');

        const [factor , setFactor] =useState({
            CustomerName :'',
            Date:'',
            Price:'',
            detailName:'',
            PayID:''
        })
    const { CustomerName,Date,Price,detailName,PayID} =factor;


    const openAppOrWebsite = (app) => {
        const baseURL = `https://77.104.81.93:8081/success-pay?factor=${ObjectUID}`;

        const appURLs = {
            bale: `balad://share?text=${encodeURIComponent(baseURL)}`,
            eta: `eitaa://share?text=${encodeURIComponent(baseURL)}`
        };

        const webURLs = {
            bale: "https://bale.ai",
            eta: "https://eitaa.com/"
        };

        const appURL = appURLs[app] || '';
        const webURL = webURLs[app] || baseURL;


        const isAppInstalled = (url) => {
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = url;
            document.body.appendChild(iframe);

            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 5000);
        };
        isAppInstalled(appURL);
        window.location.href = webURL;
    };

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
             Date:data.data[0].TransactionReceiptConfirmDate,
             Price:data.data[0].Amount,
             detailName:data.data[0].ToTitle,
             PayID:data.data[0].TransactionReceiptNumber
            })
        }
      }
      useEffect(()=>{
         getRecipt();
       },[])

    const copyLinkToClipboard = () => {
    const link = `https://77.104.81.93:8081/choosing-challenge??factor=${ObjectUID}`;
    navigator.clipboard.writeText(link)
        .then(() => {
        })
        .catch((err) => {
            console.error("خطا در کپی کردن لینک: ", err);
        });
    };
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
        <div className='flex flex-col items-center '>
            <div className='mt-10 mb-5 flex flex-col items-center'>
                <div className='flex justify-center  mb-4 items-center rounded-full w-[56px] h-[56px] bg-[#49C267]'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="#fff" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg>
                </div>
                <span className='mb-5 text-[20px] text-[#49C267]'>
                    پرداخت با موفقیت انجام شد
                </span>
                <span className='text-[16px] text-secondary600 '>
                    خیر گرامی با تشکر از یاری و همکاری شما
                </span>
            </div>
            <div className='flex flex-col mb-12 w-11/12 md:w-8/12 lg:w-6/12 px-11 pt-5 rounded-[16px] border-2 border-primary50 '>
                 <div className='flex justify-between my-5 text-[16px] text-secondary700'>
                    <span>
                        نام بانی
                    </span>
                    <span>
                        {CustomerName}
                    </span>
                 </div>
                 <div className='flex justify-between my-5 text-[16px] text-secondary700'>
                    <span>
                        به دلیل
                    </span>
                    <span>
                        {detailName}
                    </span>
                 </div>
                 <div className='flex justify-between my-5 text-[16px] text-secondary700'>
                    <span>
                        مبلغ
                    </span>
                    <div>
                        <span>
                            {FormatNumber(Price)}
                        </span>
                       {Price&& <span>
                            ریال
                        </span>}
                    </div>
                 </div>
                 <div className='flex justify-between my-5 text-[16px] text-secondary700'>
                    <span>
                        تاریخ و ساعت
                    </span>
                    <span style={{direction:'ltr'}}>
                        {Date}
                    </span>
                 </div>
                 <div className='flex justify-between my-5 text-[16px] text-secondary700'>
                    <span>
                        شماره پیگیری
                    </span>
                    <span>
                        {PayID}
                    </span>
                 </div>
                 <div className='flex justify-end mt-5'>
                    <div className='h-20 mt-4 flex flex-col justify-between'>
                        <div className='flex justify-end'>
                            <button onClick={() => openAppOrWebsite('bale')} className="flex cursor-pointer items-center justify-center ml-2 border border-primary200 rounded-md p-1">
                                <Image src={BaleLogo} width={20} height={20} />
                            </button>
                            <button onClick={() => openAppOrWebsite('eta')} className="flex cursor-pointer items-center justify-center ml-2 border border-primary200 rounded-md p-1">
                                <Image src={EtaLogo} width={20} height={20} />
                            </button>
                            <button onClick={copyLinkToClipboard} className="flex cursor-pointer items-center justify-center ml-2 border border-primary200 rounded-md p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#B0C7F5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g></svg>
                                <span>کپی لینک</span>
                            </button>
                        </div>
                    </div>
                 </div>

            </div>
        </div>
    );
};

export default SuccessPayC;
