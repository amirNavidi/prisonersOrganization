import React, { useState ,useEffect , useRef  } from 'react';
import  Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Image from 'next/image';
// import  handPhone from '../images/handPhone.png'
// import topPicture from '../images/verificationBGC.png'


// counter--------------------------------------------
import { CountdownCircleTimer } from 'react-countdown-circle-timer';




// helpers--------------------------------------------
import { Pencil } from 'react-bootstrap-icons';



const VerificationC = () => {
    // const inputReference = useRef(null);
    const inputRefs = useRef([]);
    const [values, setValues] = useState([]);
    const ID =Cookies.get('Id');


    const handleChange = (e, index) => {
        const value = e.target.value;
        setErrCode('')
        if (/^[0-9]$/.test(value)) {
          const newValues = [...values];
          newValues[index] = value;
          setValues(newValues);
          if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
          }
        }
      };

    const router =useRouter();

    const initialDuration = 120;

    const [key, setKey] = useState(0);
    const [showButton, setShowButton] = useState(false);


    const convertToPersianNumbers = (number) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return number.toString().replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
    };

    const [code , setCode] =useState("");
    const [errCode , setErrCode] =useState("");
    const [load , setLoad]=useState(false)

    useEffect(()=>{
        const getUserPhoneNumber =async()=>{
            const userPhoneNumebr = await fetch('../api/phoneNumberLogin/userinfoes',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ID})
            });
            const phoneNumber = await userPhoneNumebr.json()
            console.log(phoneNumber,"this is use ");
            setPhoneNumber(phoneNumber.usersPhoneNumber)
            }
        getUserPhoneNumber();
    },[])
    const WhichPage =Cookies.get('WhichPage');

    const nextPage = WhichPage ? { whichRoute: WhichPage } : {}

    const [lastLocation , setLastLocation] =useState('');
    useEffect(()=>{
         setLastLocation(sessionStorage.getItem("lastLocation"))
    },[])



    const loginCodeChecker=async ()=>{
        if(!load){
            let res= await fetch('../api/phoneNumberLogin/getMobileValidation',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                } ,
                body:JSON.stringify({ "CustomerMobile": `${phoneNumber}`,"ValidationCode": `${values.join('')}`})
            });
            console.log(nextPage,"nextPage");


            if(res.status===200){
                const data=await res.json();
                const isComplited = data.data[0].IsCompiliteProfile

                Cookies.set('token',data.data[0].code);
                Cookies.set('CustomerUID',data.data[0].CustomerUID);
                Cookies.set('IsComplited',isComplited);


                // if(nextPage?.whichRoute){
                //    Cookies.remove('WhichPage');
                //    return router.push(nextPage?.whichRoute)
                // }
                console.log(lastLocation , "this is last");

                if(lastLocation && lastLocation!=="/phonenumberlogin/verification"){
                    router.push(lastLocation)
                }else{
                    router.push("/profile")
                }
            }else{
                setErrCode("کد صحیح نمی باشد")
                setLoad(false)
            }
        }
    }

    useEffect(()=>{
        let autoVerification = async()=>{
            if(values.length==4){
                if(!load){
                    loginCodeChecker()
                }
              }
        }
        autoVerification();
    },[values.length==4])
    const clickHandler = async ()=>{
       if(!values){
        setErrCode("کد را وارد نمایید ")
       }
       else if(values.length <4 || values.length >4){
        setErrCode("کد چهار رقمی می باشد")
       }
       else{

        if(!load){
            let res= await fetch('../api/phoneNumberLogin/getMobileValidation',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                } ,
                body:JSON.stringify({ "CustomerMobile": `${phoneNumber}`,"ValidationCode": `${values.join('')}`})
            });
            console.log(res,"this is res20");
            if(res.status===200){
                const data=await res.json();
                const isComplited = data.data[0].IsCompiliteProfile

                Cookies.set('token',data.data[0].code);
                Cookies.set('CustomerUID',data.data[0].CustomerUID);
                Cookies.set('IsComplited',isComplited);

                if(lastLocation){
                    router.push(lastLocation)
                }else{
                    router.push("/profile")
                }
            }else{
                setErrCode("کد صحیح نمی باشد")
                setLoad(false)
            }
            }
        }

    }
    const keyDownHandler=(e,index)=>{
        console.log(e);
           if(e.key=='Backspace'){
             if (inputRefs.current[index].value === '' && index > 0) {
                inputRefs.current[index - 1].focus();
            }
           }
    }
    const [phoneNumber, setPhoneNumber] = useState(null);

    const resetTimer =async () => {
        fetch('../api/phoneNumberLogin/sendLoginSMS',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "CustomerMobile":`${phoneNumber}`,
                uuid:ID
            })
             },)
            setKey(prevKey => prevKey + 1);
            setShowButton(false);
            setErrCode("");
            setCode("");
    };
    // focus on verificationCode input-------------------
    useEffect(()=>{
        inputRefs.current[0].focus();
    },[])


    return (
        <div className={` relative w-full  h-screen overflow-hidden flex flex-col  justify-center items-center md:flex-row `}>
                <div className="absolute top-0 left-0 w-full h-[110px] sm:hidden z-10">
                    <Image
                        src="/images/verificationBGC.png"
                        alt="top-picture"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={`w-10/12 sm:w-8/12 h-[75%] min-h-[300px] flex flex-col justify-center items-center `}>
                    <div className={`relative flex flex-col justify-center items-center w-[250px] min-h-[100vh] bg-transparent z-6  `}>
                    <span className={`w-[120%] flex justify-center text-xs leading-customLH text-center `}>کد ارسال شده به شماره  <span className='flex font-semibold text-xs'><Link href='/phonenumberlogin'><span className={` h-full flex  text-xs mx-2 text-primary600`}>  {phoneNumber}<Pencil className='mx-2 ' color='green'/></span></Link></span>را وارد کنید </span>
                    <div className={`w-10/12  flex justify-between mt-[20px] `} style={{direction:"ltr"}}>
                    {Array.from({ length: 4}, (_, index) => (
                            <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={el => (inputRefs.current[index] = el)}
                            onChange={(e)=>handleChange(e,index)}
                            onKeyDown={e=>keyDownHandler(e,index)}
                            className={`w-[40px] h-[40px] text-center mx-[5px] rounded-md text-primary600 focus:outline-none bg-[#E6F6F4]  border border-Base `}
                            onInput={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                e.target.value = value;
                              }}
                            />
                        ))}
                       {/* <ReactCodeInput style={{margin:'0 auto'}} type='number'  fields={4} /> */}
                    </div>
                    <div className={`mt-[25px] mb-[10px] text-gray-600 text-sm `}>
                            <CountdownCircleTimer
                                key={key}
                                isPlaying
                                duration={initialDuration}
                                colors={'red'}
                                colorsTime={[0]}
                                size={0}
                                strokeWidth={1}
                                onComplete={() => setShowButton(true)}
                            >
                                {({ remainingTime }) => (
                                    <div>
                                        {convertToPersianNumbers(Math.floor(remainingTime / 60))}:{convertToPersianNumbers(remainingTime % 60)}
                                    </div>
                                )}
                            </CountdownCircleTimer>
                    </div>
                    {showButton&&<button className={`border-none text-sm mt-[25px] mb-[10px] text-primary600 font-semibold`} onClick={resetTimer}><span className='pl-[5px]  text-[12px] font-semibold text-gray-600'>کد دریافت نشده؟</span>ارسال مجدد</button>}
                    {/* <input ref={inputReference} className={`col-10  ${styles.codePlace}`} onChange={(ev)=>setCode(ev.target.value)} type='text'  placeholder='کد را وارد نمایید' /> */}
                       <button className={ `w-10/12 select-none border-none bg-primary100 text-white text-sm font-semibold rounded-[10px] h-[40px] mt-[20px] `} onClick={clickHandler}> تایید</button>
                        <div className={'text-red-500 text-xs font-semibold h-[20px] mt-2  '}>{errCode}</div>
                        <Link href={'/userpasslogin'}><div className={'mt-[20px] text-sm font-semibold'}>ورود با <small className='text-primary600 text-sm'>نام کاربری و رمز عبور </small></div></Link>
                    </div>
                </div>
                {/* Left Parent------------------------------- */}
                {/* <div className={`col-6 ${styles.leftParent}`}>
                    <img  src={handPhone} alt='handPhone' className={styles.handPhone} />
                </div> */}
        </div>
    );
};

export default VerificationC;
