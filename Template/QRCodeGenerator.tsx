import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { errorToast, successToast } from './ToastifyT';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  filename?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 128,
  filename = 'qrcode'
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);


  const handleDownload = async () => {
    if (!qrRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('خطا در دانلود:', error);
      errorToast('خطا در دانلود تصویر');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTelegramShare = () => {
    const text = `QR Code: ${value}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };


  const handleWhatsAppShare = () => {
    const text = `QR Code: ${value}\n${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };
    const copylink = (links:string) => {
        navigator.clipboard.writeText(links)
    }
     const shareHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
      const baseURL = "http://77.104.81.93:8089";
      const makeShareLink =baseURL+value;
      copylink(makeShareLink)
      successToast ("با موفقیت کپی شد");
  }


  return (
    <div className="flex flex-col items-center p-6  rounded-lg ">
      {/* QR Code */}
      <div ref={qrRef} className="w-[164px] mb-6 p-4 bg-white rounded-2xl border-2 border-secondary400">
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
        />
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center w-[164px] h-10 text-primary500  font-semibold border-2 border-primary500 py-2 rounded-md"
        >
          {isDownloading ? 'در حال دانلود...' : 'دانلود '}
        </button>

          <span className=" block mt-5 mb-3  mx-auto text-md text-secondary500 ">اشتراک گذاری در</span>
            <div className="flex justify-center">
                <div className="border-2 rounded-md p-1">
                    <button
                        onClick={handleTelegramShare}
                        className="flex items-center justify-center  bg-blue-500 hover:bg-blue-600 rounded-full text-white p-2 transition-colors duration-200 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                        </svg>

                    </button>
                </div>

                <div className="border-2 rounded-md p-1 mx-2">
                    <button
                        onClick={handleWhatsAppShare}
                        className="flex items-center justify-center   bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200 font-medium "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                            <path fill="white" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" strokeWidth={0.7} stroke="white"></path>
                        </svg>
                    </button>
                </div>
            </div>
       </div>

            <span className="font-bold text-secondary600 mt-14 mb-4">
                 لینک اشتراک گذاری
            </span>
             <div className="flex justify-between w-full rounded-lg overflow-hidden border text-sm h-[42px] bg-secondary100 ">
                    <span className="flex items-center pr-2 w-[70%] text-secondary600">{value}</span>
                    <button onClick={shareHandler} className=" flex justify-center items-center w-[30%] bg-primary600 text-white text-xs md:text-sm">اشتراک گذاری</button>
            </div>
    </div>
  );
};


export default QRCodeGenerator;