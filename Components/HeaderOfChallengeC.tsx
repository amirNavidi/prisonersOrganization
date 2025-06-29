import Image from 'next/image';
import {useState , useEffect } from 'react'

const HeaderOfChallengeC = () => {
    const [ topeSupporter , setTopSupporter ] =useState([{1:1,color:"red"},{2:2,color:"blue"},{3:3,color:"green"}]);
    return (
        <div className='h-16 w-full flex items-center justify-between px-4 border-b boreder-secondary600 '>
                <div className='relative flex justify-between'>
                    {
                        topeSupporter.map((i , index)=>{
                        return(
                            // <button className={`relative flex items-center flex-row-reverse justify-center w-8  h-8 p-[1px] z-[${30-(index*10)}] mr-[-10px] rounded-full border border-gray-900 outline-none`}>
                            //     {/* <Image width={40} height={40} alt='supporterPicture' src={"/#"} /> */}
                            //     <div className={`w-full h-full border rounded-full border-red-500 bg bg-[${i.color}]`}></div>
                            //     <span className='absolute  -top-4 text-xs text-secondary600 font-normal '>{index}</span>
                            // </button>
                            <button key={index} className={`group relative flex items-center flex-row-reverse justify-center w-8 h-8 p-[1px] z-[${30 - (index * 10)}] mr-[-10px] rounded-full border border-gray-900 outline-none`}>
                            {/* <Image width={40} height={40} alt='supporterPicture' src={"/#"} /> */}
                            <div className={`w-full h-full border rounded-full border-red-500 bg bg-[${i.color}]`}></div>

                            <span className='absolute -top-4 text-xs text-secondary600 font-normal hidden group-hover:block'>
                                {index}
                            </span>
                            </button>

                                )
                            })
                    }
                </div>
            <span className='text-xs text-primary500 font-normal '>
                حامیان برتر
            </span>

        </div>
    );
};

export default HeaderOfChallengeC;