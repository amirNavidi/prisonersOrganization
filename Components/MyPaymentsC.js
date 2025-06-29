import { useEffect , useState } from "react";
import Cookies from "js-cookie";
import MyPaymentT from "../Template/MyPaymentT";

const MyPaymentsC = ({ setShowData, isDesktop }) => {
    const [active , setActive]=useState(1);
    
    const customerUID = Cookies.get('CustomerUID')
    const token =Cookies.get('token');
    const [returendData , setReturnedData] =useState([]);
    const [status , setStatus] =useState({
        success:[],
        faild:[]
    })
    const getReceipet = async()=>{
        const result =await fetch('/api/get-receipt',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({customerUID , token})
        })
        const data = await result.json();
        const success =data.data.filter(item=>item.IsConfirm)
        const faild =data.data.filter(item=>!item.IsConfirm)
        setReturnedData(data.data);
        setStatus({
            success, 
            faild
        })
        
    }
    useEffect(()=>{
        getReceipet();
    },[]);
    

    return (
        <div className="className='flex flex-col'">
            {
                isDesktop||
                <div className="flex">
                    <button onClick={()=>setShowData(true)} className='flex justify-start mb-5'>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"/></svg>
                    </button>
                    <span className=' text-[20px] mx-auto text-secondary600 mb-5'> پرداخت های من </span>
                </div>
                
            }
            <div className='relative w-full flex  my-[50px]'>
                <button onClick={()=>{setActive(1)}}  className='relative border-b-2 border-[#f0f0f1] flex justify-center w-4/12 text-center '><span className={`${active==1 &&  'absolute w-6/12 border-b-[2px] border-Base text-Base font-semibold' } block   pb-2 `} >موفق</span></button>
                <button onClick={()=>{setActive(2)}}  className='relative border-b-2 border-[#f0f0f1] flex justify-center w-4/12 text-center '><span className={`${active==2  &&  'absolute w-6/12 border-b-[2px] border-Base text-Base font-semibold' } block   pb-2 `} >ناموفق</span></button>
                <button onClick={()=>{setActive(3)}}  className='relative border-b-2 border-[#f0f0f1] flex justify-center w-4/12 text-center '><span className={`${active==3 &&  'absolute w-6/12 border-b-[2px] border-Base text-Base font-semibold' } block   pb-2 `} >نامشخص</span></button>
            </div>
            
            <div className='flex flex-col items-center px-4 lg:px-20'>
                {
                    active ===3 &&<div>مقداری برای نمایش وجود ندارد</div>
                }
                {returendData?.length > 0 && (
                    (active === 1 ? status.success : active === 2 ? status.faild : []).map(item => (
                         <MyPaymentT key={item.HelpRelatedUID} returendData={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPaymentsC;