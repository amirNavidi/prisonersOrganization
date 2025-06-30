const MySupportationsC = () => {
    return (
        <div className="flex flex-col">
            <span className="text-xl font-medium">دعوت به حمایت ها</span>
            <span className="text-sm text-secondary600 mt-1">در این بخش می‌توانید تأثیر اشتراک‌گذاری‌ پویش‌هایتان را در جذب حمایت‌ها مشاهده کنید.</span>

            <div className="min-h-[200px] border border-primary500 rounded-xl mt-10 overflow-hidden bg-primary50">
                <div className="h-16 bg-primary400 border-b border-primary500 px-[27px] flex items-center justify-between ">
                   <span className="text-base text-white text-shadow-2xs font-bold ">پویش هایی که تا به امروز به اشتراک گذاشته اید.</span>
                   <span className="text-base text-white text-shadow-2xs font-bold">n  پویش</span>
                </div>
                <div className="flex justify-between items-center h-[130px]">
                    <div className="flex flex-col items-center justify-center w-[32%] h-full border border-red-500">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-secondary50 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20">
                                <path fill="#228b6e" d="M17.74 2.76a4.32 4.32 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.32 4.32 0 0 1 6.1 0M8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0m-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.32 4.32 0 0 1-6.1 0a4.32 4.32 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0" strokeWidth={0.7} stroke="#228b6e"></path>
                            </svg>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default MySupportationsC;