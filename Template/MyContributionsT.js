import { Progress } from "@radix-ui/react-progress";
import { useRouter } from "next/router";
import { FormatNumber } from "../utilities/tomanSeprator";


const MyContributionsT = ({helpDetails}) => {

    const router =useRouter();
    console.log(helpDetails,"this related with challenge");
    
    const detailHandler=()=>{
          router.push(`/choosing-challenge?challenge=${helpDetails.RelatedUID}`)
    }

    return (
        <div className='flex flex-col  items-center w-11/12 lg:w-[49%] mt-8 bg-white rounded-[14px] p-4 shadow-md'>
            <div className='w-full flex items-center justify-between my-3 h-[40px]  py-2 '>
                <span className='text-[16px] font-medium'>{helpDetails.RelatedName}</span>
                {
                    helpDetails.IsConfirm&&
                    <span className='flex items-center px-3 border text-[14px] border-red-500 text-red-500 rounded-[8px] h-[40px]'>پایان یافت</span>
                }
            </div>
            {/* Progress bar-------------------------- */}
            <Progress className="w-full h-2 bg-gray-200 rounded-full my-6 overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${helpDetails.PercentDebt}%` }}></div>
            </Progress>

            <div className='w-full flex justify-between items-center mb-10 text-[14px] text-secondary600'>
                <span>مبلغ باقی مانده</span>
                <div className='flex '>
                    <span>{FormatNumber(helpDetails.RemainAmount)}</span>
                    <span>ریال</span>
                </div>
            </div>

            <div className='w-full flex justify-between items-center mb-10 text-[14px] text-secondary600'>
                <span>تاریخ اتمام</span>
                <span>{helpDetails.ConfirmDateSH}</span>
            </div>
            {
                helpDetails.IsConfirm||
                <button onClick={detailHandler} className='text-[16px] text-primary400 mr-auto'>مشاهده جزئیات</button>
            }
        </div>
    );
};

export default MyContributionsT;