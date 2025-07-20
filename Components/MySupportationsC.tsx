import { useState } from "react";
import SupportationComponent from "../Template/SupportationComponent";

type MyComponentProps={
  isDesktop :boolean;
  setShowData:(value :boolean )=>void;
}

const MySupportationsC = ({isDesktop , setShowData }:MyComponentProps) => {
    const [challengeInfoes , setChallengeInfoes] =useState({
        ChallengeName:"",
        ChallengeImage:"ddd",
        ShareLink:"string",
        Viewers:"number" ,
        Supporters : "number" ,
        TotalAmount:"number"
    })

    return (
        <div className="flex flex-col mx-4 ">
             {
                isDesktop||
                <div className="flex relative mb-10 ">
                    <button onClick={()=>setShowData(true)} className='absolute right-[-10px] flex w-[28px] justify-start mb-12  '>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"/></svg>
                    </button>
                    <span className='block w-full text-center text-[20px]  text-secondary600 '>دعوت به حمایت ها </span>
                </div>

            }

            <span className="text-xl font-medium">دعوت به حمایت ها</span>
            <span className="text-sm text-secondary600 mt-2">در این بخش می‌توانید تأثیر اشتراک‌گذاری‌ پویش‌هایتان را در جذب حمایت‌ها مشاهده کنید.</span>

            <div className="md:min-h-[200px] border border-primary500 rounded-xl mt-10 overflow-hidden bg-primary50">
                <div className="min-h-16 py-5 md:py-0 bg-primary400 border-b border-primary500 px-[27px] flex flex-col justify-center md:flex-row items-center md:justify-between">
                   <span className="text-sm md:text-base text-white text-center text-shadow-2xs font ">پویش هایی که تا به امروز به اشتراک گذاشته اید.</span>
                   <span className=" mt-2 md:mt-0 text-sm md:text-base text-white text-center text-shadow-2xs font-bold">n  پویش</span>
                </div>
                <div className="flex flex-col  md:flex-row justify-between items-center min-h-[130px]">
                    {/* first box------------------------------------ */}
                    <div className="flex flex-col items-center justify-center py-5 w-full md:w-[32%] h-full border-b md:border-none border-primary400">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-secondary50 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20">
                                <path fill="#228b6e" d="M17.74 2.76a4.32 4.32 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.32 4.32 0 0 1 6.1 0M8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0m-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.32 4.32 0 0 1-6.1 0a4.32 4.32 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0" strokeWidth={0.7} stroke="#228b6e"></path>
                            </svg>
                        </div>
                        <span className="text-xs font-light text-secondary700 mt-3 text-center">حامیانی که با لینک شما پیوستند</span>
                        <span className="font-bold text-xs mt-1">nنفر</span>
                    </div>
                    <div className=" hidden md:block h-[90px] w-full md:w-1  md:border-r border-primary400"></div>
                    {/* secound box--------------------------------- */}
                    <div className="flex flex-col items-center justify-center py-5  w-full md:w-[32%] h-full border-b md:border-none border-primary400">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-secondary50 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <g fill="none" stroke="#228b6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}>
                                    <path d="M16 13c-2.761 0-5-1.12-5-2.5S13.239 8 16 8s5 1.12 5 2.5s-2.239 2.5-5 2.5m-5 1.5c0 1.38 2.239 2.5 5 2.5s5-1.12 5-2.5m-18-5C3 10.88 5.239 12 8 12c1.126 0 2.165-.186 3-.5M3 13c0 1.38 2.239 2.5 5 2.5c1.126 0 2.164-.186 3-.5"></path>
                                    <path d="M3 5.5v11C3 17.88 5.239 19 8 19c1.126 0 2.164-.186 3-.5m2-10v-3m-2 5v8c0 1.38 2.239 2.5 5 2.5s5-1.12 5-2.5v-8"></path>
                                    <path d="M8 8C5.239 8 3 6.88 3 5.5S5.239 3 8 3s5 1.12 5 2.5S10.761 8 8 8"></path>
                                </g>
                            </svg>
                        </div>
                        <span className="text-xs font-light text-secondary700 mt-3 text-center">کمک های مالی حاصل از دعوت شما</span>
                        <span className="font-bold text-xs mt-1">n ریال</span>
                    </div>
                    <div className="hidden md:block  h-[90px] w-full md:w-1  md:border-r border-primary400"></div>

                    {/* third box------------------------------------------------ */}
                    <div className="flex flex-col items-center justify-center w-full md:w-[32%] h-full py-5 border-primary700">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-secondary50 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <g fill="none" stroke="#228b6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}>
                                    <path d="M3 13c3.6-8 14.4-8 18 0"></path>
                                    <path fill="#228b6e" d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6"></path>
                                </g>
                            </svg>
                        </div>
                        <span className="text-xs font-light text-secondary700 mt-3 text-center">بازدید ها از طریق دعوت شما</span>
                        <span className="font-bold text-xs mt-1">nبازدید</span>
                    </div>
                </div>


        </div>
              <div className='flex justify-between mt-16'>
                    <div className='w-full sm:w-2/3 flex justify-between'>
                        <button className='w-[32%] py-2 px-1 flex justify-between outline-none border-2 rounded-xl text-secondary600'>
                            <span className='text-sm font-normal'>وضعیت</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                                </path>
                            </svg>
                        </button>
                        <button className='w-[32%] py-2 px-1 flex justify-between outline-none border-2 rounded-xl text-secondary600'>
                            <span className='text-sm font-normal'>دسته پویش</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                                </path>
                            </svg>
                        </button>
                        <button className='w-[32%] py-2 px-1 flex justify-between outline-none border-2 rounded-xl text-secondary600'>
                            <span className='text-sm font-normal'>مرتب سازی</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                                </path>
                            </svg>
                        </button>
                    </div>
              </div>


              {/* Supportation component ------------------------------- */}
              <SupportationComponent data={challengeInfoes} />

        </div>
    );
};

export default MySupportationsC;