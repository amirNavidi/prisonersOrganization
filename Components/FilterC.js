import { useEffect, useState } from "react";
import AccordionT from "../Template/AccordionT";

const FilterC = ({setShowFilter , setPrisoners, showFilter}) => {
    const [location , setLocation] =useState({
        province:[] , 
        city:[]
    })
   

    const getProvince =async()=>{
      const result =await fetch('/api/get-location',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({location:'GetProvinces'})
        })
        const data=await result.json();
        setLocation((prev)=>{
            return {
                ...prev , 
                province:data.data
            }
        })
        
    }  
 
    
    useEffect(()=>{
       getProvince();
    },[])


    return (
        <div onClick={()=>setShowFilter(false)} className='fixed inset-0 z-[2000] w-screen h-screen flex justify-center items-end md:items-center bg-black/10 backdrop-blur-sm '>
            <div onClick={(ev)=>ev.stopPropagation()} className=' flex flex-col w-11/12 md:w-9/12 lg:w-4/12 h-[400px] bg-white rounded-t-[16px] md:rounded-[16px] overflow-y-scroll scrollbar-hide'>
                    <div className='flex items-center justify-between text-black h-[60px] border-b-2 border-gray '>
                        <div className='flex'>
                            <svg className='mr-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"/></svg>
                            <span className='mr-2'>فیلتر ها</span>
                        </div>
                        <button onClick={()=>{setShowFilter(false)}}>
                           <svg className='ml-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="#000" fillRule="evenodd" d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z" strokeWidth="13" stroke="#000"/></svg>
                        </button>
                    </div>

                    {/* province ------------------------------ */}
                    <div className="overflow-y-auto max-h-[calc(100%-60px)]">
                        <AccordionT setPrisoners={setPrisoners} setShowFilter={setShowFilter}  provinces={location.province} />
                    </div>
            </div>
        </div>
    );
};

export default FilterC;

