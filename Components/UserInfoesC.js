import { useEffect, useState } from "react";
import { nationalCodeChecker ,phoneNumberChecker } from "../utilities/formatChecker";
import { DateInput } from "react-hichestan-datetimepicker";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { errorToast, successToast } from "../Template/ToastifyT";
import ExitConfirmC from "./ExitConfirmC";



const UserInfoesC = ({ setShowData, isDesktop }) => {
    // const {setShowData , isDesktop}=setData;
    const customerUID = Cookies.get('CustomerUID')
    const token =Cookies.get('token');
    const [userInfoes, setUserInfoes] =useState({
        username:'',
        phoneNumber:'',
        nationalCode:'',
        birthDate:''
    });
 useEffect(()=>{
    const getUserInfoe = async()=>{
        const result =await fetch('/api/get-profile',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            customerUID,
            LoginToken:token
        })
        })
        let data =await result.json();
        console.log(data);

        if(Array.isArray(data?.data) && data.data.length > 0){
            return  setUserInfoes({
                    username:data?.data[0].CustomerFirstName,
                    phoneNumber:data?.data[0].CustomerMobile,
                    nationalCode:data?.data[0].CustomerNationalCode,
                    birthDate:data?.data[0].CustomerBirthDate
                })
        }return



    }
      getUserInfoe()
    },[])
;

    const {username , phoneNumber , nationalCode , birthDate} =userInfoes;
    const infoHandler=(ev)=>{
        setUserInfoes((prev)=>{
           return{
                ...prev,
                [ev.target.dataset.info]:ev.target.value
           }
        })
    }
    const [err ,setErr]=useState('')

    const saveHandler =async()=>{
        var error=''
        if(!username||!phoneNumber||!nationalCode||!birthDate){
            error ='تمامی مقادیر را کامل نمایید '
        }else{
            if(phoneNumberChecker(phoneNumber)){
                error = 'شماره تلفن را بررسی نمایید'
            }else if(nationalCodeChecker(nationalCode)){
                 error ='کد ملی را بررسی نمایید '
            }
        }
        setErr(error);
        if(!error){

            const result = await fetch('/api/set-profile',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({customerUID,LoginToken:token,MobileNumber:phoneNumber,BirthDate:birthDate,NationalCode:nationalCode,FirstName:username})
            })
            let res = await result.json();
            if(res.status==200){
                successToast('عملیات موفق')
            }else{
                errorToast('خطا')
            }
        }
    }
    const dateHandler=(ev)=>{
        setUserInfoes((prev)=>{
            return{
                ...prev,
                birthDate:ev.target.value
            }
        })
    }
        const router =useRouter();
        const [showExit , setShowExit] =useState(false);
        const exitHandler =async()=>{
        setShowExit(true)
        }
    return (
        <div className='flex flex-col'>
             {
                showExit&&<ExitConfirmC showExit={showExit} setShowExit={setShowExit} />
            }
            {
                isDesktop||
                <div className="flex">
                    <button onClick={()=>setShowData(true)} className='flex justify-start mb-16'>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M13.292 12L9.046 7.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354z"/></svg>
                    </button>
                    <span className=' text-[20px] mx-auto text-secondary600 mb-16'>مشخصات من</span>
                </div>

            }
            {
               isDesktop&&
               <span className=' text-[20px] text-secondary600 my-8'>مشخصات من</span>
            }


            {/* user name------------------------------------------------ */}
            <div className='flex flex-col items-start'>
                <label className='text-[16px] text-secondary600'>نام کاربری</label>
                <input value={username} onChange={(ev)=>infoHandler(ev)} data-info="username" className='w-full h-[54px] pr-4 mt-4 outline-none mb-8 bg-transparent  border border-secondary500 rounded-[8px]' type="text" />
            </div>

            {/* phone number--------------------------------------------- */}
            <div className='flex flex-col items-start'>
                <label className='text-[16px] text-secondary600'>شماره تلفن همراه</label>
                <p className='w-full flex items-center text-secondary600 pr-4 h-[54px] outline-none mt-4 mb-8 bg-secondary400  border border-secondary500 rounded-[8px]'  >{phoneNumber}</p>
            </div>

            {/* national code and birth date ----------------------------- */}
            <div className='flex flex-wrap justify-between'>
                <div className='flex flex-col items-start w-full lg:w-[48%]'>
                    <label className='text-[16px] text-secondary600'>کد ملی</label>
                    <input value={nationalCode} onChange={infoHandler} data-info='nationalCode' className='w-full pr-4 h-[54px] outline-none mt-4 mb-8 bg-transparent  border border-secondary500 rounded-[8px]' type="tell" />
                </div>
                <div className='flex flex-col items-start w-full lg:w-[48%]'>
                    <label className='text-[16px] text-secondary600'>تاریخ تولد</label>
                    {/* <input value={birthDate} onChange={infoHandler} data-info='birthDate' className='w-full pr-4 h-[54px] outline-none mt-4 mb-8 bg-transparent  border border-secondary500 rounded-[8px]' type="tell" /> */}
                    <DateInput
                        // readOnly={inquiryAnswer?true:false}
                        className='w-full pr-4 h-[54px] outline-none mt-4 mb-8 bg-transparent  border border-secondary500 rounded-[8px]'
                        value={birthDate}
                        name='birthDate'
                        onChange={dateHandler}
                        />
                </div>
            </div>

            {/* buttons ------------------------------------------------------ */}
            <div className='flex justify-center mt-14'>
                <div className='  w-[47%]  md:w-3/12'>
                    <button onClick={saveHandler} className=' w-full h-[55px]  text-[12px] text-white rounded-[8px] bg-primary500 '>
                        تایید
                    </button>
                    <span className='text-red-500 mr-1 mt-1 text-[12px]'>{err}</span>
                </div>
                <button onClick={exitHandler} className='w-[47%] h-[55px] text-[12px] text-secondary600  md:w-3/12 mr-3 rounded-[8px] border border-secondary600'>
                      خروج از حساب کاربری
                </button>
            </div>

        </div>
    );
};

export default UserInfoesC;