import { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator'


const InviteWithQRCodeT = () => {

    const [showQRCode , setShowQRCode] =useState<boolean>(false)
    const supportHandler =()=>{
        // after call api and get success response--------------------------------
         setShowQRCode(true);

    }
    return (
         <div className="flex flex-col">
            <span className="font-bold text-secondary600">
                اشتراک گذاری
            </span>
            <span className="text-xs text-secondary600 mt-4">
                در اشتراک‌گذاری عادی صرفاً لینک پویش را منتشر می‌کنید، اما با "دعوت به حمایت" می‌توانید تأثیر خود را از طریق مشاهده تعداد حامیان و مبالغ جذب‌شده دنبال کنید.
            </span>
             <span className="font-bold text-secondary600 mt-10">
                 اشتراک گذاری QR Code
            </span>
            {
                showQRCode?<QRCodeGenerator value='test' />:<button onClick={supportHandler} className='w-full h-12 rounded-lg bg-primary500 text-white mt-10'>حمایت میکنم</button>
            }
        </div>
    );
};

export default InviteWithQRCodeT;