import { Progress } from "@radix-ui/react-progress";
import { useRouter } from "next/router";
import { FormatNumber } from "../utilities/tomanSeprator";


const PrisonersHelpT = ({helpDetails}) => {
    const router =useRouter();
    const detailHandler=()=>{
          router.push(`/prisoners-detail?prisoner=${helpDetails.RelatedUID}`)
    }

    return (
        <div className='flex flex-col justify-between items-center w-11/12 lg:w-[49%] h-[350px] mt-8 bg-white rounded-[16px] p-4 shadow-md'>
            <div className='w-full flex items-center justify-between my-3 '>
                <div className='text-[20px] font-medium'>
                    {/* <span>زندانی شماره</span> */}
                    <span>{helpDetails.RelatedName}</span>
                </div>
                { helpDetails.IsConfirm &&
                        <span className=' px-3 text-[#3FA34D] text-center  py-2 border border-green-500 bg-[#ECF6ED] rounded-[8px]'>آزاد شده</span>
                }
            </div>
            { helpDetails.IsConfirm &&
                <p className=' w-full mt-3 text-[12px]'>
                به یاری و همراهی شما این زندانی در تاریخ <span>1403/11/20</span> به آغوش خانواده بازگشت .
                </p>
             }
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

export default PrisonersHelpT;