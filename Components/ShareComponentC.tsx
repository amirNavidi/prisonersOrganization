// import React, { useContext, useState } from 'react';
// import { FilterContext } from '../Template/useContext/filterContext';
// import ShareWithLinkT from '../Template/ShareWithLinkT';
// import InviteWithQRCodeT from '../Template/InviteWithQRCodeT'



// const ShareComponentC = () => {
//     const { showVal, setShowVal , pageContent , setPageContent , isLogin  } = useContext(FilterContext);




//     return (
//         <div className='flex flex-col p-4'>
//             <div className={`w-full justify-between p-1 h-14  flex text-secondary600  rounded-lg mb-10 ${isLogin?'bg-primary50':'bg-secondary300'}`}>
//                 <button onClick={()=>setPageContent(1)} className={`w-[48%]  ${pageContent==1&&'bg-white rounded-lg'}`}>اشتراک گذاری</button>
//                 <button onClick={()=>isLogin&&setPageContent(2)} className={`w-[48%] ${isLogin||'text-secondary500'} ${pageContent==2&&'bg-white rounded-lg'}`}>دعوت به حمایت</button>
//             </div>

//             {
//                 pageContent==1? <ShareWithLinkT ShareLink='test' /> : <InviteWithQRCodeT />
//             }
//         </div>
//     );
// };

// export default ShareComponentC;
import React, { useContext, useState } from 'react';
import { FilterContext } from '../Template/useContext/filterContext';
import ShareWithLinkT from '../Template/ShareWithLinkT';
import InviteWithQRCodeT from '../Template/InviteWithQRCodeT';

const ShareComponentC = () => {
    const { showVal, setShowVal, pageContent, setPageContent, isLogin } = useContext(FilterContext);

    return (
        <div className='flex flex-col p-4'>
            <div className={`w-full justify-between p-1 h-14 flex text-secondary600 rounded-lg mb-10 ${isLogin ? 'bg-primary50' : 'bg-secondary300'}`}>
                <button
                    onClick={() => setPageContent(1)}
                    className={`w-[48%] ${pageContent == 1 && 'bg-white rounded-lg'}`}
                >
                    اشتراک گذاری
                </button>

                <button
                    onClick={() => isLogin && setPageContent(2)}
                    className={`w-[48%] ${isLogin || 'text-secondary500'} ${pageContent == 2 && 'bg-white rounded-lg'} ${!isLogin && 'cursor-not-allowed'}`}
                    title={!isLogin ? 'ابتدا وارد حساب کاربری خود شوید' : ''}
                    disabled={!isLogin}
                >
                    دعوت به حمایت
                </button>
            </div>

            {
                pageContent == 1 ? <ShareWithLinkT ShareLink='test' /> : <InviteWithQRCodeT />
            }
        </div>
    );
};

export default ShareComponentC;