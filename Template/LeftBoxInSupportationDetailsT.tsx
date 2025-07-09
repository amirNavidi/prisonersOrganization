import React from 'react';
import { successToast } from "./ToastifyT";



interface EnterValue{
    ShareLink:string;
    Viewers:number | string ;
    Supporters : number | string ;
    TotalAmount:number | string ;
}

const LeftBoxInSupportationDetailsT = ({data}:{data:EnterValue}) => {
    const {ShareLink , Viewers , Supporters , TotalAmount }=data;


    const copylink = (links:string) => {
      navigator.clipboard.writeText(links)
    }

    const shareHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        const baseURL = "http://77.104.81.93:8089";
        const makeShareLink =baseURL+ShareLink;
        copylink(makeShareLink)
        successToast("با موفقیت کپی شد");
    }

    return (
        <div className='w-full flex flex-col border rounded-xl p-4'>
            <span className='font-bold text-[#606060] mt-8'>آمار اشتراک گذاری</span>
            <span className='text-sm text-secondary600 mt-2'>آمار مربوط به اشتراک گذاری توسط دیگران</span>
            <span className=" block my-5 text-xs text-secondary600">لینک اشتراک گذاری</span>
            <div className=" flex justify-between rounded-lg overflow-hidden border text-sm h-[42px] bg-secondary100 ">
                <span className="flex items-center pr-2 w-[70%] text-secondary600">{ShareLink}</span>
                <button onClick={shareHandler} className=" flex justify-center items-center w-[30%] bg-primary600 text-white text-xs md:text-sm">اشتراک گذاری</button>
            </div>

            <div className="flex justify-between mt-14">
                 <div className='flex flex-col justify-center items-center w-[30%] h-[70px] border rounded-lg '>
                    <span></span>
                    <span></span>
                 </div>
            </div>

        </div>
    );
};

export default LeftBoxInSupportationDetailsT;