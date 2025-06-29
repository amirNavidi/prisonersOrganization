import Cookies from "js-cookie";
import { FormatNumber } from "../utilities/tomanSeprator";
import { useState , createContext, useEffect } from "react";
import TokenChecker from "../utilities/TokenChecher";
import { useRouter } from "next/router";
import IranMapC from "./IranMap";
import { motion, AnimatePresence } from "framer-motion";
import FilterAccordion from "./FilterComponent";



interface PrisonerRangeData {
  RangeDebt: string;
  CntRange: number;
}

interface PrisonersData {
  ProvinceID: number;
  Data: PrisonerRangeData[];
}


export const ThemeProvience = createContext<{
    mySelectedProvience: string;
    setMySelectedProvince: React.Dispatch<React.SetStateAction<string>>;
    setPrisonersCount: React.Dispatch<React.SetStateAction<PrisonersData | null>>; 
} | null>(null);


const WaysToHelpC = () => {

    const [mySelectedProvience, setMySelectedProvince]=useState('')
    const priceChange = (ev:React.ChangeEvent<HTMLInputElement>)  => {
        const inputValue = ev.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');


        if (!isNaN(Number(numericValue))) {
            setErr('')
            setPrice(FormatNumber(numericValue));
        }
    };
    const [prisonersCount, setPrisonersCount] = useState<PrisonersData | null>(null);



    const [price , setPrice] = useState<string>('');
    // const [load , setLoad] =useState<Boolean>(false);
    const [err , setErr] =useState<string>('');
    const router =useRouter();
    const [period , setperiod]=useState<number>(1)

    // const checkToken =async ()=>{
    //     const isValid = await TokenChecker(CustomerUID , token , 'WaysToHelp' );
    //     //    router.push('/phonenumberlogin');
    //         }

        const payHandler =()=>{
            if(!price){
                setErr('ابتدا مبلغ را وارد نمایید');
            }else{
                if(price=='0'){
                    setErr('مبلغ صحیح نمی باشد');
                }else{
                    // setLoad(true)
                    // return checkToken()
                }
            }
        }


    // console.log(prisonersCount,"this is prisoners");
    const [Range, setRange] = useState<{ from: string | number; to?: string | number }>({
        from: '',
        to: '',
      });
    const amountRangeHandler=(from:number,to?:number)=>{
      setRange({
        from:from,
        to:to
      })
      Cookies.set("AmountFrom", String(Range.from));
      Cookies.set("AmountTo", String(Range.to ?? ""));

      router.push('/start-helping')
    }




    return (
        <div className='flex flex-col '>
            {/* banner------------------------------------------------ */}
            <div className="relative flex items-center">
                <span className="absolute right-2 md:right-20  text-white text-lg  md:text-2xl font-semibold">کمک به آزاد سازی زندانیان </span>
                <img
                    src="/images/waysToHelpBanner.jpg"
                    className="w-[100%] h-[100px]  md:h-[200px]"
                    alt="banner"
                    />
            </div>


            {/* first  parent------------------------------------ */}
            <div className="flex justify-between flex-wrap pr-2 md:pr-20 my-20 ">
                {/* first right parent------------------------------------ */}
                <div className="flex flex-col items-center md:items-start w-full md:w-6/12">
                  <span className="text-primary600 text-xl font-bold my-5 ">روش های کمک برای آزادسازی زندانیان</span>
                  <span className="text-sm text-secondary700 w-11/12 text-justify mb-12"> در این سامانه، شما می‌توانید به شیوه‌های مختلفی در مسیر آزادی زندانیان غیرعمد سهیم باشید :</span>

                  <div className="flex flex-wrap min-h-[143px] rounded-xl w-11/12  lg:8/12 border-gray-50 bg-secondary100 my-2 px-4 py-2 ">
                    <div className="flex items-end w-full mb-6">
                        <div className="flex justify-start items-center text-white w-2/12  lg:w-1/12 ">
                                <span className="w-6 h-6 ml-3 text-center bg-tertiary500 rounded-full">1</span>
                        </div>
                        <div className="w-10/12">
                            <span className="text-sm font-medium">مشارکت های عمومی</span>
                            <span className="text-sm font-medium text-primary600">(سهمی از امید)</span>
                        </div>

                    </div>
                    <span className="text-sm  w-10/12 lg:w-11/12 mr-auto text-secondary600">
                      با پرداخت هر مبلغ دلخواه، در کنار دیگر نیکوکاران، سهمی در مسیر آزادی زندانیان خواهید داشت. این کمک‌ها به تشخیص مؤسسه، برای آزادی افراد در اولویت صرف می‌شود.
                    </span>
                  </div>
                  <div className="flex flex-wrap min-h-[143px] rounded-xl w-11/12  lg:8/12 border-gray-50 bg-secondary100 my-2 px-4 py-2 ">
                    <div className="flex items-end w-full mb-6">
                        <div className="flex justify-start items-center text-white w-2/12 lg:w-1/12 ">
                                <span className="w-6 h-6 ml-3 text-center bg-tertiary500 rounded-full">2</span>
                        </div>
                        <div className="w-10/12">
                            <span className="text-sm font-medium">آزادی موردی بر اساس انتخاب شما</span>
                        </div>

                    </div>
                    <span className="text-sm  w-10/12 lg:w-11/12  mr-auto text-secondary600">
                    با بررسی پرونده‌های موجود و فیلتر کردن بر اساس شهر، سن، وضعیت خانوادگی و... می‌توانید کمک خود را مستقیماً به پرونده‌ای که انتخاب کرده‌اید اختصاص دهید
                    </span>
                  </div>

                  <div className="flex flex-wrap min-h-[143px] rounded-xl w-11/12  lg:8/12 border-gray-50 bg-secondary100 my-2 px-4 py-2 ">
                    <div className="flex items-end w-full mb-6">
                        <div className="flex justify-start items-center text-white w-2/12 lg:w-1/12 ">
                                <span className="w-6 h-6 ml-3 text-center bg-tertiary500 rounded-full">3</span>
                        </div>
                        <div className="w-10/12">
                            <span className="text-sm font-medium">پویش ها و چالش های عمومی</span>
                        </div>

                    </div>
                    <span className="text-sm  w-10/12 lg:w-11/12 mr-auto text-secondary600">
                    در طرح‌ها و پویش‌هایی که برای آزادی گروهی از زندانیان برگزار می‌شود مشارکت کنید و بخشی از یک حرکت جمعی باشید
                    </span>
                  </div>

                </div>




                {/* first left parent------------------------------------- */}
                <div className="flex flex-col items-center md:items-start w-full md:w-6/12 my-5">
                    {/* price bar --------------------------- */}
                    <div className="w-11/12  flex flex-col items-center mt-10  lg:mt-0 p-5 bg-white shadow-lg rounded-[16px] ">
                        <span className='block text-center text-[20px] text-primary600 font-bold '>سهمی از امید</span>
                        <div className="my-3 text-base font-medium">
                            <span className="text-tertiary600">مبالغ کوچک شما </span>
                            <span>میتوانند بخشی از</span>
                            <span className="text-tertiary600"> یک اتفاق بزرگ </span>
                            <span>باشند </span>
                        </div>
                        <span className="w-10/12 text-sm text-secondary600 font-light text-center mb-6">اگر نیت‌تان کمک در مسیر آزادی زندانیان است، می‌توانید مبلغ دلخواهی را به‌صورت عمومی اهدا کنید. این مبالغ به‌صورت جمعی ذخیره و در زمان مناسب، با تشخیص سازمان صرف آزادی زندانیان می‌شوند.</span>

                        <div className="flex justify-center w-10/12 my-5">
                            <button onClick={()=>setperiod(1)} className={`w-5/12 border border-primary400 h-[50px] rounded-xl rounded-l-none ${period==1&& "text-white"} ${period==1&& "bg-primary400"} `} >همین یکبار</button>
                            <button onClick={()=>setperiod(2)} className={`w-5/12 border border-primary400 h-[50px] rounded-xl rounded-r-none ${period==2&& "text-white"} ${period==2&& "bg-primary400"} `} >ماهی یکبار</button>
                        </div>

                        <div className="relative justify-between flex items-center mt-2 my-10 w-10/12 h-[55px] overflow-hidden rounded-[12px]">
                            <button onClick={()=>setPrice(FormatNumber(100000))} className='bg-primary50 h-[50px] w-[32%] rounded-[10px] text-[14px] '>100.000 ریال</button>
                            <button onClick={()=>setPrice(FormatNumber(500000))} className='bg-primary50 h-[50px] w-[32%] rounded-[10px] text-[14px] '>500.000 ریال</button>
                            <button onClick={()=>setPrice(FormatNumber(1000000))} className='bg-primary50 h-[50px] w-[32%] rounded-[10px] text-[14px] '>1.000.000 ریال</button>
                        </div>

                        <div  className="relative flex items-center border w-10/12 h-[55px] overflow-hidden border-primary200 rounded-[12px]">
                            <input placeholder="مبلغ دلخواه خود را وارد نمایید" onChange={priceChange} value={price} className="border-none outline-none w-full h-full px-2"/>
                            <small className='absolute left-2 '>ریال</small>
                        </div>

                        <div className="flex flex-col items-center ">
                            <button onClick={payHandler} className='w-[160px] mt-10 mb-3 bg-primary400 rounded-[10px] text-white  h-[58px]'>
                                ادامه
                            </button>
                            <span className="text-[12px] text-red-500 mb-10">{err}</span>
                        </div>
                    </div>
                </div>

            </div>


            {/* second parent------------------------------------ */}
            <div className="flex justify-between flex-wrap pr-2 md:px-20  ">
                   <div className="flex flex-col">
                       <div className="font-bold text-lg">
                          <span> هر عدد </span>
                          <span className="text-primary500">یک انسان </span>
                          <span>، هر کمک </span>
                          <span className="text-primary500">یک آزادی</span>
                       </div>
                        <span className="text-sm text-secondary600">
                        برای شروع داستان یاری استان مورد نظر را انتخاب کنید
                        </span>
                   </div>
                   <button className="flex text-primary500 text-base font-extrabold">
                    صفحه همه زندانیان<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="#228b6e" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" strokeWidth={0.7} stroke="#228b6e"></path>
                                       </svg>
                   </button>
            </div>



        {/* third parent------------------------------------ */}
        <div className="flex justify-between  flex-wrap mt-10  pr-2 md:px-20">
        <ThemeProvience.Provider value={{ mySelectedProvience, setMySelectedProvince , setPrisonersCount }}>
            <div
            className={`
                transition-all duration-700 ease-in-out 
                flex flex-col items-center md:items-start w-full 
                ${mySelectedProvience && mySelectedProvience !== "" ? "lg:w-7/12" : "lg:w-full"} 
                min-h-[400px] max-h-[600px]
            `}
            >
            <IranMapC />
            </div>
        </ThemeProvience.Provider>
        <div
            className={`
            transition-all duration-700 ease-in-out mb-28 lg:mb-0
            flex flex-col items-center md:items-start w-full lg:w-5/12 pt-10 font
            ${mySelectedProvience && mySelectedProvience !== "" ? "opacity-100 lg:max-h-[1000px] delay-700" : "opacity-0 lg:max-h-0 pointer-events-none overflow-hidden hidden lg:block"}
            `}
        >
            <span className="text-secondary500 mb-8">
            برای شروع یکی از بازه های زیر را انتخاب نمایید
            </span>

            <button onClick={()=>amountRangeHandler(0,500000000)} className="flex justify-between items-center cursor-pointer w-full h-[55px] outline-none bg-primary500 text-white rounded-2xl px-5 my-2">
                <span>بازه بدهی زیر 50 میلیون تومان</span>
                <div className="flex items-center">
                <span className="flex ml-4">
                    {prisonersCount?.Data?.[0]?.CntRange || 0}
                    <span>نفر</span>
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="#228b6e" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" strokeWidth={0.7} stroke="white" />
                    </svg>
                </div>
            </button>

            <button onClick={()=>amountRangeHandler(500000000,1000000000)} className="flex justify-between items-center w-full h-[55px] cursor-pointer outline-none bg-primary500 text-white rounded-2xl px-5 my-2">
                <span>بازه بدهی بین 50 تا 100 میلیون تومان</span>
                <div className="flex items-center">
                <span className="flex ml-4">
                    {prisonersCount?.Data?.[1]?.CntRange || 0}
                    <span>نفر</span>
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="#228b6e" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" strokeWidth={0.7} stroke="white" />
                    </svg>
                </div>
            </button>

            <button onClick={()=>amountRangeHandler(1000000000)} className="flex justify-between items-center w-full h-[55px] cursor-pointer outline-none bg-primary500 text-white rounded-2xl px-5 my-2">
                <span>بازه بدهی بالای 100 میلیون تومان</span>
                <div className="flex items-center">
                <span className="flex ml-4">
                    {prisonersCount?.Data?.[2]?.CntRange || 0}
                    <span>نفر</span>
                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="#228b6e" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" strokeWidth={0.7} stroke="white" />
                    </svg>
                </div>
            </button>
        </div>
        </div>
    </div>
    );
};

export default WaysToHelpC;