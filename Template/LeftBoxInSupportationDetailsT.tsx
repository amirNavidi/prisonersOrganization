import React, { useState } from 'react';
import { successToast } from "./ToastifyT";
import { useRouter } from 'next/router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Chart} from "react-chartjs-2";
import { ChartData } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);


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
        // const baseURL = "http://77.104.81.93:8089";
        // const makeShareLink =baseURL+ShareLink;
        // copylink(makeShareLink)
        // successToast("با موفقیت کپی شد");
    }
        const chartData: ChartData<'pie', number[]> = {
        datasets: [
            {
            label: '',
            data: [300 , 100],
            backgroundColor: [
                'rgb(20,184,166,100)',
                'rgb(255, 205, 86)',
            ],
            hoverOffset: 2,
            },
        ],
        };
        const options ={
            cutout:'65%'
        }



    return (
        <div className='w-full flex flex-col border border-black rounded-xl p-4'>
            <span className='font-bold text-[#606060] mt-8'>آمار اشتراک گذاری</span>
            <span className='text-sm text-secondary600 mt-2'>آمار مربوط به اشتراک گذاری توسط دیگران</span>
            <button onClick={shareHandler} className="  flex justify-center items-center w-full text-sm h-[42px] rounded-lg bg-primary500 mt-12 text-white md:text-sm">اشتراک گذاری</button>

            <div className='flex justify-around items-center w-full h-[141px] border-2 border-secondary400 rounded-2xl mt-12'>
                <div className="flex flex-col w-[48%] h-full">
                    <div className='flex justify-center items-center h-[40%] border-b-2 border-secondary400 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20">
                            <path fill="gray" d="M4.5 6.75a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0M6.75 3.5a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5m5.687 11.645c.538.22 1.215.355 2.063.355c1.881 0 2.921-.668 3.469-1.434a2.9 2.9 0 0 0 .521-1.36a2 2 0 0 0 .01-.137V12.5A1.5 1.5 0 0 0 17 11h-4.63c.24.29.42.629.525 1H17a.5.5 0 0 1 .5.5v.054l-.005.05a1.9 1.9 0 0 1-.34.88c-.327.459-1.037 1.016-2.655 1.016c-.732 0-1.278-.114-1.687-.281c-.082.28-.201.596-.376.926M1.5 13a2 2 0 0 1 2-2H10a2 2 0 0 1 2 2v.084l-.002.04l-.01.135a3.95 3.95 0 0 1-.67 1.806C10.617 16.08 9.263 17 6.75 17s-3.867-.92-4.568-1.934a3.95 3.95 0 0 1-.67-1.807a3 3 0 0 1-.012-.175zm1 .06v.018l.007.083a2.95 2.95 0 0 0 .498 1.336C3.492 15.201 4.513 16 6.75 16s3.258-.799 3.745-1.503a2.95 2.95 0 0 0 .498-1.336q.006-.057.006-.083l.001-.017V13a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1zM13 7.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0M14.5 5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5" strokeWidth={0.7} stroke="gray"></path>
                        </svg>
                        <span className='text-secondary600 text-sm mr-2'>تعداد حامیان</span>
                     </div>
                    <div className='flex flex-col h-[60%] justify-center items-center'>
                        <div className='flex'>
                            <span>n</span><span className='text-secondary600 text-sm mr-2'>نفر</span>
                        </div>
                         <div className='flex text-[#34C759] text-sm mt-2'>
                            <span>n%</span><span className='mr-2'>بیشتر از ماه گذشته</span>
                        </div>
                    </div>
                </div>
                <div className='w-0 h-[95%] border-l-2 border-secondary400'></div>
                <div className="flex flex-col w-[48%] h-full">
                    <div className='flex justify-center items-center h-[40%] border-b-2 border-secondary400 '>
                       <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                            <path fill="gray" d="M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112-96H16a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8m-46.35 128H62.35A56.78 56.78 0 0 0 24 145.65v-35.3A56.78 56.78 0 0 0 62.35 72h131.3A56.78 56.78 0 0 0 232 110.35v35.3A56.78 56.78 0 0 0 193.65 184M232 93.37A40.8 40.8 0 0 1 210.63 72H232ZM45.37 72A40.8 40.8 0 0 1 24 93.37V72ZM24 162.63A40.8 40.8 0 0 1 45.37 184H24ZM210.63 184A40.8 40.8 0 0 1 232 162.63V184Z" strokeWidth={6.5} stroke="gray"></path>
                        </svg>
                        <span className='text-secondary600 text-sm mr-2'>مبلغ جمع آوری شده</span>
                     </div>
                     <div className='flex flex-col h-[60%] justify-center items-center'>
                        <div className='flex'>
                            <span>n</span><span className='text-secondary600 text-sm mr-1'>ریال</span>
                        </div>
                         <div className='flex text-[#F55C54] text-sm mt-2'>
                            <span>n%</span><span className='mr-1'>بیشتر از ماه گذشته</span>
                        </div>
                    </div>
                </div>

            </div>


            {/* chart part ------------------------------------------- */}
            <span className='font-bold text-[#606060] mt-11'>نمایش نموداری</span>
            <span className='text-secondary600 text-sm mt-8 font-semibold'>مبالغ حمایتی جمع شده</span>

            <div className='flex flex-wrap  mt-4'>
                <div className='w-full flex justify-center lg:justify-start lg:w-1/2 h-[170px] '>
                    <Chart type='pie' data={chartData} />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-14'>
                    <div className='flex items-center'>
                        <span className='w-3 h-3 ml-2 rounded-full bg-[rgb(20,184,166,100)]'></span>
                        <span className='text-xs lg:text-sm text-secondary600'>کمک های مردمی مستقیم</span>
                    </div>
                   <div className='flex items-center mt-2'>
                        <span className='w-3 h-3 ml-2 rounded-full bg-[rgb(255,205,86)]'></span>
                        <span className='text-xs lg:text-sm text-secondary600'> کمک های از طریق اشتراک گذاری</span>
                    </div>
                </div>
            </div>

            {/* secound chart------------------------------------ */}
             <span className='text-secondary600 text-sm mt-8 font-semibold'>تعداد حامیان</span>

               <div className='flex flex-wrap mt-4 mb-10'>
                    <div className='w-full flex justify-center lg:justify-start lg:w-1/2 h-[170px] '>
                        <div className='relative inline'>
                            <Chart type='doughnut' data={chartData} options={options} />
                            <div className=' absolute w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center text-[10px] '>
                                <span className='text-xs'>تعداد کل حامیان</span>
                                <span className='text-xs font-semibold'>nنفر</span>
                            </div>
                        </div>
                    </div>
                <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-14'>
                    <div className='flex items-center'>
                        <span className='w-3 h-3 ml-2 rounded-full bg-[rgb(20,184,166,100)]'></span>
                        <span className='text-xs lg:text-sm text-secondary600'>کمک های مردمی مستقیم</span>
                    </div>
                   <div className='flex items-center mt-2'>
                        <span className='w-3 h-3 ml-2 rounded-full bg-[rgb(255,205,86)]'></span>
                        <span className='text-xs lg:text-sm text-secondary600'> کمک های از طریق اشتراک گذاری</span>
                    </div>
                </div>
            </div>





            {/* // for test qr code
            const [qrValue , setQrValue] =useState<string>('http://localhost:8089/profile/see-my-challenge-details?challengeID=81247A37-59B3-4C15-BABD-8A9EAC57FC3A'); */}
            {/* <div className="min-h-screen p-4">
                <div className="max-w-2xl mx-auto">
                    <QRCodeGenerator
                    value={qrValue}
                    size={256}
                    filename="my-qrcode"
                    />
                </div>
            </div> */}

        </div>
    );
};

export default LeftBoxInSupportationDetailsT;