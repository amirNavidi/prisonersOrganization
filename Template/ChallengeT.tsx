import React, { useEffect, useState } from 'react';
import { Progress } from "@radix-ui/react-progress";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import HeaderOfChallengeC from "../Components/HeaderOfChallengeC";

interface EnterValue {
    CompanyName:string;
    ChallengeUID:string;
    ChallengeName:string;
    ChallengePrice:string;
    ChallengeDate:string;
    ChallengeDateName:string;
    ChallengeImage:string;
    PrisonerDebts:number;
    countHelper:number;
    HelpPrice:number;
    PercentDebt:number;
    PrisonerCount:number
    NextPage:string;
    IsVerified:boolean;
    IsActive:boolean;
    ChallengeFromDate:string;
    ChallengeToDate:string;

}

interface EnterValues {
    data:EnterValue;
    setCreateMod?:(value:boolean)=>void
}

const ChallengeT = ({data ,setCreateMod }: EnterValues ) => {

    const router:any =useRouter();
    const [whichPage , setWhichPage] =useState('');

    useEffect(()=>{
        if(router.pathname=='/profile'){
            setWhichPage("profile")
        }
    },[]);

    const{CompanyName , ChallengeUID , ChallengeName , ChallengePrice , ChallengeDate , ChallengeFromDate ,ChallengeToDate,ChallengeDateName , ChallengeImage , PrisonerDebts , countHelper , HelpPrice , PercentDebt , PrisonerCount ,IsVerified ,IsActive } =data;
    const clickHandler=()=>{
        Cookies.set('ChallengeUID',ChallengeUID);
        router.push({
            pathname: '/choosing-challenge',
            query: { cahllenge: ChallengeUID }
        });
    }
    console.log(router);

    const remainingAmount =Number(ChallengePrice)-Number(HelpPrice);
    const editHandler=()=>{
        Cookies.set("SelectedChallenge",ChallengeUID);
       setCreateMod?.(true);
    }


    return (
        <div className="flex flex-col min-h-[400px] w-full border border-secondary400 rounded-xl overflow-hidden">
            {
                whichPage=='profile'?<div className='flex justify-between items-center px-3 h-12'>
                    <div className=' w-1/2 flex text-xs text-secondary600'>
                        {
                            IsVerified?"تایید شده" :"رد شده"
                        }
                    </div>
                    <div className=' w-1/2 flex justify-end items-center text-xs text-secondary600'>
                      <span className={`w-2 h-2 rounded-full ${IsActive?"bg-primary600":"bg-red-500"}`} ></span>
                      <span className='mr-1'>{IsActive?"فعال":"غیر فعال"}</span>
                    </div>
                </div>:<HeaderOfChallengeC />
            }

            <img className="w-full h-[150px] bg-black" src={ChallengeImage} alt='challenge-banner'/>

            <div className='mt-5 mx-4'>
                <div className="text-base font-bold">
                    <span> پویش </span>
                    <span className='text-tertiary700 '>{ChallengeName}</span>
                </div>
                <span className="text-xs text-secondary600">
                از میان زندانیان غیرعمد مبتلا به سرطان، 128 نفر که در وضعیت وخیم‌تری از نظر سلامتی هستند و امکان ...
                </span>
                <div className='flex justify-between text-sm mt-5'>
                    <span className='text-secondary700'>کل مبلغ</span>
                    <span>{Number(ChallengePrice).toLocaleString('fa-IR')}<span> ریال </span></span>
                </div>
                <div className='flex justify-between text-sm mt-2 mb-8'>
                    <span className='text-secondary700'>بدهی باقی مانده</span>
                    <span>{remainingAmount.toLocaleString('fa-IR')}<span> ریال </span></span>
                </div>
                <Progress value={PercentDebt} className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary300" style={{ width: PercentDebt }}></div>
                </Progress>

                {
                    whichPage=="profile"&& <div className="flex items-center justify-between mt-7 text-sm text-tertiary700">
                    <div className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="none" stroke="#a87811" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1} d="M12 6v5.8a.2.2 0 0 1-.2.2H8m14 0c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"></path>
                        </svg><span className="mr-2"> شروع چالش </span></div>
                        <span>{new Date(ChallengeFromDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                        })
                        }</span>

                </div>
                }

                <div className="flex items-center justify-between  mt-2  text-sm text-tertiary700">
                    <div className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="none" stroke="#a87811" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1} d="M12 6v5.8a.2.2 0 0 1-.2.2H8m14 0c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"></path>
                        </svg><span className="mr-2"> پایان چالش </span></div>
                    <span>{whichPage=="profile"?new Date(ChallengeToDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                        }): ChallengeToDate}</span>
                </div>
                <div className="flex justify-center">
                    {
                        whichPage?<div className='w-full flex justify-between '>
                            <button onClick={editHandler} className={`w-[49%] h-[42px] text-primary500 border border-primary500 rounded-lg my-6`}>ویرایش</button>
                            <button  className={`w-[48%] h-[42px] bg-primary500 text-white rounded-lg my-6 `}>جزئیات</button>
                        </div>:  <button onClick={clickHandler} className={`'w-11/12 p-3 h-[42px] bg-primary500 text-white rounded-lg my-6 mx-auto`}>یاری میکنم</button>
                    }

                </div>
            </div>


        </div>
    );
};

export default ChallengeT;