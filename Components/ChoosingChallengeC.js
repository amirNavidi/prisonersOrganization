'use client'

import Image from "next/image";
import { Progress } from "@radix-ui/react-progress";
import { useEffect, useState , useRef } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import BaleLogo from '../public/images/bale.svg';
import EtaLogo from '../public/images/eta.svg';
import { FormatNumber } from "../utilities/tomanSeprator";
import PulseLoader from "react-spinners/PulseLoader";
import TokenChecker from "../utilities/TokenChecher";
import { errorToast } from "../Template/ToastifyT";
import LeftBoxInSupportationDetailsT from '../Template/LeftBoxInSupportationDetailsT' ;
import FilterParentT from '../Template/FilterParentT';
import FilterProvider from '../Template/useContext/filterContext';
import ShareComponentC from "./ShareComponentC";
import Link from "next/link";


const ChoosingChallengeC = () => {
    const [price , setPrice] =useState();
    const [err , setErr] =useState('');
    const [load , setLoad] =useState(false);
    const CustomerUID = Cookies.get('CustomerUID');
    const token =Cookies.get('token');
    const scrollTargetRef = useRef(null);
    const mobileFooterRef = useRef(null);
    const [showFooter, setShowFooter] = useState(true);
    const [ showVal , setShowVal ] =useState(false);

    useEffect(() => {
    const mainPayButton = document.getElementById('main-pay-button');
    const fixedPayButton = document.getElementById('fixed-pay-button');

    if (!mainPayButton || !fixedPayButton) return;

    const checkVisibility = () => {
        const rect = mainPayButton.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            fixedPayButton.style.display = 'none';
        } else {
            fixedPayButton.style.display = 'flex';
        }
    };

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);


    checkVisibility();

    return () => {
        window.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('resize', checkVisibility);
    };
    }, []);


    const priceChange = (ev) => {
        const inputValue = ev.target.value;

        const numericValue = inputValue.replace(/[^0-9]/g, '');


        if (!isNaN(numericValue)) {
            setPrice(FormatNumber(numericValue));
        }
    };
    const router = useRouter();
    // useEffect(() => {
    //     const handleScroll = () => {
    //       if (!scrollTargetRef.current || !mobileFooterRef.current) return;

    //       const targetPosition = scrollTargetRef.current.getBoundingClientRect().top;
    //       if (targetPosition < 100) {
    //         setShowFooter(false);
    //       } else {
    //         setShowFooter(true);
    //       }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    //   }, []);


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
    const [pageContent , setPageContent] =useState(1);
    const [isLogin , setIsLogin]=useState()







    const pathname =router.pathname;

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
              setIsLogin(true);
            }else{
                setIsLogin(false);
                // router.push('/phonenumberlogin');
            }
        }
    useEffect(()=>{
        checkToken();
    },[])


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
    const handleScrollToTarget = () => {
        console.log(window.outerHeight ,'outer height');
        console.log(window.innerHeight ,'inner height');


        if(scrollTargetRef.current){
            scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' , block: 'center'});

        }
      };


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


    const shareHandler=()=>{
        setShowVal(true);
        setPageContent(1);
    }

    const [showLoginMsg , setShowLoginMsg]=useState(false);
    const inviteHandler=()=>{
        if(isLogin){
            setShowVal(true);
            setPageContent(2);
        }else{
            setShowLoginMsg(true)
        }
    }



    if(isLoading ||  !challenge ){
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


    return (
        <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-start  mx-4 xl:mx-[120px] mt-10 mb-28 ">
            <div className="w-11/12 md:w-[47%]  bg-white shadow-lg rounded-[16px] overflow-hidden border border-black">
             {
                 pathname.includes('/profile/see-my-challenge-details')&&
                  <div className='w-full h-10 flex justify-between p-3 bg-white '>
                           <div className='flex items-center text-xs'>
                                <span className='flex justify-center items-center w-7 h-7 rounded-full p-1 bg-primary500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                                            <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} color="white">
                                                <path d="M14.98 7.016s.5.5 1 1.5c0 0 1.589-2.5 3-3M9.995 2.021c-2.499-.105-4.429.182-4.429.182c-1.219.088-3.555.77-3.555 4.762c0 3.956-.025 8.834 0 10.779c0 1.188.736 3.96 3.282 4.108c3.095.18 8.67.219 11.228 0c.684-.039 2.964-.576 3.252-3.056c.299-2.57.24-4.355.24-4.78"></path>
                                                <path d="M22 7.016c0 2.761-2.24 5-5.005 5a5 5 0 0 1-5.005-5c0-2.762 2.241-5 5.005-5a5 5 0 0 1 5.005 5m-15.02 6h4m-4 4h8"></path>
                                            </g>
                                        </svg>
                                </span>
                                <span className="mr-2">تایید شده در تاربخ </span>
                                <span className='text-secondary600'>N</span>
                            </div>
                            <div>
                                <span className="inline-block w-2 h-2 rounded-full bg-primary400"></span>
                                <span className="mr-1 text-xs text-secondary600">فعال</span>
                            </div>
                  </div>

            }
            <div className="relative w-[100%] h-[150px]  lg:h-[220px] ">
                <img src={ChallengeImage} style={{ width: '100%', height: '100%' }} />
            </div>
              <div className="p-5">

               <div className="flex justify-between items-center">
                <div className="my-5 text-[20px] text-secondary700">
                   <span> کمک به {ChallengeName}</span>
                </div>
                {/* <div className='flex justify-end'>
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
                </div> */}
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


            {
                pathname.includes('profile')?<div className="w-11/12 md:w-[47%] flex flex-col items-center mt-10  lg:mt-0  bg-white shadow-lg rounded-[16px] ">
                  <LeftBoxInSupportationDetailsT data={challenge[0]} />
                </div>:

                <div className="w-11/12 md:w-[47%] border border-black flex flex-col items-center mt-10  lg:mt-0 p-5 bg-white shadow-lg rounded-[16px] ">
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
                        <button id="main-pay-button" ref={scrollTargetRef} onClick={clickHandler} className='w-[160px] mt-10 mb-3 bg-primary500 rounded-[10px] text-white  h-12'>
                            پرداخت
                        </button>
                        <span className="text-[12px] text-red-500 mb-10">{err}</span>
                    </div>

                    <hr className="w-full border-2 border-primary200 border-dashed ml-[-16px] mr-[-16px]"/>

                    <div className="flex flex-col">
                        <span className="text-primary500 mt-14 mb-4">اشتراک گذاری</span>
                        <p className="text-sm text-secondary600 mb-12">
                            در اشتراک‌گذاری عادی صرفاً لینک پویش را منتشر می‌کنید، اما با "دعوت به حمایت" می‌توانید تأثیر خود را از طریق مشاهده تعداد حامیان و مبالغ جذب‌شده دنبال کنید.
                        </p>
                        <div className="flex justify-between mb-5 ">
                            <button onClick={shareHandler} className="w-[48%] h-12 rounded-lg text-primary500 border border-primary500">اشتراک گذاری</button>
                            <button onClick={inviteHandler} className="w-[48%] h-12 rounded-lg text-white bg-primary500">دعوت به حمایت</button>
                        </div>
                        {
                        showLoginMsg&&
                                <div className="text-secondary500 text-sm flex">
                                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                        <path fill="#6bb19e" d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4M11 8v2h1V8zm0 4v5h1v-5z" strokeWidth={0.7} stroke="#6bb19e"></path>
                                    </svg>
                                    ابتدا وارد <Link href={'/phonenumberlogin'} className="font-semibold text-primary500 hover:text-primary600 mx-1"> حساب کاربری</Link> خود شوید.
                                </div>
                        }

                </div>

                    {
                        showVal&&<FilterProvider isLogin={{isLogin}} wichPage={{pageContent , setPageContent}} showVal={{showVal , setShowVal}}>
                                        <FilterParentT>
                                            <ShareComponentC />
                                        </FilterParentT>
                                 </FilterProvider>
                    }

                </div>
            }

            {/* mobile area----------------- */}
            <div id="fixed-pay-button"  className="fixed  right-0 bottom-0 flex justify-center items-center w-full h-20 bg-white md:hidden">
                <button onClick={handleScrollToTarget} className="h-12 w-[48%] bg-primary500 text-white text-sm rounded-lg">
                        پرداخت
                </button>
            </div>

        </div>
    );
};

export default ChoosingChallengeC;
