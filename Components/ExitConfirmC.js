import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { successToast } from "../Template/ToastifyT";

const ExitConfirmC = ({showExit , setShowExit}) => {
    
    const router = useRouter();
    
    useEffect(()=>{
        if (showExit) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0)
        }
        return () => {
            document.body.style.overflowY = 'auto ';
        };
    },[showExit]);

    const customerUID = Cookies.get('CustomerUID');
    const token =Cookies.get('token');
    const exitHandler = async()=>{
            const result = await fetch('/api/get-exit',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    token ,
                    customerUID
                })
            })
            const data =await result.json();
            if(data.status==200){
                successToast('خروج موفق');
                router.push('/')
            } 
    }
    return (
        <div className='fixed z-[3000] inset-0 w-screen h-screen flex justify-center items-center bg-black/5 backdrop-blur-sm  '>
            <div className=' opacity-1 w-11/12 sm:w-8/12 lg:w-5/12 h-[200px] bg-white rounded-t-[16px] sm:rounded-[16px]'>
                <span className='block text-gray-500 text-center mt-7 mb-16'>آیا مطمئنید میخواهید از حساب کاربری خارج شوید؟</span>

                <div className='flex justify-around'>
                    <button onClick={()=>setShowExit(false)} className='w-[154px] h-[50px] text-red-400 border border-red-500 px-3 py-2 rounded-[10px]' >انصراف</button>
                    <button onClick={exitHandler} className='w-[154px] h-[50px] text-red-400 border border-red-500 px-3 py-2 rounded-[10px]' > خروج</button>
                </div>

            </div>
        </div>
    );
};

export default ExitConfirmC;