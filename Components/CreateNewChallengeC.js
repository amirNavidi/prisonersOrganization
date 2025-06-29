import { useState , useEffect } from "react";
import { DateInput } from "react-hichestan-datetimepicker";
import Image from "next/image";
import { ToRial } from "../utilities/tomanSeprator";
import Cookies from "js-cookie";
import { errorToast, successToast } from "../Template/ToastifyT";
import { ArrowLeftRight, PencilFill } from "react-bootstrap-icons";

const CreateNewChallengeC = ({setCreateMod }) => {
    const CustomerUID = Cookies.get('CustomerUID');
    const LoginToken =Cookies.get('token');
    const SelectedChallenge =Cookies.get("SelectedChallenge");

    const [challengeInfoes , setChallengeInfoes] =useState({
        ChallengeName:"",
        ChallengePrice:"",
        ChallengeDate:"",
        ChallengeDateName:"",
        ChallengeType:"",
        ChallengeDescription:"",
        ChallengeCity:"",
        ChallengeFromDate:"",
        ChallengeFromDateName:"",
        ChallengeToDate:"",
        ChallengeToDateName:"",
        ChallengeImage:"",
        IsActive:false
    })
    const { ChallengePrice , ChallengeName , ChallengeFromDate , ChallengeFromDateName , ChallengeToDate, ChallengeToDateName,ChallengeType ,ChallengeDescription , ChallengeImage , ChallengeCity } = challengeInfoes;
    const [img , setIMG]=useState();

    const [err , setErr ]=useState('');
    const changeHandler =(ev)=>{
        setErr('')
        if(ev.target.name=="ChallengePrice"){
         return setChallengeInfoes((prev)=>{
                return{
                    ...prev,
                    ChallengePrice:ToRial(String(ev.target.value))
                }
            })
        }
        setChallengeInfoes((prev)=>{
            return{
                ...prev,
                [ev.target.name]:ev.target.value
            }
        })
    }
    const [format , setFormat]=useState();

    const addImage =(ev)=>{
        const formatImg=ev.target.value.split('.')
        setFormat(formatImg[formatImg.length-1])

        const data =new FileReader()
        data.addEventListener('load',()=>{
            setIMG(data.result);
            setChallengeInfoes(prev=>{
                return{
                    ...prev,
                    ChallengeImage:data.result
                }
            })
        })
        data.readAsDataURL(ev.target.files[0])
    }

    const [location , setLocation] =useState({
        province:[] ,
        city:[]
    });
    const getProvince =async()=>{
        const result =await fetch('/api/get-location',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({location:'GetProvinces'})
          })
          const data=await result.json();
          setLocation((prev)=>{
              return {
                  ...prev ,
                  province:data.data
              }
          })

      }

      const [SelectedChallengeMod , setSelectedChallengeMod] =useState(false);
      useEffect(()=>{
        if(SelectedChallenge){
            setSelectedChallengeMod(true);
         }else{
            setSelectedChallengeMod(false);
         }
      },[SelectedChallengeMod])


      useEffect(()=>{
         getProvince();
      },[])

    const [openIndex, setOpenIndex] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const handleSelectProvince = (id) => {
        setSelectedProvince(id);
        setOpenIndex(null);
    };
    const addChallengeHandler =async()=>{
        // after UI change I should add ChallengeType in this condition-------------------------
        if(!ChallengeName|| !img ){
            setErr("نام و تصوری چالش اجباری");
        }else{
            const backendResult = await fetch('/api/set-new-challenge',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                  LoginToken ,
                  CustomerUID ,
                  ChallengePrice ,
                  ChallengeName ,
                  ChallengeFromDate ,
                  ChallengeFromDateName ,
                  ChallengeToDate ,
                  ChallengeToDateName ,
                  ChallengeType:1 ,
                  ChallengeDescription ,
                  ChallengeImage:img ,
                  ChallengeCity:selectedProvince,
                })
            })
        const data =await backendResult.json();
        if(data.status==200){
            setIMG('');
            setChallengeInfoes({
                ChallengeName:"",
                ChallengePrice:"",
                ChallengeType:"",
                ChallengeDescription:"",
                ChallengeCity:"",
                ChallengeFromDate:"",
                ChallengeFromDateName:"",
                ChallengeToDate:"",
                ChallengeToDateName:"",
                ChallengeImage:"",
                IsActive:activationStatus
            });
                successToast("ثبت با موفقیت انجام شد");
                setTimeout(() => {
                    setCreateMod(false);

                }, 700);
            }else{
                errorToast("خطا");
            }

        }
    }

    const GetSelectedChallengeInfoes = async()=>{
        const backendResult =await fetch('/api/get-profile-challenge',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                CustomerUID:CustomerUID ,
                LoginToken:LoginToken,
                ChallengeUID:SelectedChallenge,
                IsExpiredChallenge:"",
                IsVerified:"",
                IsActive:""
            })
        })
        const res=await backendResult.json();


        const { ChallengeName , ChallengePrice , ChallengeType , ChallengeDescription , ChallengeCity , ChallengeFromDate , ChallengeFromDateName , ChallengeToDate ,ChallengeToDateName , ChallengeImage , IsActive } =res.data[0];

        setChallengeInfoes({
            ChallengeName,
            ChallengePrice,
            ChallengeType,
            ChallengeDescription,
            ChallengeFromDate,
            ChallengeFromDateName,
            ChallengeToDate,
            ChallengeToDateName,
            IsActive
        })
        setLocation({
            province:ChallengeCity
        })
        setActivationStatus(IsActive)
        setIMG(ChallengeImage)
    }


    useEffect(()=>{
        if(SelectedChallenge){
            GetSelectedChallengeInfoes();
        }
    },[SelectedChallenge])

    const [activationStatus, setActivationStatus] = useState(false);
    const clickHandler = () => {
        setActivationStatus(!activationStatus);
    };

    const editHandler=async()=>{
        if(!ChallengeName|| !img ){
            setErr("نام و تصوری چالش اجباری");
        }else{
            const backendResult = await fetch('/api/set-challenge',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                  LoginToken ,
                  CustomerUID ,
                  ChallengePrice ,
                  ChallengeUID:SelectedChallenge,
                  ChallengeName ,
                  ChallengeFromDate ,
                  ChallengeFromDateName ,
                  ChallengeToDate ,
                  ChallengeToDateName ,
                  ChallengeType:1 ,
                  ChallengeDescription ,
                  ChallengeImage:img ,
                  ChallengeCity:selectedProvince,
                  IsActive:activationStatus
                })
            })
        const data =await backendResult.json();
        if(data.status==200){
            setIMG('');
            setChallengeInfoes({
                ChallengeName:"",
                ChallengePrice:"",
                ChallengeType:"",
                ChallengeDescription:"",
                ChallengeCity:"",
                ChallengeFromDate:"",
                ChallengeFromDateName:"",
                ChallengeToDate:"",
                ChallengeToDateName:"",
                ChallengeImage:"",
                IsActive:activationStatus,
            });
                successToast("ثبت با موفقیت انجام شد");
                setTimeout(() => {
                    setCreateMod(false);

                }, 700);
            }else{
                errorToast("خطا");
            }
        }
    }

    return (
        <div className="flex flex-col items-center px-4">
            {
                SelectedChallenge? <div className="relative w-full flex justify-center min-h-28 border-2 rounded-lg bg-primary100 py-4 mb-5 ">
                {
                    img&&<Image alt="challengePicture" src={img} style={{display:img?'block':'none'}} width={110} height={110} />
                }
                <div className="relative">
                 <label htmlFor="file-input" style={{display:img?'none':'flex'}} className={`w-full h-full text-[13px] flex flex-col items-center justify-center cursor-pointer `}>
                   <div className="flex flex-col justify-center items-center border border-dashed border-primary400 rounded-lg p-4  w-[95%] h-28">
                     <div className="border p-4 bg-primary400 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-upload" viewBox="0 0 16 16">
                                 <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                 <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                         </svg>
                     </div>
                     <span className="mt-3 text-primary400">تصویر پویش</span>
                    </div>
                 </label>
                 <input
                     id="file-input"
                     className="hidden"
                     type="file"
                     onChange={addImage}
                 />
                </div>
                <label htmlFor='img' className={`absolute flex justify-center items-center cursor-pointer bg-gray-600 bg-opacity-25 h-full w-full  bottom-0 left-0  zIndex-30`}>
                    <input className='hidden'  name='front' type='file'  onChange={addImage} id='img' />
                    {
                      <label htmlFor='img' className={'absolute w-20 h-20 rounded-full bg-primary500 items-center  border-solid  border-20 border-black   flex content-center justify-center align-center text-sm cursor-pointer text-shadow-whiteOutline'} ><div className="p-5 text-white rounded-full border border-dashed "><PencilFill className='ml-[5px]' /></div> </label>
                    }
                </label>

                </div>
                :""
             }
            <div className="flex flex-col w-full mb-5">
                <span className="my-3 ">عنوان پویش</span>
                <input className="w-full h-10 text-sm rounded-lg outline-none border-2 pr-2" name="ChallengeName" value={ChallengeName} onChange={(ev)=>changeHandler(ev)} />
            </div>

            <div className="flex flex-col w-full mb-5">
                <span className="my-3 ">توضیحات پویش </span>
                <input className="w-full h-24 text-sm rounded-lg outline-none border-2 pr-2" name="ChallengeDescription" value={ChallengeDescription} onChange={(ev)=>changeHandler(ev)} />
            </div>

            <div className="flex flex-col w-full mb-5">
                <span className="my-3 ">تاریخ شروع</span>
                <DateInput
                    className="w-full h-10 text-sm rounded-lg outline-none border-2 pr-2"
                    value={ChallengeFromDate}
                    name='ChallengeFromDate'
                    onChange={(ev)=>changeHandler(ev)}
                />
            </div>

            <div className="flex flex-col w-full mb-5">
                <span className="my-3 ">تاریخ اتمام</span>
                <DateInput
                    className="w-full h-10 text-sm rounded-lg outline-none border-2 pr-2"
                    value={ChallengeToDate}
                    name='ChallengeToDate'
                    onChange={(ev)=>changeHandler(ev)}
                />
            </div>
            <div className="flex flex-col w-full mb-5">
               <div className="flex items-center my-3">
                 <span className=" ">عنوان تاریخ شروع</span><span className="text-secondary500 mr-1 text-sm">(اختیاری)</span>
               </div>
                <input className="w-full h-10 text-sm rounded-lg outline-none border-2 pr-2" name="ChallengeFromDateName" value={ChallengeFromDateName} onChange={(ev)=>changeHandler(ev)} />
            </div>
            <div className="flex flex-col w-full mb-5">
               <div className="flex items-center my-3">
                 <span className=" ">عنوان تاریخ اتمام</span><span className="text-secondary500 mr-1 text-sm">(اختیاری)</span>
               </div>
                <input className="w-full h-10 text-sm rounded-lg outline-none border-2 pr-2" name="ChallengeToDateName" value={ChallengeToDateName} onChange={(ev)=>changeHandler(ev)} />
            </div>
            <div className="flex flex-col w-full mb-5">
                <div className="flex items-center my-3">
                    <span className=" ">مبلغ هدف</span><span className="text-secondary500 mr-1 text-sm">(ریال)</span>
                </div>
                <input className="w-full h-10 text-sm rounded-lg outline-none border-2 pr-2" name="ChallengePrice" value={ChallengePrice} onChange={(ev)=>changeHandler(ev)} />
            </div>
            <div className="flex flex-col w-full mb-5">
            <div className="flex items-center my-3">
                 <span className=" ">استان</span><span className="text-secondary500 mr-1 text-sm">(اختیاری)</span>
            </div>
            <button
                type="button"
                className="flex items-center justify-between w-full h-10 rounded-lg p-5 font-medium text-gray-500 border-2 bg-white "
                onClick={() => toggleAccordion(0)}
            >
                <svg
                    className={`w-3 h-3 mr-auto transform ${openIndex === 0 ? "rotate-0" : "rotate-180"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                    />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === 0 ? "block" : "hidden"}`}>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <div>
                            {location.province?.map((province) => (
                                <label key={province.ProvinceID} className="flex items-center gap-2 p-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={province.ProvinceID}
                                        checked={selectedProvince === province.ProvinceID}
                                        onChange={() => handleSelectProvince(province.ProvinceID)}
                                    />
                                    {province.ProvinceName}
                                </label>
                            ))}
                        </div>
                    </div>
            </div>
            <div className="flex items-center my-3">
                 <span className=" ">عنوان زندان</span><span className="text-secondary500 mr-1 text-sm">(اختیاری)</span>
            </div>
            <button
                type="button"
                className="flex items-center justify-between w-full h-10 rounded-lg p-5 font-medium text-gray-500 border-2 bg-white "
                onClick={() => toggleAccordion(0)}
            >
                <svg
                    className={`w-3 h-3 mr-auto transform ${openIndex === 0 ? "rotate-0" : "rotate-180"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                    />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === 0 ? "block" : "hidden"}`}>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <div>
                            {location.province?.map((province) => (
                                <label key={province.ProvinceID} className="flex items-center gap-2 p-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={province.ProvinceID}
                                        checked={selectedProvince === province.ProvinceID}
                                        onChange={() => handleSelectProvince(province.ProvinceID)}
                                    />
                                    {province.ProvinceName}
                                </label>
                            ))}
                        </div>
                    </div>
            </div>
            </div>
            {
                SelectedChallenge?"":<div className="w-full flex justify-center min-h-28 border-2 rounded-lg bg-primary100 py-4 ">
                {
                    img&&<Image alt="challengePicture" src={img} style={{display:img?'block':'none'}} width={110} height={110} />
                }
                 <label htmlFor="file-input" style={{display:img?'none':'flex'}} className={`w-full h-full text-[13px] flex flex-col items-center justify-center cursor-pointer `}>
                   <div className="flex flex-col justify-center items-center border border-dashed border-primary400 rounded-lg p-4  w-[95%] h-28">
                     <div className="border p-4 bg-primary400 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-upload" viewBox="0 0 16 16">
                                 <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                 <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                         </svg>
                     </div>
                     <span className="mt-3 text-primary400">تصویر پویش</span>
                    </div>
                 </label>
                 <input
                     id="file-input"
                     className="hidden"
                     type="file"
                     onChange={addImage}
                 />
                 </div>
            }
            {
               SelectedChallenge?<div className="flex flex-col w-full">
                                    <span className="my-3 ">عنوان پویش</span>
                                    <div className="flex items-center justify-between w-full mb-5 border-2 rounded-lg h-10 px-2 bg-white ">
                                            <div>
                                            <span className="">فعال</span>  <span>{activationStatus?"است":"نیست"}</span>
                                            </div>
                                            <label className="relative inline-block w-[50px] h-[24px]">
                                                <input
                                                    onClick={clickHandler}
                                                    type="checkbox"
                                                    className="opacity-0 w-0 h-0 peer"
                                                />
                                                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0  ${activationStatus?'bg-primary500':'bg-gray-300'} transition duration-400 rounded-full peer-checked:bg-navyBlue peer-focus:shadow-sm`}>
                                                    <span className={`absolute content-[''] h-[16px] w-[16px] ${activationStatus?'right-[4px]':'left-[4px]'} top-[50%] translate-y-[-50%] bottom-[4px] bg-white transition duration-400 rounded-full peer-checked:translate-x-[26px]`}></span>
                                                </span>
                                                </label>
                                     </div>
               </div>
              :""
            }
           <div className="flex flex-col items-center">
             {
                SelectedChallenge?<button onClick={editHandler} className="h-10 bg-primary400 px-4 py-2 text-sm text-white mt-10 rounded-lg ">
                    اعمال تغییرات
                </button>:<button onClick={addChallengeHandler} className="h-10 bg-primary400 px-4 py-2 text-sm text-white mt-10 rounded-lg ">
                    ثبت پویش
                </button>
             }
             <span className="text-xs text-red-500 mt-2">
                {err}
             </span>
           </div>

        </div>
    );
};

export default CreateNewChallengeC;