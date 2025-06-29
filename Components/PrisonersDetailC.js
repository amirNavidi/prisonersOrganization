// import Image from "next/image";
// import { Progress } from "@radix-ui/react-progress";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
// import BaleLogo from '../public/images/bale.svg';
// import EtaLogo from '../public/images/eta.svg';
// import { FormatNumber } from "../utilities/tomanSeprator";
// import PulseLoader from "react-spinners/PulseLoader";
// import TokenChecker from "../utilities/TokenChecher";
// import { errorToast } from "../Template/ToastifyT";

// const PrisonersDetailC = () => {

//     const [challenge , setChallenge] =useState([]);

//     const getChallenge =()=>{

//     }

//     const [price , setPrice] =useState();
//     const [load , setLoad] =useState(false);
//     const CustomerUID = Cookies.get('CustomerUID');
//     const token =Cookies.get('token');
//     const priceChange = (ev) => {
//         const inputValue = ev.target.value;

//         const numericValue = inputValue.replace(/[^0-9]/g, '');


//         if (!isNaN(numericValue)) {
//             setPrice(FormatNumber(numericValue));
//         }
//     };
//     const router = useRouter();
//     const Prisoner = Cookies.get('PrisonerUID');

//     const [prisoners, setPrisoners] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [err , setErr] =useState('');

//     useEffect(() => {
//         const getPrisoners = async () => {
//             const response = await fetch('/api/get-prisoners', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ Prisoner })
//             });
//             const data = await response.json();
//             setPrisoners(data.backendResponse);
//             setIsLoading(false);
//         };
//         getPrisoners();
//     }, [Prisoner]);

//     if (isLoading) {
//         return   <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
//                     <PulseLoader
//                         color="#1f7e64"
//                         margin={5}
//                         size={23}
//                         />
//                  </div>;
//     }

//     const {
//         CompanyName,
//         HelpPrice,
//         PercentDebt,
//         PrisonerDebtEndMonth,
//         PrisonerAge,
//         PrisonerCity,
//         PrisonerCondition = [],
//         PrisonerDebt,
//         PrisonerDebtDate,
//         PrisonerGender,
//         PrisonerNumber,
//         countHelper
//     } = prisoners[0];

//     const familyProblem = PrisonerCondition.filter(item => item.PrisonerConditionTypeName === 'Family');
//     const physicalProblem = PrisonerCondition.filter(item => item.PrisonerConditionTypeName === 'Body');


//     const openAppOrWebsite = (app) => {
//         const baseURL = `https://77.104.81.93:8081/prisoners-detail?prisoner=${Prisoner}`;

//         const appURLs = {
//             bale: `balad://share?text=${encodeURIComponent(baseURL)}`,
//             eta: `eitaa://share?text=${encodeURIComponent(baseURL)}`
//         };

//         const webURLs = {
//             bale: "https://bale.ai",
//             eta: "https://eitaa.com/"
//         };

//         const appURL = appURLs[app] || '';
//         const webURL = webURLs[app] || baseURL;


//         const isAppInstalled = (url) => {
//             const iframe = document.createElement("iframe");
//             iframe.style.display = "none";
//             iframe.src = url;
//             document.body.appendChild(iframe);

//             setTimeout(() => {
//                 document.body.removeChild(iframe);
//             }, 5000);
//         };

//         isAppInstalled(appURL);

//         window.location.href = webURL;
//     };



//     const copyLinkToClipboard = () => {
//     const link = `https://77.104.81.93:8081/prisoners-detail?prisoner=${Prisoner}`;
//     navigator.clipboard.writeText(link)
//         .then(() => {
//         })
//         .catch((err) => {
//             console.error("خطا در کپی کردن لینک: ", err);
//         });
//     };
//     const checkToken =async ()=>{
//                const isValid = await TokenChecker(CustomerUID , token , 'PrisonersDetail' );
//                if(isValid.status==200){
//                 const result =await fetch('/api/set-wallet-money-transfer',{
//                     method:'POST',
//                     headers: { 'Content-Type':'application/json' },
//                     body:JSON.stringify({
//                         "CustomerUID":CustomerUID,
//                         "LoginToken":token,
//                         "FromUID":CustomerUID,
//                         "ToUID":Prisoner,
//                         "TransferType":"9",
//                         "Amount":price.replace(/[^0-9]/g, ''),
//                         "AccountKind":"1"

//                     })
//                 })
//                 if(result.status==200){
//                     const response =await result.json();
//                     Cookies.set("",response.data);
//                     router.push('/prisoners-detail/payment-details');
//                 }else{
//                     setLoad(false);
//                     errorToast("خطا");
//                 }

//                }else{
//                   router.push('/phonenumberlogin');
//                }
//     }

//     const payHandler =()=>{

//         if(!price){
//             setErr('ابتدا مبلغ را وارد نمایید');
//         }else{
//             if(price==0){
//                 setErr('مبلغ صحیح نمی باشد');
//             }else{
//                  setLoad(true)
//                 return checkToken()
//             }
//         }
//     }
//     if(load){
//         return (
//             <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
//                    <PulseLoader
//                     color="#1f7e64"
//                     margin={5}
//                     size={23}
//                     />
//             </div>
//         )
//     }
//     return (
//         <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-start  mx-4 xl:mx-[120px] mt-10 mb-28 ">
//             <div className="w-11/12 md:w-[47%]  bg-white shadow-lg rounded-[16px] p-5 ">
//             <div className="relative w-[100%] h-[150px]  lg:h-[220px] mx-auto border rounded-[8px]">
//                 <img src="/images/prisonBanner.png" style={{ width: '100%', height: '100%' }} />
//             </div>
//                 <div className="my-5 text-[20px] text-secondary700">
//                     <span>زندانی شماره</span><span>{PrisonerNumber}</span>
//                 </div>
//                {
//                 CompanyName &&
//                 <div className="flex mb-6 items-center">
//                     {/* <div className="ml-3 border-2 relative w-7 h-7 rounded-full overflow-hidden">
//                         <Image alt="Some Alt" fill style={{ objectFit: 'cover' }} className="object-cover" />
//                     </div> */}
//                     <div className="flex text-[14px] text-secondary600">
//                         <span> تحت پوشش</span>
//                         <span>{CompanyName}</span>
//                     </div>
//                 </div>
//                }

//                 <div className="flex justify-between mb-3">
//                     <div>
//                         <span>{FormatNumber(PrisonerDebt)}</span>
//                         <span className="mr-3">ریال</span>
//                     </div>
//                     <span>{PercentDebt}%</span>
//                 </div>

//                 {/* Progress bar-------------------------- */}
//                 <Progress className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-500" style={{ width: `${PercentDebt}%` }}></div>
//                 </Progress>

//                 {/* amount box----------------------------- */}
//                 <div className="flex flex-col my-8">
//                     <div className="flex justify-between text-[14px] lg:text-[20px] mb-8">
//                         <span>مبلغ جمع آوری شده تا امروز</span>
//                         <div>
//                             <span>{FormatNumber(HelpPrice)}</span>
//                             <span className="mr-3">ریال</span>
//                         </div>
//                     </div>

//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>بدهی تا پایان ماه</span>
//                         <div>
//                             <span>{FormatNumber(PrisonerDebt)}</span>
//                             <span className="mr-3">ریال</span>
//                         </div>
//                     </div>

//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>بدهی پیش بینی شده ماه بعد</span>
//                         <div>
//                             <span>{FormatNumber(PrisonerDebtEndMonth)}</span>
//                             <span className="mr-3">ریال</span>
//                         </div>
//                     </div>

//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>مهلت پرداخت</span>
//                         <span className="text-black font-semibold">عید فطر</span>
//                     </div>

//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>تعداد حامیان تا امروز</span>
//                         <div className="font-semibold">
//                             <span>{countHelper}</span>
//                             <span className="mr-3">نفر</span>
//                         </div>
//                     </div>
//                 </div>

//                 <hr className="h-0 border-b border-dashed border-primary300" />
//                 {/* conditions box----------------------------- */}
//                 <div className="flex flex-col my-8">
//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>شهر</span>
//                         <span>{PrisonerCity}</span>
//                     </div>

//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>سن</span>
//                         <span>{PrisonerAge}</span>
//                     </div>

//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>شرایط جسمانی خاص</span>
//                         <div className="felx">
//                             {physicalProblem.map(item=>{
//                                 return(
//                                     <span key={item.PrisonerConditionValue}>{item.PrisonerConditionValue}</span>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                     <div className="flex justify-between mb-8 text-[14px] text-secondary600">
//                         <span>شرایط خانوادگی خاص</span>
//                         <div className="felx">
//                             {familyProblem.map(item=>{
//                                 return(
//                                     <span key={item.PrisonerConditionValue} className='bg-primary100 py-2 px-3 rounded-[8px]'>{item.PrisonerConditionValue}</span>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 <hr className="h-0 border-b border-dashed border-primary300" />
//                 <div className='h-20 my-4 flex flex-col justify-between'>
//                     <span className=" text-[14px] text-secondary600">توضیحات :</span>
//                     <div className='flex justify-end'>
//                         <button onClick={() => openAppOrWebsite('bale')} className="flex cursor-pointer items-center justify-center ml-2 border border-primary200 rounded-md p-1">
//                             <Image src={BaleLogo} width={20} height={20} />
//                         </button>
//                         <button onClick={() => openAppOrWebsite('eta')} className="flex cursor-pointer items-center justify-center ml-2 border border-primary200 rounded-md p-1">
//                             <Image src={EtaLogo} width={20} height={20} />
//                         </button>
//                         <button onClick={copyLinkToClipboard} className="flex cursor-pointer items-center justify-center ml-2 border border-primary200 rounded-md p-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#B0C7F5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g></svg>
//                             <span>کپی لینک</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* price bar --------------------------- */}
//             <div className="w-11/12 md:w-[47%] flex flex-col items-center mt-10  lg:mt-0 p-5 bg-white shadow-lg rounded-[16px] ">
//                 <span className='block text-center text-[20px] font-medium mb-10'>مبلغ مورد نظر را وارد نمایید</span>
//                 <div  className="relative flex items-center border w-8/12 h-[55px] overflow-hidden border-primary200 rounded-[12px]">
//                     <input onChange={priceChange} value={price} className="border-none outline-none w-full h-full px-2"/>
//                     <small className='absolute left-2 '>ریال</small>
//                 </div>
//                 <div className="relative justify-between flex items-center mt-10 w-8/12 h-[55px] overflow-hidden rounded-[12px]">
//                     <button onClick={()=>setPrice(FormatNumber(5000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>5.000 ریال</button>
//                     <button onClick={()=>setPrice(FormatNumber(10000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>10.000 ریال</button>
//                     <button onClick={()=>setPrice(FormatNumber(20000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>20.000 ریال</button>
//                 </div>
//                 <div className="flex flex-col items-center">
//                     <button onClick={payHandler} className='w-[160px] mt-10 mb-3 bg-primary400 rounded-[10px] text-white  h-[58px]'>
//                         پرداخت
//                     </button>
//                     <span className="text-[12px] text-red-500 mb-10">{err}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PrisonersDetailC;


import Image from "next/image";
import { Progress } from "@radix-ui/react-progress";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import BaleLogo from '../public/images/bale.svg';
import EtaLogo from '../public/images/eta.svg';
import { FormatNumber } from "../utilities/tomanSeprator";
import PulseLoader from "react-spinners/PulseLoader";
import { errorToast } from "../Template/ToastifyT";

const PrisonersDetailC = () => {

    const [challenge , setChallenge] =useState([]);

    const getChallenge =()=>{

    }

    const [price , setPrice] =useState();
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
    const Prisoner = Cookies.get('PrisonerUID');

    const [prisoners, setPrisoners] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err , setErr] =useState('');

    useEffect(() => {
        const getPrisoners = async () => {
            const response = await fetch('/api/get-prisoners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Prisoner })
            });
            const data = await response.json();
            setPrisoners(data.backendResponse);
            setIsLoading(false);
        };
        getPrisoners();
    }, [Prisoner]);

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
        HelpPrice,
        PercentDebt,
        PrisonerDebtEndMonth,
        PrisonerAge,
        PrisonerCity,
        PrisonerCondition = [],
        PrisonerDebt,
        PrisonerDebtDate,
        PrisonerGender,
        PrisonerNumber,
        countHelper
    } = prisoners[0];

     console.log(PrisonerCondition,"PrisonerCondition");


    const familyProblem = PrisonerCondition.filter(item => item.PrisonerConditionTypeName === 'Family');
    const physicalProblem = PrisonerCondition.filter(item => item.PrisonerConditionTypeName === 'Body');


    const openAppOrWebsite = (app) => {
        const baseURL = `https://77.104.81.93:8081/prisoners-detail?prisoner=${Prisoner}`;

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
    const link = `https://77.104.81.93:8081/prisoners-detail?prisoner=${Prisoner}`;
    navigator.clipboard.writeText(link)
        .then(() => {
        })
        .catch((err) => {
            console.error("خطا در کپی کردن لینک: ", err);
        });
    };
    const moneyTransfer =async ()=>{
                if(token){
                    const result =await fetch('/api/set-wallet-money-transfer',{
                        method:'POST',
                        headers: { 'Content-Type':'application/json' },
                        body:JSON.stringify({
                            "CustomerUID":CustomerUID,
                            "LoginToken":token,
                            "FromUID":CustomerUID,
                            "ToUID":Prisoner,
                            "TransferType":"9",
                            "Amount":price.replace(/[^0-9]/g, ''),
                            "AccountKind":"1"
                        })
                    })

                    if(result.status==200){
                        const response =await result.json();
                        Cookies.set("TransactionReceiptUID", response.data);
                        router.push('/prisoners-detail/payment-details');
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
                    router.push('/phonenumberlogin')
                }
               }


    const payHandler =()=>{

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
        <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-start  mx-4 xl:mx-[120px] mt-10 mb-28  ">
            <div className="w-11/12 md:w-[47%]  bg-white h-auto shadow-lg pb-4 rounded-[16px] overflow-hidden ">
            <div className="relative  w-[100%] h-[80px] mx-auto border bg-gradient-to-l from-[#001510]  to-[#00BF8F] ">
                 {
                        prisoners[0].PrisonerGenderType === 1 ? <img alt="GenderIcon" src={ "/images/man.png" } className="absolute top-[50%] right-5 w-20 h-20" />:prisoners[0].PrisonerGenderType === 2? <img alt="GenderIcon" src={ "/images/woman.png"} className="absolute top-[50%] right-5 w-20 h-20"/> :<img alt="GenderType"/>
                 }
            </div>
            <div  className="p-5">
                <div className="flex justify-between items-center mt-5 text-[16px] text-secondary700">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                             <span className="font-semibold">زندانی شماره</span><span> {PrisonerNumber} </span>
                             (<span className="text-sm text-secondary600">{PrisonerAge}</span><span className="text-sm text-secondary600">ساله</span>)
                        </div>
                    </div>
                    {/* social media and shair--------------- */}
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
                <div className="text-sm">
                    (
                            <span className="px-1">{prisoners[0].PrisonerGenderType==1?"آقا":"خانم"} |</span>
                            {
                                PrisonerCondition.map((item , index)=>{
                                    return <span key={index} className="" >{item.PrisonerConditionValue} {index+1!==PrisonerCondition.length&&<span>,</span>} </span>
                                })
                            }
                    )
                </div>
               {
                CompanyName &&
                <div className="flex mb-6 items-center">
                    {/* <div className="ml-3 border-2 relative w-7 h-7 rounded-full overflow-hidden">
                        <Image alt="Some Alt" fill style={{ objectFit: 'cover' }} className="object-cover" />
                    </div> */}
                    <div className="flex text-sm my-4 text-secondary600">
                        <span> تحت پوشش</span>
                        <span>{CompanyName}</span>
                    </div>
                </div>
               }

                <div className="flex text-sm text-secondary600 justify-between mb-3">
                    <div>
                        <span>کمک های مردمی</span>
                        {/* <span>{FormatNumber(PrisonerDebt)}</span>
                        <span className="mr-3">ریال</span> */}
                    </div>
                    <span>{PercentDebt}%</span>
                </div>

                {/* Progress bar-------------------------- */}
                <Progress className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary300" style={{ width: `${PercentDebt}%` }}></div>
                </Progress>

                {/* amount box----------------------------- */}
                <div className="flex flex-col my-8">
                    <div className="flex justify-between text-[14px] text-secondary600 mb-4">
                        <span>مبلغ باقی مانده</span>
                        <div>
                            <span className="ml-1">{FormatNumber(PrisonerDebt-HelpPrice)}</span>
                            <span>ریال</span>
                        </div>
                    </div>

                    <div className="flex justify-between mb-4 text-[14px] text-secondary600">
                        <span>بدهی تا پایان ماه</span>
                        <div>
                            <span className="ml-1">{FormatNumber(PrisonerDebt)}</span>
                            <span>ریال</span>
                        </div>
                    </div>
                    <div className="relative text-sm text-secondary600 w-ful flex justify-between items-center">
                                <div className="text-[16px] font-medium flex items-center group">
                                    <span className="text-sm">جریمه تاخیر در پرداخت </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 cursor-pointer" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#99cabc" d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                    </svg>
                                    <p className="absolute z-10 hidden group-hover:block text-[12px] p-3 rounded-[16px] bg-secondary200 top-[130%]">
                                    با پرداخت تا پیش از این تاریخ، می‌توانید از افزایش احتمالی مبلغ بدهی بعلت خسارت تاخیر در تادیه جلوگیری کنید و در سریع‌تر آزاد شدن این زندانی سهیم باشید.
                                    </p>
                                </div>
                                <div className="flex text-sm"><span className=" ml-1">{FormatNumber(prisoners[0].PersentDebtEndMonth)}</span> <span> ریال </span></div>
                            </div>

                    {/* <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>بدهی پیش بینی شده ماه بعد</span>
                        <div>
                        <span>{FormatNumber(PrisonerDebtEndMonth)}</span>
                        <span className="mr-3">ریال</span>
                        </div>
                        </div> */}

                    {/* <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>مهلت پرداخت</span>
                        <span className="text-black font-semibold">عید فطر</span>
                        </div> */}

                    <hr className="h-0 border-b border-dashed border-primary300 my-8" />

                    <span className="text-primary300 mb-6 font-semibold">جزئیات محکومیت</span>

                    <div className="text-sm flex justify-between  text-secondary700">
                        <span>مدت محکومیت</span>
                        <span>2 سال</span>
                    </div>
                    <div className="text-sm flex justify-between  text-secondary700 my-5">
                        <span>مدت زمان محکومیت باقی مانده</span>
                        <span>4 سال</span>
                    </div>
                    <div className="text-sm flex justify-between  text-secondary700">
                        <span>محل گذران محکومیت</span>
                        <span>رجائی شهر</span>
                    </div>


{/*
                    <div className="flex justify-between mb-8 text-[14px] text-secondary600">
                        <span>تعداد حامیان تا امروز</span>
                        <div className="font-semibold">
                            <span>{countHelper}</span>
                            <span className="mr-3">نفر</span>
                        </div>
                    </div> */}
                </div>



                {
                    PrisonerCondition && <>
                        <hr className="h-0 border-b border-dashed border-primary300 my-8" />
                        <span className="text-primary300 font-semibold ">شرایط زندانی</span>
                        <div className="text-sm flex justify-between mt-6 text-secondary700">
                            <span>شرایط خانوادگی</span>
                            <span>{
                                PrisonerCondition?.map((item,index)=>{
                                    if(item.PrisonerConditionTypeName=='Family'){
                                        return(
                                            <span key={index} className="py-2 px-4 rounded-md  mx-1 text-xs text-primary500 bg-primary50 ">{item.PrisonerConditionValue}</span>

                                        )
                                    }
                                })
                                }</span>
                        </div>
                        <div className="text-sm flex justify-between  text-secondary700 my-5">
                            <span>شرایط زندانی</span>
                            <span>{
                                PrisonerCondition?.map((item,index)=>{
                                    if(item.PrisonerConditionTypeName=='Body'){
                                        return(
                                            <span key={index} className="py-2 px-4 rounded-md  mx-1 text-xs text-primary500 bg-primary50 ">{item.PrisonerConditionValue}</span>
                                        )
                                    }
                                })
                                }</span>
                        </div>
                    </>
                }
                <hr className="h-0 border-b border-dashed border-primary300 my-8" />

                <span className="text-primary300 font-semibold">مشخصات شخصی</span>

                <div className="text-sm flex justify-between mt-6 text-secondary700">
                    <span>تابعیت</span>
                    <span>ایرانی</span>
                </div>
                <div className="text-sm flex justify-between  text-secondary700 my-5">
                    <span>دهک بندی خانواده</span>
                    <span>دهک دوم</span>
                </div>
                <div className="text-sm flex justify-between  text-secondary700">
                    <span>تحصیلات</span>
                    <span>لیسانس</span>
                </div>

                <hr className="h-0 border-b border-dashed my-6 border-primary300" />
                <div className='my-4 flex flex-col justify-between'>
                    <span className="text-primary300 font-semibold">توضیحات :</span>
                    <p className="text-sm text-secondary600 font-normal">
                          وی پدر دو فرزند خردسال است و به‌دلیل ضمانت برای یکی از نزدیکانش، ناخواسته درگیر یک بدهی سنگین شده. با اینکه هیچ سوءنیتی در کار نبوده، اما ناتوانی در پرداخت بدهی، او را راهی زندان کرده. همسرش با درآمد اندک تلاش می‌کند زندگی را اداره کند، اما بدون کمک دیگران، امکان بازگشت وی به خانه و زندگی‌اش وجود ندارد.
                    </p>

                </div>
            </div>
            </div>

            {/* price bar --------------------------- */}
            <div className="w-11/12 md:w-[47%] flex flex-col items-center mt-10  lg:mt-0 p-5 bg-white shadow-lg rounded-[16px] ">
                <span className='block text-center text-[20px] font-normal mb-10'>مبلغ مورد نظر را وارد نمایید</span>
                <div  className="relative flex items-center border w-10/12 h-[50px] overflow-hidden border-primary200 rounded-[12px]">
                    <input onChange={priceChange} value={price} className="border-none outline-none w-full h-full px-2"/>
                    <small className='absolute left-2 '>ریال</small>
                </div>
                <div className="relative justify-between flex items-center mt-10 w-10/12 h-[55px] overflow-hidden rounded-[12px]">
                    <button onClick={()=>setPrice(FormatNumber(100000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>100.000 ریال</button>
                    <button onClick={()=>setPrice(FormatNumber(500000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>500.000 ریال</button>
                    <button onClick={()=>setPrice(FormatNumber(1000000))} className='bg-primary50 h-[45px] w-[32%] rounded-[10px] text-[14px] '>1000.000 ریال</button>
                </div>
                <div className="flex flex-col items-center">
                    <button onClick={payHandler} className='w-[160px] mt-10 mb-3 bg-primary400 rounded-[10px] text-white  h-[50px]'>
                        پرداخت
                    </button>
                    <span className="text-[12px] text-red-500 mb-10">{err}</span>
                </div>
            </div>
        </div>
    );
};


export default PrisonersDetailC;
