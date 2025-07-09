import { successToast } from "./ToastifyT";


interface EnterValue {

    ChallengeName:string;
    ChallengeImage:string;
    ShareLink:string;
    Viewers:number | string ;
    Supporters : number | string ;
    TotalAmount:number | string ;
}

const SupportationComponent = ({data}:{data:EnterValue}) => {
    const {ChallengeName , ChallengeImage ,ShareLink , Viewers , Supporters , TotalAmount } =data ;


    const copylink = (links:string) => {
        navigator.clipboard.writeText(links)
    }
    const shareHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        const baseURL = "http://77.104.81.93:8089";
        const makeShareLink =baseURL+ShareLink;
        copylink(makeShareLink)
        successToast("با موفقیت کپی شد");
    }

    return (
        <div className="flex flex-col min-h-[400px] w-full border border-secondary400 rounded-xl overflow-hidden mt-7">
            <img className="w-full h-[150px] bg-black" src={ChallengeImage} alt='challenge-banner' />
            <div className='mt-5 mx-4'>
                <div className="text-base font-bold">
                    <span> پویش </span>
                    <span className='text-tertiary700 '>{ChallengeName}</span>
                </div>
                <span className=" block my-5 text-xs text-secondary600">لینک اشتراک گذاری</span>
                <div className=" flex justify-between rounded-lg overflow-hidden border text-sm h-[42px] bg-secondary100 ">
                    <span className="flex items-center pr-2 w-[70%] text-secondary600">{ShareLink}</span>
                    <button onClick={shareHandler} className=" flex justify-center items-center w-[30%] bg-primary600 text-white text-xs md:text-sm">اشتراک گذاری</button>
                </div>

                <span className=" block mt-5 mb-2 text-xs text-secondary700 ">آمار حاصل از دعوت شما</span>
                <div className=" border border-secondary300 rounded-2xl mb-5">
                    <div className="flex justify-between text-xs p-4 border-b border-secondary300">
                        <span className="text-secondary500">تعداد بازدید ها</span>
                        <div className="flex text-secondary600">
                            <span>n</span>
                            <span>بازدید</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs p-4 border-b border-secondary300">
                        <span className="text-secondary500">حامیان</span>
                        <div className="flex text-secondary600">
                            <span>n</span>
                            <span>نفر</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs p-4 ">
                        <span className="text-secondary500" >مبلغ جمع آوری شده</span>
                        <div className="flex text-secondary600">
                            <span>n</span>
                            <span>ریال</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mb-4">
                    <button className="w-[48%] h-[46px] border-2 text-secondary600 border-secondary600 rounded-lg text-sm">غیر فعالسازی لینک</button>
                    <button className="w-[48%] h-[46px] border-none rounded-lg text-white bg-primary500 text-sm">مشاهده جزئیات</button>
                </div>

             </div>

        </div>
    );
};

export default SupportationComponent;