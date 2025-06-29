import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toastify--------------------------
let successToast=(text)=>{
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      rtl:true,
      progress: undefined,
      theme: "colored",
      });
  }

  let errorToast =(text)=>{
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      rtl:true,
      });

  }
  export {successToast , errorToast}