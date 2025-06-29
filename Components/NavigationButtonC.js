import Link from "next/link";
import { useState } from "react";


const NavigationButtonC = () => {
  const [activeTab, setActiveTab] = useState('خانه');

  const navItems = [
    {
      name: 'خانه',
      link:'/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 10a.5.5 0 0 0-1 0zm-14 0a.5.5 0 0 0-1 0zm15.146 2.354a.5.5 0 0 0 .708-.708zM12 3l.354-.354a.5.5 0 0 0-.708 0zm-9.354 8.646a.5.5 0 0 0 .708.708zM7 21.5h10v-1H7zM19.5 19v-9h-1v9zm-14 0v-9h-1v9zm15.854-7.354l-9-9l-.708.708l9 9zm-9.708-9l-9 9l.708.708l9-9zM17 21.5a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm-10-1A1.5 1.5 0 0 1 5.5 19h-1A2.5 2.5 0 0 0 7 21.5z"/></svg>
      )
    },
    {
      name: 'خدمات حمایتی',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.417 15.713c3.951-5.01 2.884-9.978.046-11.719c-2.682-1.645-5.023-.982-6.429.074L12 4.842m7.417 10.871c-.948 1.203-2.185 2.407-3.757 3.57C14.115 20.428 13.342 21 12 21s-2.114-.572-3.66-1.717C.222 13.275 1.018 6.153 4.537 3.994c2.682-1.645 5.023-.982 6.429.074L12 4.842m7.417 10.871l-5.525-6.268a.7.7 0 0 0-.895-.13l-2.186 1.366a1.965 1.965 0 0 1-2.233-3.23L12 4.841" color="currentColor"/></svg>
      )
    },
    {
      name: 'پویش ها و چالش ها',
      link:'/start-helping',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.923 12.5v-1h3.23v1zm1.085 6.462l-2.585-1.939l.623-.792l2.585 1.938zm-2.039-11.27l-.623-.792l2.585-1.939l.623.793zM5.5 17.962v-3.808H4.462q-.671 0-1.144-.472t-.472-1.143v-1.077q0-.671.472-1.144t1.143-.472h3.731L12.154 7.5v9l-3.962-2.346H6.5v3.808zm5.654-3.243V9.281l-2.681 1.565H4.461q-.23 0-.423.193t-.192.423v1.077q0 .23.192.423t.423.192h4.012zm2.769.17V9.112q.502.465.809 1.222T15.038 12t-.306 1.666t-.809 1.222M7.5 12" strokeWidth="0.7" stroke="currentColor"/></svg>
      )
    },
    {
      name: 'پروفایل',
      link:'/profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7" r="3"/></g></svg>
      )
    }
  ];

  return (
    <div className="fixed h-[70px] bottom-0 z-30 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 shadow-md">
      {navItems.map((item,index) => (
        <Link key={index} href={item.link?item.link:'#'}>
            <button
              key={item.name}
              className={`flex flex-col items-center text-[12px] px-4 py-2 transition-colors duration-200 ${
              activeTab === item.name ? 'text-primary500' : 'text-gray-600'
      }`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className={`w-6 h-6 ${
        activeTab === item.name ? 'text-primary500' : 'text-gray-600'
      }`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </button>
        </Link>

      ))}
    </div>
  );
};

export default NavigationButtonC;
