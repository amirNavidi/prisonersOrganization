import React, { useContext, useEffect } from 'react';
import { FilterContext } from './useContext/filterContext';

const FilterParentT = (props:any) => {
    const { showVal, setShowVal } = useContext(FilterContext);
    useEffect(()=>{
             if(showVal){
                document.body.style.overflow="hidden"
                window.scrollTo(0,0)
             }
             return(()=>{
                document.body.style.overflowY='auto'
             })
        },[showVal])

        const showHandler=()=>{
            setShowVal(false)
        }
        const childHandler =(ev :React.MouseEvent<HTMLDivElement>) =>{
            ev.stopPropagation();
        }
    return (
        <div onClick={showHandler} className='absolute top-0 right-0 z-[3000] h-[100dvh] w-full  flex justify-center items-end sm:items-center backdrop-blur-[5px]  bg-black/30'>
            {
              <div onClick={childHandler} className='flex flex-col w-full sm:w-11/12 md:w-8/12 lg:w-5/12 h-auto max-h-[500px] overflow-y-scroll bg-white rounded-t-xl md:rounded-xl p-4 '>
                {props.children}
              </div>
            }
        </div>
    );
};

export default FilterParentT;