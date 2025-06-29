import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import MyContributionsT from "../Template/MyContributionsT";
import PrisonersHelpT from "../Template/PrisonersHelpT";
import { FormatNumber } from "../utilities/tomanSeprator";
const MyContributionsC = ({ setShowData, isDesktop }) => {
        const customerUID = Cookies.get('CustomerUID')
        const token =Cookies.get('token');
        const [total , setTotal]=useState({
            count:'',
            sumAmount:'',
            prisonars:[],
            challenge:[]
        })

        useEffect(()=>{
            const getTotalData = async ()=>{
                const result =await fetch('/api/get-total-helps',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({token,customerUID})
                })
            const data =await result.json();
          
            
            const prisonars =await data.backendResponse[0].HelpType.filter(item=>item.TypeHelpNameFa!=="چالش");
            const challenge =await data.backendResponse[0].HelpType.filter(item=>item.TypeHelpNameFa=="چالش");
            const count =await data.backendResponse[0].cnt;
            const sumAmount = data.backendResponse[0].SumAmount
            setTotal({
                count,
                sumAmount,
                prisonars ,
                challenge
            })
            
            }
            getTotalData();
        },[])
    
    return (
        <div className='flex flex-col  px-4 lg:px-6'>
             {
                isDesktop||
                <div className="flex">
                    <button onClick={()=>setShowData(true)} className='flex justify-start mb-16'>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"/></svg>
                    </button>
                    <span className=' text-[20px] mx-auto text-secondary600 mb-16'>مشارکت های شما</span>
                </div>
                
            }
            {/* total count and payment---------------- */}
            <div className='flex justify-center w-full border rounded-lg border-primary200 text-[12px] lg:text-[14px] text-secondary600 bg-primary50 h-[74px] mt-'>
                    <div className='border-l border-primary200 w-1/2 flex flex-col items-center justify-center'>
                        <span className='font-bold'>همیاری های من </span>
                        <div>
                            <span>{total.count}</span>
                            <span>بار</span>
                        </div>
                    </div>
              <div className='w-1/2 flex flex-col items-center justify-center'>
                    <div className=' w-1/2 flex flex-col items-center justify-center'>
                        <span className='font-bold'>پرداخت های من </span>
                        <div>
                            <span>{FormatNumber(total.sumAmount)}</span>
                            <span>ریال</span>
                        </div>
                    </div>
              </div>
            </div>
            {/* secound parent-------------------------- */}
            <div className='w-full flex flex-col'>
                {
                    isDesktop&& 
                    <div  className='w-full flex flex-col'>
                        <span className=' text-[20px] text-secondary600 mt-8 mb-1'>مشارکت های شما</span>
                        <span className='text-[16px] text-secondary600'>چالش ها و پویش هایی که شما در آن مشارکت داشته اید</span>
                    </div>
                }
                 <div className={`flex flex-wrap justify-between ${isDesktop|| 'justify-center'}`}>

                   {
                    total.challenge.length > 0 && total.challenge.map(challenges => 
                        Array.isArray(challenges.HelpCachReceipt) && challenges.HelpCachReceipt.length > 0 && 
                        challenges.HelpCachReceipt.map(challenge => (
                            <MyContributionsT helpDetails={challenge} key={challenge.id} /> 
                        ))
                    )
                   }
                 </div>

                 {
                    total.prisonars.length> 0 && total.prisonars.map(prisoners=>{
                            return (
                                <>
                                    <span className='text-[20px] mt-8'>
                                        {prisoners.TypeHelpNameFa}
                                    </span>
                                    <div className='flex flex-col items-center lg:flex-row lg:justify-between'>
                                        {
                                        Array.isArray(prisoners.HelpCachReceipt) && prisoners.HelpCachReceipt.length >0  && prisoners.HelpCachReceipt.map(prisoner=>{
                                            return(
                                                <PrisonersHelpT key={prisoner} helpDetails={prisoner} /> 
                                            )
                                        })
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                 
               
            </div>
            <div></div>
        </div>
    );
};

export default MyContributionsC;