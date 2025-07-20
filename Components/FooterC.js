import Logo from '../public/images/logo.png';
import Image from 'next/image';
import Robika from "../public/images/robika.svg"
import Eta from "../public/images/eta.svg"
import Bale from "../public/images/bale.svg"
import Igap from "../public/images/igap.svg"
import Gap from "../public/images/gap.png"
import Soroush from "../public/images/soroush.svg"
import NavigationButtonC from './NavigationButtonC';
import { useRouter } from 'next/router';


const FooterC = () => {
    const router =useRouter();
    return (
        <div>
            <div className="w-full hidden lg:flex flex-wrap justify-between items-end  lg:px-[120px] h-[380px] pb-12 bg-primary50 ">
                    <div className="flex flex-col items-start w-4/12 bg-transparent text-[16px] mt-4">
                        <Image src={Logo} className="" alt="Flowbite Logo" width={80} height={91} />
                        <p className='my-6'>سازمان زندان‌ها و اقدامات تأمینی و تربیتی کشور سازمانی دولتی برای نظارت بر زندان‌ها در ایران است که به‌طور مستقیم زیر نظر رئیس قوه قضائیه فعالیت می‌کند</p>
                        <div className='flex flex-wrap items-center justify-around  w-10/12 '>
                            {/* <Image src={Robika} width={24} height={28}/> */}


                            <a href='https://t.me/iranprisons' target='_blank'  rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 256 256"><defs><linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stopColor="#2aabee"/><stop offset="100%" stopColor="#229ed9"/></linearGradient></defs><path fill="url(#logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"/><path fill="#fff" d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072" strokeWidth="6.5" stroke="#fff"/></svg>
                            </a>

                            <a title="اینستاگرام" target="_blank" rel="noopener noreferrer"  href="https://instagram.com/iranprisons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60"/><rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60"/><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334" strokeWidth="6.5" stroke="#fff"/><defs><radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stopColor="#fd5"/><stop offset=".1" stopColor="#fd5"/><stop offset=".5" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/></radialGradient><radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse"><stop stopColor="#3771c8"/><stop offset=".128" stopColor="#3771c8"/><stop offset="1" stopColor="#60f" stopOpacity="0"/></radialGradient></defs></g></svg>
                            </a>

                            <a title="بله" target="_blank" rel="noopener noreferrer"  className='flex items-center' href="https://ble.ir/prisons">
                                <Image src={Bale} width={24} height={24}/>
                            </a>

                            <a title="سروش" className='flex items-center' target="_blank" rel="noopener noreferrer"  href="https://splus.ir/Iranprisons">
                                <Image src={Soroush} width={24} height={24}/>
                            </a>

                            <a title="آی گپ" className='flex items-center' target="_blank" rel="noopener noreferrer"  href="https://iGap.net/prisons">
                                <Image src={Igap} width={24} height={24}/>
                            </a>

                            <a title="گپ" className='flex items-center' target="_blank" rel="noopener noreferrer"  href="https://gap.im/prisons">
                                <Image src={Gap} width={24} height={24}/>
                            </a>

                            <a title="ایتا" className='flex items-center' target="_blank" rel="noopener noreferrer"  href="https://eitaa.com/prisonspr">
                                <Image src={Eta} width={24} height={24}/>
                            </a>

                            {/* <a title="خبرخوان" target="_blank" rel="noopener noreferrer"  href="/rss-help">
                            </a> */}

                            <a title="توییتر" target="_blank" rel="noopener noreferrer"  href="https://twitter.com/iranprisons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"/></svg>
                            </a>

                            <a title="آپارات" target="_blank" rel="noopener noreferrer"  href="https://aparat.com/prisons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#E22761" d="M12.001 1.594c-9.27-.003-13.913 11.203-7.36 17.758a10.403 10.403 0 0 0 17.76-7.355c0-5.744-4.655-10.401-10.4-10.403M6.11 6.783c.501-2.598 3.893-3.294 5.376-1.103s-.422 5.082-3.02 4.582A2.97 2.97 0 0 1 6.11 6.783m4.322 8.988c-.504 2.597-3.896 3.288-5.377 1.096s.427-5.08 3.025-4.579a2.97 2.97 0 0 1 2.352 3.483m1.26-2.405c-1.152-.223-1.462-1.727-.491-2.387c.97-.66 2.256.18 2.04 1.334a1.32 1.32 0 0 1-1.548 1.053m6.198 3.838c-.501 2.598-3.893 3.293-5.376 1.103s.421-5.082 3.02-4.583a2.97 2.97 0 0 1 2.356 3.48m-1.967-5.502c-2.598-.501-3.293-3.896-1.102-5.38s5.081.422 4.582 3.02a2.97 2.97 0 0 1-3.48 2.36M13.59 23.264l2.264.61a3.715 3.715 0 0 0 4.543-2.636l.64-2.402a11.38 11.38 0 0 1-7.448 4.428m7.643-19.665l-2.363-.629a11.38 11.38 0 0 1 4.354 7.62l.65-2.459A3.715 3.715 0 0 0 21.231 3.6M.672 13.809l-.541 2.04a3.715 3.715 0 0 0 2.636 4.543l2.107.562a11.38 11.38 0 0 1-4.203-7.145M10.357.702L8.15.126a3.715 3.715 0 0 0-4.547 2.637l-.551 2.082A11.38 11.38 0 0 1 10.358.702" strokeWidth="0.7" stroke="#E22761"/></svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-2/12 bg-transparent text-[16px]">
                        <span className='mb-5'>خدمات حمایتی</span>
                        <span className='mb-5'>چالش ها و پویش ها</span>
                        <span className='mb-5'>باشگاه خیرین</span>
                        <span className=''>نظر سنجی</span>
                    </div>
                    <div className="flex flex-col items-start w-2/12 bg-transparent text-[16px]">
                        <span className='mb-5'>اشتراک گذاری</span>
                        <span className='mb-5'>قوانین و مقرارت </span>
                        <span className='mb-5'>درباره ما </span>
                        <span className=''>تماس با ما</span>
                    </div>
                    <div className="flex flex-col items-start w-3/12 bg-transparent text-[16px]">
                    <span>عضویت در باشگاه خیرین</span>
                    <small className='mb-10 mt-4'>
                        با مهربانی شما، مسیری نو برای بازگشت آغاز می‌شود.
                    </small>
                    <button className='w-full bg-primary500 text-white py-3 rounded-[12px]'>
                            عضویت در باشگاه خیرین
                    </button>
                    </div>
                 <div className='w-full border-t border-primary100 pt-7 text-secondary600'>
                    طراحی و توسعه داده شده در <a target='_blank' rel="noopener noreferrer" href='https://sepandbi.com/' className='text-primary500'>تصمیم یاران بهینه سپند</a>. تمام حقوق اين وب‌سايت متعلق به سازمان زندان ها می باشد.
                 </div>
            </div>
            {
                router.pathname.includes('/choosing-challenge')||
                <div className='w-full block md:hidden'>
                    <NavigationButtonC />
                </div>
            }

        </div>
    );
};

export default FooterC;