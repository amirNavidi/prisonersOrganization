import Image from "next/image";
import { Progress } from "@radix-ui/react-progress";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import BaleLogo from '../public/images/bale.svg';
import EtaLogo from '../public/images/eta.svg';
import { FormatNumber } from "../utilities/tomanSeprator";
import PulseLoader from "react-spinners/PulseLoader";
import TokenChecker from "../utilities/TokenChecher";
import { errorToast } from "../Template/ToastifyT";

const ChoosingChallengeC = () => {
    const [price , setPrice] =useState();
    const [err , setErr] =useState('');
    const [load , setLoad] =useState(false);
    const CustomerUID = Cookies.get('CustomerUID');
    const token =Cookies.get('token');
    const priceChange = (ev) => {
        const inputValue = ev.target.value;

        const numericValue = inputValue.replace(/[^0-9]/g, '');


        if (!isNaN(numericValue)) {
            setPrice(FormatNumber(numericValue));
        }
    };
    const router = useRouter();

    const [challenge, setChallenge] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const ChallengeUID =Cookies.get('ChallengeUID');
    useEffect(()=>{
        const getChallengeDetail =async()=>{
            const result =await fetch('/api/get-challenge',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({ChallengeUID})
            })
            const data = await result.json();
            console.log(data);

            setChallenge(data.backendResponse);
            setIsLoading(false);
        }
        getChallengeDetail();
    },[])

    console.log(challenge,'this is challenge');


    if (isLoading) {
        return   <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
                    <PulseLoader
                        color="#1f7e64"
                        margin={5}
                        size={23}
                        />
                 </div>;
    }

    const {
        CompanyName,
        ChallengeName,
        ChallengePrice,
        ChallengeDate,
        ChallengeImage,
        ChallengeDateName,
        PrisonerDebts,
        countHelper,
        HelpPrice,
        PercentDebt,
        PrisonerCount,
        PrisonerNumber,
    } = challenge[0];
    console.log(challenge,"this is description obout challenge");





    const openAppOrWebsite = (app) => {
        const baseURL = `https://77.104.81.93:8081/choosing-challenge?challenge=${ChallengeUID}`;

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


    const copyLinkToClipboard = () => {
    const link = `https://77.104.81.93:8081/choosing-challenge?challenge=${ChallengeUID}`;
    navigator.clipboard.writeText(link)
        .then(() => {
        })
        .catch((err) => {
            console.error("خطا در کپی کردن لینک: ", err);
        });
    };
     const checkToken =async ()=>{
        const isValid = await TokenChecker(CustomerUID , token , 'ChoosingChallenge' );
            if(isValid.status==200){
                router.push('/choosing-challenge/payment-details');
            }else{
                router.push('/phonenumberlogin');
            }
        }
    const moneyTransfer =async ()=>{
        if(token){
            const result =await fetch('/api/set-wallet-money-transfer',{
                method:'POST',
                headers: { 'Content-Type':'application/json' },
                body:JSON.stringify({
                    "CustomerUID":CustomerUID,
                    "LoginToken":token,
                    "FromUID":CustomerUID,
                    "ToUID":ChallengeUID,
                    "TransferType":"11",
                    "Amount":price.replace(/[^0-9]/g, ''),
                    "AccountKind":"1"
                })
            })
            if(result.status==200){
                const response =await result.json();
                Cookies.set("TransactionReceiptUID",response.data);
                router.push('/choosing-challenge/payment-details');

            }else{
                if(result.status==503){
                    Cookies.remove('token')
                    router.push('/phonenumberlogin')
                }else{
                    setLoad(false);
                    errorToast("خطا");
                }
            }

        }else{
            router.push('/phonenumberlogin');
        }
    }

    const clickHandler =()=>{
        if(!price){
            setErr('ابتدا مبلغ را وارد نمایید');
        }else{
            if(price==0){
                setErr('مبلغ صحیح نمی باشد');
            }else{
                setLoad(true)
                return moneyTransfer()

            }
        }
    }
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
        <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-start  mx-4 xl:mx-[120px] mt-10 mb-28 ">
            <div className="w-11/12 md:w-[47%]  bg-white shadow-lg rounded-[16px] overflow-hidden">
            <div className="relative w-[100%] h-[150px]  lg:h-[220px] ">
                <img src={ChallengeImage} style={{ width: '100%', height: '100%' }} />
            </div>
              <div className="p-5">

               <div className="flex justify-between items-center">
                <div className="my-5 text-[20px] text-secondary700">
                   <span> کمک به {ChallengeName}</span>
                </div>
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
               {
                CompanyName &&
                <div className="flex mb-6 items-center">
                    {/* <div className="ml-3 border-2 relative w-7 h-7 rounded-full overflow-hidden">
                        <Image alt="Some Alt" fill style={{ objectFit: 'cover' }} className="object-cover" />
                    </div> */}
                    <div className="flex text-[14px] text-secondary600">
                        <span className="ml-1"> توسط </span>
                        <span>{CompanyName} ایجاد شده</span>
                    </div>
                </div>
               }
          {/* description------------------------ */}
            <sp className="text-secondary600 text-sm my-4">وی پدر دو فرزند خردسال است و به‌دلیل ضمانت برای یکی از نزدیکانش، ناخواسته درگیر یک بدهی سنگین شده. با اینکه هیچ سوءنیتی در کار نبوده، اما ناتوانی در پرداخت بدهی، او را راهی زندان کرده. همسرش با درآمد اندک تلاش می‌کند زندگی را اداره کند، اما بدون کمک دیگران، امکان بازگشت وی به خانه و زندگی‌اش وجود ندارد.</sp>
                <div className="flex justify-between my-4">
                    <div>
                        {/* <span>{FormatNumber(PrisonerDebts)}</span>
                        <span className="mr-3">ریال</span> */}
                        کمک های مردمی
                    </div>
                    <span>{PercentDebt}%</span>
                </div>

                {/* Progress bar-------------------------- */}
                <Progress className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary300" style={{ width: `${PercentDebt}%` }}></div>
                </Progress>

                {/* amount box----------------------------- */}
                <div className="flex flex-col my-8">
                    {/* <div className="flex justify-between text-[14px] lg:text-[20px] mb-8">
                        <span>مبلغ جمع آوری شده تا امروز</span>
                        <div>
                            <span>{FormatNumber(HelpPrice)}</span>
                            <span className="mr-3">ریال</span>
                        </div>
                    </div> */}

                    <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>مبلغ باقی مانده مانده</span>
                        <div>
                            <span>{FormatNumber(PrisonerDebts-HelpPrice)}</span>
                            <span className="mr-3">ریال</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>کل مبلغ</span>
                        <div>
                            <span>{FormatNumber(PrisonerDebts)}</span>
                            <span className="mr-3">ریال</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>مبلغ جمع آوری شده</span>
                        <div>
                            <span>{FormatNumber(HelpPrice)}</span>
                            <span className="mr-3">ریال</span>
                        </div>
                    </div>

                    <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>تعداد حامیان تا این لحظه</span>
                        <div>
                            <span>{countHelper}</span>
                            <span className="mr-3">نفر</span>
                        </div>
                    </div>
                </div>

                <hr className="h-0 border-b border-dashed border-primary300" />
                <div className='my-4 flex flex-col justify-between'>
                    <span className="mb-8 text-primary600 ">جزئیات :</span>
                    {/* <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>تاریخ شروع چالش</span>
                        <span className="text-black font-semibold">{ChallengeDateName} </span>
                    </div> */}
                    <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>تاریخ پایان چالش</span>
                        <span className="">{ChallengeDateName?ChallengeDateName:ChallengeDate} </span>
                    </div>
                  </div>
                </div>
            </div>

            {/* price bar --------------------------- */}
            <div className="w-11/12 md:w-[47%] flex flex-col items-center mt-10  lg:mt-0 p-5 bg-white shadow-lg rounded-[16px] ">
                <span className='block text-center text-[20px] font-medium mb-10'>مبلغ مورد نظر را وارد نمایید</span>
                <div  className="relative flex items-center border w-8/12 h-[55px] overflow-hidden border-primary200 rounded-[12px]">
                    <input onChange={priceChange} value={price} className="border-none outline-none w-full h-full px-2"/>
                    <small className='absolute left-2 '>ریال</small>
                </div>
                <div className="relative justify-between flex items-center mt-10 w-10/12 h-[55px] overflow-hidden rounded-[12px]">
                    <button onClick={()=>setPrice(FormatNumber(5000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>5.000 ریال</button>
                    <button onClick={()=>setPrice(FormatNumber(10000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>10.000 ریال</button>
                    <button onClick={()=>setPrice(FormatNumber(20000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>20.000 ریال</button>
                </div>
                <div className="flex flex-col items-center">
                    <button onClick={clickHandler} className='w-[160px] mt-10 mb-3 bg-primary400 rounded-[10px] text-white  h-[58px]'>
                        پرداخت
                    </button>
                    <span className="text-[12px] text-red-500 mb-10">{err}</span>
                </div>

            </div>
        </div>
    );
};

export default ChoosingChallengeC;
