import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/global.css';

// toastify-------------------------
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// components-------------------------------
import HeaderC from '../Components/HeaderC';
import FooterC from '../Components/FooterC';
import Head from 'next/head';

const _App = ({ Component, pageProps }) => {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine)
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true)
        })
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false)
        })
      }
    }
  }, [])

  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== '/') {
        const wb = window.workbox
        wb.active.then(worker => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
        })
      }
    }
  }, [isOnline, router.route]);
  const path =router.pathname;
  const pagesWithoutHeader = ['/phonenumberlogin', '/userpasslogin' , '/phonenumberlogin/verification' ];
  const isHeaderVisible = !pagesWithoutHeader.includes(path);
  useEffect(()=>{
    if(path!=="/" && path !=='/userpasslogin' && path!=="/phonenumberlogin/verification" && path !=='/phonenumberlogin'){
         sessionStorage.setItem("lastLocation",path+window.location.search)
    }
  },[path])


  return (
    <>
        <Head>
            <title>
               سازمان زندان ها
            </title>
        </Head>
        <div dir='rtl' className='mainParent flex justify-center w-screen bg-BackgroundColor  '>
          <div className='relative  innerParent w-full xl:max-w-[1400px]  ' >
            {/* Header---------------------------------------- */}
            {
                isHeaderVisible&&<div className='sticky z-[1000]  top-0 w-full'><HeaderC /> </div>
              }
                <Component {...pageProps} />
                <ToastContainer />
              {/* Footer-----------------------------------------*/}
              {isHeaderVisible&&<FooterC />}
          </div>
        </div>
    </>
  )
}

export default _App
