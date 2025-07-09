import { useEffect , useState } from "react";
import CreateNewChallengeC from "./CreateNewChallengeC";
import Cookies from "js-cookie";
import ChallengeT from "../Template/ChallengeT";

const MyChallengeC = ({isDesktop , setShowData})  => {

    const CustomerUID = Cookies.get('CustomerUID');
    const LoginToken =Cookies.get('token');
    const SelectedChallenge=Cookies.get('SelectedChallenge')
    const [createMod , setCreateMod] =useState(false);
    const [challenges , setChallenges] =useState()
    const getProfileChallenge = async()=>{
        const backendResult =await fetch('/api/get-profile-challenge',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                CustomerUID:CustomerUID ,
                LoginToken:LoginToken,
                ChallengeUID: "",
                IsExpiredChallenge:"",
                IsVerified:"",
                IsActive:""
            })
        })
        const res=await backendResult.json();
        setChallenges(res.data);
    }
    console.log(challenges);

    useEffect(()=>{
      getProfileChallenge();
      window.scrollTo(0,0);
      Cookies.remove("SelectedChallenge");
    },[])

    const createHandler =()=>{
      setCreateMod(true);
      Cookies.remove("SelectedChallenge")
    }
    const clickHandler=()=>{
        setCreateMod(false)
        setShowData(true)
    }
    return (
        <div className="flex flex-col mx-4 ">
        {
            isDesktop||
            <div className="flex">
                <button onClick={clickHandler} className='flex justify-start mb-12'>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"/></svg>
                </button>
                <span className=' text-[20px] mx-auto text-secondary600 mb-5'>{SelectedChallenge?"ویرایش":createMod?"افزودن پویش جدید":"همه پویش ها"}</span>
            </div>

        }
        {
         createMod ? <CreateNewChallengeC setCreateMod={setCreateMod}  /> :
         <div className="flex flex-col ">
            <div className='flex flex-wrap justify-between'>
            <div className='w-full sm:w-2/3 flex justify-between'>
                <button className='w-[32%] h-[40px] px-1 flex justify-between items-center outline-none border-2 rounded-xl text-secondary600'>
                    <span className='text-sm font-normal'>وضعیت</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                        <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                        </path>
                    </svg>
                </button>
                <button className='w-[32%] h-[40px] px-1 flex justify-between items-center outline-none border-2 rounded-xl text-secondary600'>
                    <span className='text-sm font-normal'>دسته پویش</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                        <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                        </path>
                    </svg>
                </button>
                <button className='w-[32%] h-[40px] px-1 flex justify-between items-center outline-none border-2 rounded-xl text-secondary600'>
                    <span className='text-sm font-normal'>مرتب سازی</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                        <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                        </path>
                    </svg>
                </button>
            </div>
            <button onClick={createHandler} className='w-full sm:w-[30%] mt-2 sm:mt-0 text-white text-sm bg-secondary600 border-2 h-10 px-2 rounded-xl'>
                افزودن پویش جدید
            </button>
            </div>
            <div className={`flex flex-wrap ${challenges?.length > 3&& 'justify-between'} mt-10 `}>
                {Array.isArray(challenges)&&challenges?.map((item)=>{
                    return(
                        <div key={item.ChallengeUID} className={`w-full sm:w-[48%]  mb-8 `}>
                            <ChallengeT setCreateMod={setCreateMod} data={item} />
                        </div>
                    )
                })}
            </div>
         </div>
        }
        </div>
    );
};

export default MyChallengeC;