import React ,{ useState , useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link.js';
import { useRouter } from 'next/router.js';
import Head from 'next/head';
import Cookies from 'js-cookie';
// create reandom and hash number---------------------------
import { v4 as uuidv4 } from 'uuid';


const PhoneNumberLoginC = () => {
    const inputReference = useRef();
    const [uuid , setUuid]=useState('')
    useEffect(()=>{
       inputReference.current.focus();
       setUuid(uuidv4())
    },[])


    const router =useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [allow, setAllow] = useState(false);
    const [animation, setAnimation] = useState(false);
    const phoneNumberChecker = (phoneNumber) => {
        let patternNumber = /^09\d{9}$/;
        if (!phoneNumber) {
            setPhoneNumberError("لطفاً شماره موبایل خود را وارد نمایید");
            return false;
        } else if (phoneNumber.length !== 11) {
            setPhoneNumberError("شماره را مجدد بررسی نمایید");
            return false;
        } else if (!patternNumber.test(phoneNumber)) {
            setPhoneNumberError("شماره موبایل حتما باید با 09 شروع شود");
            return false;
        } else if (isNaN(phoneNumber)) {
            setPhoneNumberError("شماره موبایل باید عدد باشد");
            return false;
        } else {
            setPhoneNumberError("");
            setAllow(true);
            return true;
        }
    }
    const clickHandler = () => {
        const isValidPhoneNumber = phoneNumberChecker(phoneNumber);
        if (!isValidPhoneNumber) {
            return;
        }
        if(!animation && !phoneNumberError){
            setAnimation(true);
            fetch('api/phoneNumberLogin/sendLoginSMS',{
               method:'POST',
               headers:{
                   'Content-Type':'application/json'
               },
               body:JSON.stringify({
                   "CustomerMobile":`${phoneNumber}`,
                   uuid
               })
                },).then(res=>{
                   if(res.status==200){
                       setAnimation(false)
                       Cookies.set('Id',uuid)
                       router.push('phonenumberlogin/verification')
                   }else{
                    setAnimation(false)
                   }
                }).catch(err=>{
                   setAnimation(false)
                   console.log("an error acured");

                })

        }
                }

                const handleSubmit = (e) => {
                    e.preventDefault();
                    clickHandler();
                };
                const handleKeyPress = (e) => {
                    if (e.key === 'Enter') {
                        clickHandler();
                    }
                };
                const changeHandler=(ev)=>{
                     setPhoneNumber(ev.target.value);
                     setPhoneNumberError('');
                }
    return(
        <>
        <Head>
            <title>
                    ورود
            </title>
        </Head>
        <div className={`bg-red-800 relative z-6 bg-transparent  w-full min-h[100vh] flex justify-center items-center`}>
        <div className={`w-full h-screen md:w-8/12 flex flex-col justify-center items-center bg-white`}>
                <div className={`w-10/12 sm:w-8/12 md:w-7/12 h-[80%] flex flex-col justify-center items-center`}>
               <div className={`relative flex flex-col w-[100px] h-[100px] justify-center items-center `}>
                                       <Image src={'/images/logo.png'} alt="Logo" className='absolute' layout="fill" />
                                   </div>
                                   <div className={`flex flex-col justify-center items-center mt-3 text-secondary600`}>
                                       <span className={`w-full leading-customLH text-[24px] font-medium text-center`}>
                                           <span>به برنامه خوش آمدید !</span>
                                           </span>
                                           <span className='text-xs my-6'>
                                           سامانه اقدامات حمایتی از زندانیان کل کشور
                                           </span>
                                   </div>

                {/* <div className={`col-10 d-flex flex-column justify-content-center ${styles.phoneParent}`}>
                    <input ref={inputReference} style={{direction:"rtl"}} type='tel' className={`faNumber d-flex align-items-center ${styles.phoneNumber}`}  onKeyDown={handleKeyPress} value={phoneNumber} onChange={(ev) => setPhoneNumber(ev.target.value)} placeholder="شماره موبایل خود را وارد نمایید" />
                    {phoneNumberError && <small className={styles.error}>{phoneNumberError}</small>}
                </div> */}
                {/*phone number--------------------------------- */}
                <div className={`w-full lg:w-2/3 textBox `}>
                    <input  ref={inputReference} style={{direction:"rtl" , border :phoneNumberError && "1px solid red" }} value={isNaN(phoneNumber) ?  setPhoneNumber('') : phoneNumber } type='tel' onChange={changeHandler} onKeyDown={handleKeyPress} className={`Input activeInput w-full`} />
                    <small style={{top:phoneNumber && "0%", zIndex:phoneNumber&&"100" , fontSize :phoneNumber && "0.8rem" , color :phoneNumberError && "red"  }} className={'palaceHolder'}>شماره موبایل</small>
                    {phoneNumberError && <small className={'absolute w-full top-[104%] right-[5px] text-red-500 text-[0.7rem]'}>{phoneNumberError}</small>}
                </div>
                <div className={`relative w-full lg:w-2/3  h-[40px] mt-[35px] flex justify-center items-center select-none `} onClick={() => clickHandler()}>
                    <button className={`w-full h-[50px]  no-underline select-none top-[50%] text-sm bg-primary400  text-center text-white cursor-pointer  rounded-[10px] border-none transition duration-500 ${ animation && "animate-buttonAnimated"}`} style={{ backgroundColor: animation && "gray" }} ></button>
                    <small className='absolute text-white text-lg cursor-pointer' >دریافت کد یکبار مصرف</small>
                </div>
                    <Link href={'#'}>
                        <div className='mt-[40px] text-sm font-semibold text-gray-600 select-none'>ورود با<small className='text-[15px] mr-2 text-primary500'>رمز عبور و نام کاربری</small></div>
                    </Link>
                </div>
        </div>
        {/* Left Parent----------------------------- */}
        {/* <div className={`col-6 ${styles.leftParent}`}>
            <img  src={'/images/handPhone.png'} alt='handPhone' className={styles.handPhone} />
        </div> */}
        </div>
    </>
    )
};

export default PhoneNumberLoginC;
