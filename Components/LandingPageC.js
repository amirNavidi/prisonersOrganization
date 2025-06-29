'use client'

import { useEffect , useRef, useState } from 'react';
import Carousel from '../Template/CarouselT';
import ChildParentCardsC from './ChildParentCardsC';
import IranMapT from './IranMap';

const LandingPageC = ({returnedData}) => {
    const [data, setData]=useState({
        whatTheyWant:[],
        whatYouCanDo:[],
        challenge:[],
        organizations:[]
    })

    useEffect(() => {
        const getCardsData = async () => {
            try {
                // const response = await fetch('/api/get-cards-infoes',{
                //     method:'POST',
                //     headers:{'Content-Type':'application/json'},
                //     body:JSON.stringify({"TypeHelpCategory":"Cash,Company,Service,Challenge"})
                // });
                const fetchedData =await returnedData ;
                console.log(fetchedData, "landing page");

                const categorizedData = {
                    whatTheyWant: fetchedData.filter(item => item.TypeHelpCategory === "Cash"),
                    whatYouCanDo: fetchedData.filter(item => item.TypeHelpCategory === "Service"),
                    challenge: fetchedData.filter(item => item.TypeHelpCategory === "Challenge"),
                    organizations: fetchedData.filter(item => item.TypeHelpCategory === "Company"),
                };

                setData(prev => ({ ...prev, ...categorizedData }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getCardsData();
    }, []);



    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRef3 = useRef(null);
    const scrollRef4 = useRef(null);
    return (
        <div>
             <Carousel />
             <div className=' my-[100px] mx-4 lg:mx-[120px]'>
                 <span className='text-[20px] font-semibold'> چرا باید نجات بخش انسان های در بند باشیم؟</span>
                 <p className='text-[16px] text-secondary700 my-8'>تفکرات قالبی اکثر افراد جامعه بر نابهنجار و بد ذات بودن زندانی شکل گرفته است در حالی که بسیاری از آنان را افراد شریفی تشکیل می دهند که به واسطه اشتباهات محاسباتی خود در رفتار فردی، اجتماعی، اقتصادی و ناآگاهی از قوانین و مقررات ، زندان را تجربه می کنند. و خانواده های آنان نیز مجموعه افراد بی گناهی هستند که بواسطه اشتباه سرپرست خود، محکوم به تحمل سختی ها و مشکلاتی من جمله  فقر مالی و ناتوانی در تامین معاش و مخارج زندگی می باشند.</p>
             </div>
             {/* what they need-------------------------- */}
                <span className='mr-[16px] lg:mr-[120px] text-[20px] '>آنچه میخواهند <span className='text-secondary500'> (کمک های نقدی)</span></span>
                <ChildParentCardsC  dataV={{width:200 ,height:200 ,rounded :'12px' , data:data.whatTheyWant ,refNumber:scrollRef1 , pathNameD:'/start-helping'}} />

             {/* what you can---------------------------- */}
             <div className='mt-[60px]'>
                <span className='mr-[16px] lg:mr-[120px] text-[20px]'>آنچه میتوانید <span className='text-secondary500'> (کمک های غیر نقدی)</span></span>
                <ChildParentCardsC dataV={{width:200 ,height:200,rounded :'12px' , data:data.whatYouCanDo ,refNumber:scrollRef2}} />
             </div>
             {/*challenge ------------------------------  */}
             <div className='mt-[60px]'>
                <span className='mr-[16px] lg:mr-[120px] text-[20px]'>چالش ها و پویش ها </span>
                <ChildParentCardsC dataV={{width:382 ,height:334,rounded :'12px' , data:data.challenge ,refNumber:scrollRef3 ,pathNameD:'/choosing-challenge' }} />
             </div>
             {/* organizations-------------------------- */}
             <div className='mt-[60px] mb-[100px]'>
                <span className='mr-[16px] lg:mr-[120px] text-[20px]'>سازمان ها و نهاد های همکار</span>
                <ChildParentCardsC dataV={{width:160 ,height:160 ,rounded :'50%' , data:data.organizations ,refNumber:scrollRef4 ,type:4}} />
             </div>
        </div>
    );
};

export default LandingPageC;