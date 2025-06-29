import React, {  useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { FormatNumber } from '../utilities/tomanSeprator';
import UserInfoesC from './UserInfoesC';
import MyContributionsC from './MyContributionsC';
import MyPaymentsC from './MyPaymentsC';
import { successToast } from '../Template/ToastifyT';
import { useRouter } from 'next/router';
import TokenChecker from '../utilities/TokenChecher';
import PulseLoader from "react-spinners/PulseLoader";
import ExitConfirmC from './ExitConfirmC';
import MyChallengeC from './MyChallengeC';


const ProfileC = () => {
    const [phoneNumber , setPhoneNumber] =useState('');
    const ID =Cookies.get('Id');
    // validation---------------------------------
    const router=useRouter();
    const [load , setLoad] =useState(true);
    const CustomerUID = Cookies.get('CustomerUID');
    const token =Cookies.get('token');

    useEffect(()=>{
        const checkToken =async ()=>{
           const isValid = await TokenChecker(CustomerUID , token , 'SuccessPay' );
           if(isValid.status==200){
             setLoad(false);
           }else{
              router.push('/phonenumberlogin')
           }
        }

        checkToken();
    },[])

    useEffect(()=>{
            const getUserPhoneNumber =async()=>{
                const userPhoneNumebr = await fetch('/api/phoneNumberLogin/userinfoes',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ID})
                });
                const phoneNumber = await userPhoneNumebr.json()
                setPhoneNumber(phoneNumber.usersPhoneNumber)
                }
            getUserPhoneNumber();
        },[]);
        // describe every number ============================
        const [witchTab , setWitchTab] =useState(1);

        // 1 User infoes
        // 2 My contributions
        // 3 My payments

        // ==================================================


        const renderComponent = () => {
            switch (witchTab) {
                case 1:
                    return <UserInfoesC setShowData={setShowData} isDesktop={isDesktop} />;
                case 2:
                    return <MyContributionsC setShowData={setShowData} isDesktop={isDesktop} />;
                case 3:
                    return <MyPaymentsC setShowData={setShowData} isDesktop={isDesktop}/>;
                case 4:
                    return <MyChallengeC setShowData={setShowData} isDesktop={isDesktop}/>
                default:
                    return <UserInfoesC setShowData={setShowData} isDesktop={isDesktop}/>;
            }
        };


        const [showData , setShowData] =useState()
        const clickHandler =(val) =>{
               setShowData(false);
               setWitchTab(val);
            }
        const [dynamicStyle , setDynamicStyle] =useState();
        const [isDesktop , setIsDesktop] =useState(true)
        useEffect(() => {
            const handleResize = () => {
              if (window.innerWidth > 1024) {
                setShowData(false);
                setIsDesktop(true)

              } else{
                setShowData(true)
                setIsDesktop(false)

              }
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
              window.removeEventListener("resize", handleResize);
            };
          }, []);
          useEffect(()=>{
            if(!showData && isDesktop){
                setDynamicStyle({
                    position: 'relative',
                    height: 'auto',
                    backgroundColor: 'transparent',
                    zIndex: '10',
                    width: '65%',
                  })
            }else if(!showData && !isDesktop){
                setDynamicStyle({
                    position: 'absolute',
                    minHeight: '150vh',
                    right: '0',
                    top: '0',
                    backgroundColor: '#F7F8FF',
                    zIndex: '1000',
                    width: '100%',
                  })
            }else if(showData&&!isDesktop){
                setDynamicStyle({
                    display:'none',
                })
            }
        },[showData]);
        const [showExit , setShowExit] =useState(false);
          const exitHandler =async()=>{
            setShowExit(true)
          }

    if(load){
        return (
            <div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-white z-[200000] '>
                   <PulseLoader
                    color="#1f7e64"
                    margin={5}
                    size={23}
                    />
            </div>
        )
    }
    return (

        <div className='flex flex-col lg:flex-row  xl:mx-[135px] m-4 justify-center lg:justify-between'>
            {
                showExit&&<ExitConfirmC showExit={showExit} setShowExit={setShowExit} />
            }
               {/*First Parent ------------------------------  */}
               <div className='flex max-h-[730px] flex-col pb-6 mb-24 lg:mb-4 lg:w-4/12 py-4 border border-secondary600 rounded-[10px]'>
                   <div className='flex justify-between px-9 h-[64px] items-center'>
                      <div  className='flex flex-col' >
                          <span  className='text-[20px] text-secondary600'>نام کاربری</span>
                          <span className='text-[16px] text-secondary600'>{phoneNumber}</span>
                      </div>
                      <button onClick={()=>clickHandler(1)} className='w-10 h-10 flex justify-center items-center border border-primary500 rounded-[12px]  '>
                         <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#5486EA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 20h16M4 20v-4L14.869 5.131l.001-.001c.395-.395.593-.593.821-.667a1 1 0 0 1 .618 0c.228.074.425.272.82.666l1.74 1.74c.396.396.594.594.668.822a1 1 0 0 1 0 .618c-.074.228-.272.426-.668.822h0L8 20.001z"/></svg>
                      </button>
                   </div>
                   <div  className='mt-8 w-full px-9 flex justify-between items-center'>
                      <span className='text-[20px] text-secondary600'>همراهی ها من </span>
                      <div className='flex'>
                         <span className='text-[20px]'>{FormatNumber('1000000')}</span>
                         <span>ریال</span>
                      </div>
                   </div>


                   <hr className=' my-6 border-b-2'/>


                   {/* Helps----------------------------- */}
                   <div className='flex flex-col '>
                         <span className='text-[16px] text-secondary600  px-9'>یاری ها </span>
                         <div style={{color:witchTab==2&&'#004adf'}} onClick={()=>clickHandler(2)} className='flex justify-between cursor-pointer  px-9 items-center text-[16px] text-secondary600  my-4'>
                            <div  className='flex'>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328a6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101l-7.764-7.791a6.5 6.5 0 0 1 .34-8.826m1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.305l-3.535-3.534l-1.06 1.06a3 3 0 0 1-4.244-4.242l2.102-2.103a4.5 4.5 0 0 0-5.837.189zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242l.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146l-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078z"/></svg></span>
                                <span className='mr-3'>مشارکت ها </span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                         <hr className='border-b-2  mx-9'/>
                         <div style={{color:witchTab==3&&'#004adf'}} onClick={()=>clickHandler(3)} className='flex justify-between items-center text-[16px] cursor-pointer px-9 text-secondary600  my-4'>
                            <div className='flex '>
                                <span><svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 13.75a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75M3 5h.014A2.25 2.25 0 0 1 5.25 3h11.5A2.25 2.25 0 0 1 19 5.25v.837a3.25 3.25 0 0 1 2.5 3.163v8.5A3.25 3.25 0 0 1 18.25 21h-12A3.25 3.25 0 0 1 3 17.75zm15.25 2.5H4.5v10.25c0 .966.784 1.75 1.75 1.75h12A1.75 1.75 0 0 0 20 17.75v-8.5a1.75 1.75 0 0 0-1.75-1.75M17.5 6v-.75a.75.75 0 0 0-.75-.75H5.25a.75.75 0 0 0 0 1.5z"/></svg></span>
                                <span className='mr-3'>پرداخت ها</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                         <hr className='border-b-2'/>

                         <span className='text-[16px] text-secondary600 my-4 px-9'>پویش ها </span>
                         <div style={{color:witchTab==4&&'#004adf'}} onClick={()=>clickHandler(4)} className='flex justify-between cursor-pointer  px-9 items-center text-[16px] text-secondary600'>
                            <div  className='flex'>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328a6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101l-7.764-7.791a6.5 6.5 0 0 1 .34-8.826m1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.305l-3.535-3.534l-1.06 1.06a3 3 0 0 1-4.244-4.242l2.102-2.103a4.5 4.5 0 0 0-5.837.189zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242l.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146l-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078z"/></svg></span>
                                <span className='mr-3 '> همه پویش ها </span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                         <hr className='border-b-2 mt-4'/>



                         <span className='text-[16px] text-secondary600 my-6 px-9'>حساب ها</span>
                         <div style={{color:'#d9d9d9'}} className='flex justify-between cursor-pointer  px-9 items-center text-[16px] text-secondary600  my-4'>
                            <div className='flex   '>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.25 16a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75"/><path fill="currentColor" d="M3.25 11.715v-.924c0-.658 0-1.193.032-1.632c.033-.454.103-.856.269-1.244a3.75 3.75 0 0 1 1.24-1.559c.34-.248.716-.407 1.152-.541c.42-.13.94-.25 1.582-.398l3.462-.8c.974-.224 1.754-.404 2.388-.493c.647-.09 1.226-.1 1.778.079a3.75 3.75 0 0 1 2.065 1.642c.137.23.236.472.309.73a3.75 3.75 0 0 1 1.938 1.99c.158.382.224.786.255 1.242c.03.432.03.96.03 1.611a1.75 1.75 0 0 1 0 3.164c0 .65 0 1.179-.03 1.61c-.031.457-.097.86-.255 1.243a3.75 3.75 0 0 1-2.03 2.03c-.382.158-.786.224-1.242.255c-.445.03-.99.03-1.666.03h-5.76c-.812 0-1.468 0-1.998-.043c-.547-.045-1.027-.14-1.471-.366a3.75 3.75 0 0 1-1.64-1.639c-.226-.444-.32-.924-.365-1.47c-.043-.531-.043-1.187-.043-2zm8.04-5.627l-.705.162h3.954c.425 0 .797 0 1.126.008a2.25 2.25 0 0 0-.973-.628c-.238-.077-.555-.098-1.11-.02c-.56.078-1.275.243-2.293.478m2.942 1.662H8.8c-.852 0-1.447 0-1.91.038c-.453.037-.714.107-.911.207a2.24 2.24 0 0 0-1.02 1.06c-.081.19-.138.439-.17.836l-.013.18c-.026.435-.026.983-.026 1.729v2.4c0 .853 0 1.447.038 1.91c.037.453.107.714.207.912c.216.423.56.767.984.983c.197.1.458.17.912.207c.462.037 1.057.038 1.909.038h5.7c.71 0 1.204 0 1.59-.027c.38-.026.602-.074.771-.144a2.25 2.25 0 0 0 1.218-1.218c.07-.169.118-.39.144-.77c.023-.34.027-.763.027-1.341H17a1.75 1.75 0 1 1 0-3.5h1.25c0-.578-.004-1-.027-1.34c-.026-.38-.074-.602-.144-.771a2.25 2.25 0 0 0-1.236-1.225l-.141-.036c-.473-.121-1.145-.128-2.47-.128M16.75 13c0 .138.112.25.25.25h2a.25.25 0 1 0 0-.5h-2a.25.25 0 0 0-.25.25"/></svg></span>
                                <span className='mr-3'>کیف پول</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                         <hr className='border-b-2  mx-9'/>

                        <div style={{color:'#d9d9d9'}} className='flex justify-between cursor-pointer px-9 items-center text-[16px] text-secondary600  my-4'>
                            <div className='flex   '>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 22v-7.1a7 7 0 0 0-2.052-4.95L14.998 8v6.587c0 .89-1.077 1.337-1.707.707L11.996 14c-.5-.5-1.701-.8-2.502 0s-.5 2 0 2.5l5.504 5.5"/><path d="M11 2h2a2 2 0 0 1 2 2v2m-4-4c0 1.333.8 4 4 4m-4-4H9m6 4v6M5 12v2a2 2 0 0 0 2 2h2c0-1.333-.8-4-4-4m0 0V6m4-4H7a2 2 0 0 0-2 2v2m4-4c0 1.333-.8 4-4 4"/><circle cx="10" cy="9" r="1" transform="rotate(90 10 9)"/></g></svg></span>
                                <span className='mr-3'>پرداخت خودکار</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                         <hr className='border-b-2  mx-9'/>

                         <div style={{color:'#d9d9d9'}} className='flex justify-between cursor-pointer px-9 items-center text-[16px] text-secondary600  my-4'>
                            <div className='flex   '>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 0H8C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6zm4 18H8V2h7v5h5zM4 4v18h16v2H4c-1.1 0-2-.9-2-2V4zm6 6v2h8v-2zm0 4v2h5v-2z"/></svg></span>
                                <span className='mr-3'>پرونده های من </span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                         <hr className='border-b-2  mx-9'/>
                         <div  className='flex justify-between cursor-pointer  px-9 items-center text-[16px] text-secondary600  mt-4'>
                            <div className='flex   '>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 3a1 1 0 0 1 .117 1.993L12 5H7a1 1 0 0 0-.993.883L6 6v12a1 1 0 0 0 .883.993L7 19h4.5a1 1 0 0 1 .117 1.993L11.5 21H7a3 3 0 0 1-2.995-2.824L4 18V6a3 3 0 0 1 2.824-2.995L7 3zm5.707 5.464l2.828 2.829a1 1 0 0 1 0 1.414l-2.828 2.829a1 1 0 1 1-1.414-1.415L17.414 13H12a1 1 0 1 1 0-2h5.414l-1.121-1.121a1 1 0 0 1 1.414-1.415"/></g></svg></span>
                                <button onClick={exitHandler} className='mr-3'>خروج از حساب کاربری</button>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"/></svg>
                         </div>
                   </div>
               </div>
            {/* secound parent------------------------------------------ */}
                <div
                        style={dynamicStyle}
                        className="flex flex-col pb-6 mb-24 lg:mb-4 b  py-4 border border-secondary600 rounded-[10px]  px-4"
                        >
                        {renderComponent()}
                </div>
        </div>
                );
            };

export default ProfileC;