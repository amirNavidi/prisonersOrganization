import { useState , useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Carousel() {
    const [desktop, setDesktop] = useState(true);
    const router =useRouter();
    const clickHandler =()=>{
        Cookies.set('PageName','prisoners-detail');
        router.push("/ways-to-help")
        // router.push('/start-helping')
    }
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 640) {
          setDesktop(false);
        } else {
          setDesktop(true);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  return (
    <div  style={{position:'relative' ,width:'100%', height:'380px' }}>
    <Swiper
      modules={[Autoplay, EffectFade, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect="fade"
      navigation
      className="h-[380px] bg-[#EDEDF2]"
    >
     <SwiperSlide>
            <div style={{ position:"relative", width:'100%', height:'380px'}} >
                <img
                    src={desktop?"/images/slider.png":"/images/mobileSlider.png"}
                    alt="Slide 1"
                    style={{height:'100%',width:'100%'}}
                    />
            </div>
      </SwiperSlide>
      </Swiper>
      {/* <SwiperSlide>
        <div className="w-full h-[380px]">
          <Image
            src="/images/handSlider.png"
            alt="Slide 2"
            width={1920}
            height={380}
            className="w-full h-full object-cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-[380px]">
          <Image
            src="/images/handSlider.png"
            alt="Slide 3"
            width={1920}
            height={380}
            className="w-full h-full object-cover"
          />
        </div>
      </SwiperSlide> */}
    <div style={{position:'absolute' , zIndex:'40' ,bottom:desktop?"110px":"190px" ,right:desktop?'8%':'50%' ,transform:desktop||"translate(50%)"}}>
        <button onClick={clickHandler} className= 'w-[187px] h-[56px]  bg-primary500 text-white text-[16px] rounded-[12px]  '> میخواهم کمک کنم </button>
    </div>
  </div>
  );
}

