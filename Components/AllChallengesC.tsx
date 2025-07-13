import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import ChallengeT from "../Template/ChallengeT";


interface ChallengeInfoes {
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

const AllChallengesC = () => {

    const [isLoading , setIsLoading]=useState<boolean>(false);
    const [challenge , setChallenge] =useState<ChallengeInfoes[]>([]);


    const fetchChallenge = async (): Promise<ChallengeInfoes[]> => {
    const result = await fetch('/api/get-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await result.json();
    return data.backendResponse;
    };

    const loadData = async () => {
    setIsLoading(true);

    try {
        const challengeData = await fetchChallenge();
        setChallenge(challengeData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setIsLoading(false);
    }
    };


    useEffect(()=>{
        loadData();
    },[])

    if (isLoading) {
            return   <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
                        <PulseLoader
                            color="#1f7e64"
                            margin={5}
                            size={23}
                            />
                    </div>;
        }

    return (
        <div className="flex flex-col  mb-28 px-4 lg:px-[130px] mt-14">
              <span className="text-xl">پویش های حمایتی</span>
              <span className=" text-sm mt-2 text-secondary600 ">در این بخش می‌توانید تأثیر اشتراک‌گذاری‌ پویش‌هایتان را در جذب حمایت‌ها مشاهده کنید.</span>


            {/* Filters Parent----------------------------------------- */}
              <div className='w-full mt-8 sm:w-2/3 md:w-1/2 flex justify-between'>
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

                        <div className={`flex flex-wrap ${challenge?.length > 3 && 'justify-between'} mt-16 mr-2 md:mr-20 `}>
                            {Array.isArray(challenge)&&challenge?.map((item)=>{
                                return(
                                    <div key={item.ChallengeUID} className={`w-full sm:w-[45%] lg:w-[31%] mb-8  ${challenge.length<4&&'ml-8'} `}>
                                        <ChallengeT key={item.ChallengeUID} data={item} />
                                    </div>
                                )
                            })}
                        </div>

        </div>
    );
};

export default AllChallengesC;