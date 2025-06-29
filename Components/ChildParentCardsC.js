import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";


const ChildParentCardsC = ({ dataV }) => {
    const { width, height, rounded, data, type, refNumber: forwardedRef , pathNameD } = dataV;

    const refNumber = useRef(null);

    const [size, setSize] = useState({
        childWidth: width,
        childHeight: height
    });
    const [hasOverflow, setHasOverflow] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (refNumber.current) {
                setHasOverflow(refNumber.current.scrollWidth > refNumber.current.clientWidth);
            }
        };
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [size, data]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSize({
                    childWidth: width - 80,
                    childHeight: height - 80
                });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width, height]);

    useEffect(() => {
        const handlePreventScroll = (event) => {
            if (refNumber.current && refNumber.current.matches(":hover") && hasOverflow) {
                event.preventDefault();
            }
        };
        document.addEventListener("wheel", handlePreventScroll, { passive: false });
        return () => document.removeEventListener("wheel", handlePreventScroll);
    }, [hasOverflow]);

const handleWheelScroll = (event) => {
    if (refNumber.current && refNumber.current.matches(":hover") && hasOverflow) {
        event.preventDefault();
        refNumber.current.scrollLeft -= event.deltaY * 3;
    }
};
const router =useRouter()
const clickHandler=(card)=>{


         if(card.UID){
            Cookies.set('ChallengeUID',card.UID);
            Cookies.set('ObjectUID',card.UID);
            router.push({
                pathname: pathNameD,
                query:{challenge: card.UID}
            })
         }
         if(card.NextPage){
             Cookies.set('PageName',card.NextPage)
             router.push(card.NextPage)
         }
    }


    return (
        <div
            ref={refNumber}
            className={` flex items-center mr-[16px] lg:mr-[120px] ${hasOverflow ? "overflow-x-auto scrollbar-hide" : ""}`}
            style={{ height: `${size.childHeight + 30}px`, whiteSpace: "nowrap" }}
            onWheel={handleWheelScroll}
        >
            {Array.isArray(data) &&
                data.length > 0 &&
                data[0].Data.map((card, index) => (
                  <button
                        onClick={()=>clickHandler(card)}
                        key={index}
                        className="ml-2 overflow-hidden"
                        style={{
                            width: `${size.childWidth}px`,
                            height: `${size.childHeight}px`,
                            borderRadius: rounded,
                            flexShrink: 0,
                            cursor:card.NextPage?'pointer':'not-allowed'
                        }}
                    >
                        {
                            (type==4)?<img src={card.TypeHelpImage} className="p-4 w-full h-full  flex justify-center items-center"/>:
                            <Image
                            src={card.TypeHelpImage}
                            alt="Card Image"
                            width={size.childWidth}
                            height={size.childHeight}
                            style={{ objectFit: "cover"}}
                        />
                        }
                        {type === 3 && <span>{card.DeadLine}</span>}
                    </button>
                ))}
        </div>
    );
};

export default ChildParentCardsC;
