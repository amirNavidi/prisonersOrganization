import React ,{ useState , useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link.js';
import Image from 'next/image';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';



const UserPassLoginC = () => {
    // let EditphoneNumber =Cookies.get("phoneNumber")
    const inputReference = useRef();
    useEffect(()=>{
    //    inputReference.current.focus();

    },[])
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password , setPassword] =useState('');
    const [passwordError , setPasswordError] =useState('')
    // const [allow, setAllow] = useState(false);
    const [animation, setAnimation] = useState(false);
    const router = useRouter();
    
    const [err , setErr]=useState('');
    const clickHandler =async () => {
        if(!username){
            setUsernameError("نام کاربری نباید خالی باشد ")
        }
        if(!password){
            setPasswordError("کلمه عبور نباید خالی باشد")
        }
        if(username !== '' && password !==''){
            setAnimation(true);
            const response =await fetch('/api/userpasslogin',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            }) 
            const result =await response.json();
            // console.log(result.data[0].ValidityCompanyUID);
            
            if(result.status==200){
                setAnimation(false);
                Cookies.set('Username',username);
                Cookies.set('CustomerUID',result.data[0].CustomerUID);
                Cookies.set('token',result.data[0].code)
                if(result.data[0].IsAdminCustomerSeller){
                    router.push('/admin')
                }else{
                     Cookies.set('ValidityCompanyUID',result.data[0].ValidityCompanyUID);
                     router.push('/accepter')
                }
            }else{
                setErr('نام کاربری یا رمز عبور غلط می باشد')
                setAnimation(false)
            }

        
            }
                   
                }    

                // const handleSubmit = (e) => {
                //     e.preventDefault();
                //     clickHandler();
                // };
                const handleKeyPress = (e) => {
                    if (e.key === 'Enter') {
                        clickHandler();
                    }
                };
                const changeHandler=(ev)=>{
                     setUsername(ev.target.value)
                     setUsernameError('')
                     setErr('')
                }
                const changePasswordhandler =(ev) =>{
                    setPassword(ev.target.value)
                    setPasswordError('')
                    setErr('')
                }
                
                const [eyeState , setEyeState ] =useState(false);

    return (
        <div className='h-screen w-full overflow-hidden '>
            <Head>
                <title>
                ورود
                </title>
            </Head> 
            <div className={`relative z-6 bg-transparent w-full min-h-screen flex justify-center items-center bg-white`}>
            <div className={`w-full h-full md:w-8/12 flex flex-col justify-center items-center`}>
                    <div className={`w-10/12 sm:w-8/12 md:w-7/12 h-full flex flex-col justify-center items-center `}>
                    <div className={`flex flex-col w-[100px] h-[100px] justify-center items-center`}>
                        <Image src={'/images/logo.png'} alt="Logo" height={100} width={85} />
                    </div>
                    <div className={`flex flex-col justify-center items-center mt-3 `}>
                        <span className={`w-full leading-customLH  text-[24px] font-medium text-center`}>
                                به <small className='faNumber text-[24px] text-primary400 font-[900] '>برنامه</small> خوش آمدید!
                            </span>
                            <span className='text-xs my-2'>
                                {/* دنیای جدید مدیریت مالی */}
                            </span>
                    </div>
                    {/*username--------------------------------- */}
                    <div className={`w-full textBox `}>
                            <input  ref={inputReference} style={{direction:"rtl" , backgroundColor:usernameError && "transparent" , border : usernameError && "1px solid red" }} value={ username } type='tel' onChange={changeHandler} className={`Input activeInput w-full faNumber`} />
                            <small style={{top:username && "0%", zIndex:username&&"100" , fontSize :username && "0.8rem" , color :usernameError && "red"  }} className='palaceHolder'>نام کاربری</small>
                            {usernameError && <small className='absolute w-full top-[104%] right-[5px] text-red-500 text-[0.7rem]'>{usernameError}</small>}
                    </div>
                    {/*password --------------------------------- */}
                    <div className={`w-full textBox`}>
                            <input  ref={inputReference} style={{direction:"rtl" , border :passwordError && "1px solid red" }} value={ password } type={eyeState ? 'text' : 'password'} onChange={changePasswordhandler} onKeyDown={handleKeyPress} className={`Input activeInput w-full faNumber`} />
                            <small style={{top:password && "0%", zIndex:password&&"100" , fontSize :password && "0.8rem" , color :passwordError && "red" }} className={'palaceHolder'}>کلمه عبور  </small>
                            {passwordError && <small className='absolute w-full top-[104%] right-[5px] text-red-500 text-[0.7rem]'>{passwordError}</small>}
                            <div className={`absolute left-[10px] top-[50%] translate-y-[-50%] z-10 `}>
                            {eyeState ? <EyeSlash className='cursor-pointer text-gray-600 hover:scale-110' onClick={()=>setEyeState(!eyeState)} />:  <Eye className='cursor-pointer text-gray-600 hover:scale-110' onClick={()=>setEyeState(!eyeState)} />}
                            </div>
                    </div>
                    <div className={`relative w-full flex-col justify-center items-center select-none `}>
                        <button className={`w-full h-[50px]  no-underline select-none top-[50%] text-sm bg-primary400 text-center text-white cursor-pointer mt-[35px] rounded-[10px] border-none transition duration-500 ${ animation && "buttonAnimated"}`} style={{ backgroundColor: animation && "gray" }} onClick={() => clickHandler()}>ورود</button>
                        <small className='block text-center w-full text-[14px] text-red-500 mt-2 '>{err}</small>
                    </div>
                        <Link href={'phonenumberlogin'}>
                            <a className='mt-4 text-sm font-semibold text-gray-600 select-none'>ورود با رمز<small className='text-[15px]  text-Base'> یکبار مصرف</small></a>
                        </Link>
                    </div>
            </div>
            {/* Left Parent----------------------------- */}
            {/* <div className={`col-6 ${styles.leftParent}`}>
                <img  src={'/images/handPhone.png'} alt='handPhone' className={styles.handPhone} />
            </div> */}
            </div>
        </div>
    );
};

export default UserPassLoginC;