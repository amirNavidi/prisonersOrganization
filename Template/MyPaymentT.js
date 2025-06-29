import { FormatNumber } from "../utilities/tomanSeprator";

const MyPaymentT = ({returendData}) => {
 
    return (
        <div className='w-full px-7 rounded-[16px] bg-white mb-8'>
            <div className='flex justify-between items-center text-[18px] font-semibold mt-6 '>
                <div>
                    {/* <span>کمک به زندانی</span>
                    <span>124</span> */}
                    <span>
                        {returendData.TypeHelpNameFa}
                    </span>
                </div>
                {
                    returendData.IsConfirm ? <span className=' px-5 py-3 rounded-[8px] text-[#368B41] bg-[#ECF6ED]'> 
                    موفق
                </span> :<span className=' px-5 py-3 rounded-[8px] text-red-800 bg-red-200'> 
                    ناموفق
                </span>
                }
  
            </div>

            <div className='text-[14px] text-secondary500 mb-10'>
                <span>{returendData.ConfirmDateSH}</span>
                <span className='mx-4'>|</span>
                <span>{returendData.ConfirmTime}</span>
            </div>

            <div className='flex justify-between items-center text-[14px] text-secondary600 my-6'>
                <span>مبلغ دریافت شده</span>
                <div>
                    <span>{FormatNumber(returendData.Amount)}</span>
                    <span>ریال</span>
                </div>
            </div>
            <div className='flex justify-between items-center text-[14px] text-secondary600 my-6'>
                <span>نام بانی</span>
                <span>{returendData.UserFullName}</span>
            </div> 
        </div>
    );
};

export default MyPaymentT;