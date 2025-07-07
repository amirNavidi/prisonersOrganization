import { useEffect ,useRef,useState } from "react";
import PrisonT from "../Template/PrisonT";
import ChallengeT from "../Template/ChallengeT"
import PulseLoader from "react-spinners/PulseLoader";
import FilterComponent from "./FilterComponent";




const StartHelpingC = () => {
    const [prisoners , setPrisoners] =useState([]);
    const [challenge, setChallenge] = useState([]);
    const [showFilter , setShowFilter] =useState(false);
    const [isLoading , setIsLoading]=useState(false);
    const [showFilterComponent , setShowFilterComponent] =useState(false);

    const PrisonersPart = useRef(null);
    const scrollToElement = () => {
      if (PrisonersPart.current) {
        PrisonersPart.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    useEffect(() => {
        if (prisoners.length > 0) {
          scrollToElement();
        }
      }, [prisoners]);

    const fetchChallenge =async()=>{
        const result =await fetch('/api/get-challenge',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        })
        const data = await result.json();
        setChallenge(data.backendResponse);
        setIsLoading(false);
    }

    const fetchPrisoners =async()=>{
        const response =await fetch('/api/get-prisoners',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        });
        const data = await response.json();
        setPrisoners(data.backendResponse);
    };

    const loadData = async () => {
        try {
            setIsLoading(true);
            const [challengeData, prisonersData] = await Promise.all([
                fetchChallenge(),
                fetchPrisoners(),
            ]);
            if(challengeData||prisonersData){
                setChallenge(challengeData);
                setPrisoners(prisonersData);
                setIsLoading(false)
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        loadData();
    },[])

    useEffect(()=>{
        if(showFilterComponent){
            document.body.style.overflow='hidden'
            window.scrollTo(0,0);
       } else {
            document.body.style.overflowY = 'auto';
       }
       return () => {
        document.body.style.overflowY = 'auto';
    };
    },[showFilterComponent])

    const showFilterHandler=()=>{
        setShowFilterComponent(true)
    }

    const closeFilterHandler=()=>{
        setShowFilterComponent(false)
    }

    if (isLoading) {
        return   <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
                    <PulseLoader
                        color="#1f7e64"
                        margin={5}
                        size={23}
                        />
                 </div>;
    }

    return (
        <>
            {/* banner------------------------------------------------ */}
            <div className="relative flex items-center">
                <span className="absolute right-2 md:right-20  text-white text-lg  md:text-2xl font-semibold">کمک به آزاد سازی زندانیان </span>
                <img
                    src="/images/waysToHelpBanner.jpg"
                    className="w-[100%] h-[100px]  md:h-[200px]"
                    alt="banner"
                    />
            </div>
            <div className=" mr-2 md:mr-20 flex flex-wrap  my-10 ">
                 <span className="text-xl text-primary500 font-bold "> چالش ها و پویش های </span><span className="text-xl font-bold mr-1"> فعال </span>
                 <span className="block w-full mt-3 text-secondary500 ">همراهی در چالش‌ها و کمپین‌های آزادی فعال در تهران</span>
            </div>
            <div className={`flex flex-wrap ${challenge?.length > 3 && 'justify-between'} mt-16 mr-2 md:mr-20 `}>
                {Array.isArray(challenge)&&challenge?.map((item)=>{
                    return(
                        <div key={item.ChallengeUID} className={`w-full sm:w-[45%] lg:w-[31%] mb-8  ${challenge.length<4&&'ml-8'} `}>
                            <ChallengeT data={item} />
                        </div>
                    )
                })}
            </div>

            <div ref={PrisonersPart} className=" mr-2 md:mr-20 flex flex-wrap  mt-20 my-5 ">
                 <span className="text-xl text-primary500 font-bold "> انتخاب زندانی   </span><span className="text-xl font-bold mr-1"> برای آزادی </span>
                 <span className="block w-full mt-3 text-secondary500 ">انتخاب یک زندانی بر اساس شرایط و مشخصات</span>
            </div>

             <button onClick={showFilterHandler} className="w-3/12 md:w-2/12 mr-2 md:mr-20 py-2 px-4  my-4 rounded-xl lg:hidden border-2 text-sm font-medium">
                 فیلترها
             </button>


                {/* prisoners --------------------------------------- */}
                <div className="flex justify-center lg:justify-between mr-2 md:mr-20 mb-28 pl-10">
                    {/* filter Parent-------------------------------- */}
                        <div  className={`w-full lg:w-[20%] pt-16 lg:pt-0 z-[50000] lg:z-0  ${showFilterComponent ? 'fixed inset-0 z-50 bg-white overflow-y-auto lg:relative lg:bg-transparent lg:overflow-visible' : 'hidden lg:block'} mb-5 lg:mb-0`}>
                            {showFilterComponent && (
                                <button
                                    onClick={closeFilterHandler}
                                    className="lg:hidden fixed top-4 left-4 z-60 text-2xl font-bold text-gray-600 hover:text-gray-800"
                                >
                                    ✕
                                </button>
                            )}
                            <FilterComponent setPrisoners={setPrisoners} />
                        </div>
                    <div className="flex flex-wrap justify-center md:justify-around lg:justify-between w-full lg:w-[76%] ">
                        {
                            prisoners?.length>0&&prisoners.map(item=>{
                                return <PrisonT key={item.PrisonerUID} data={item} />
                            })
                        }
                    </div>

                </div>
        </>

    );
};

export default StartHelpingC;