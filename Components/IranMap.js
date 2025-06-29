// 'use client'

// import {IranMap} from 'noa-iran-map-react';


// const IranMapC = () => {
//     const data = {

//     };

//     return (
//         <div style={{height:"200px" , width:"90%"}}>
//             <IranMap backgroundColor='' color='#34eb9b' data={data}  />
//         </div>
//     );
// }

// export default IranMapC;

'use client'
import { useState } from 'react';
// import { IranMap } from 'noa-iran-map-react';
import {IranMap} from '../Lib/IranianMapNoa/noa_iran_map_react-main/src/index.ts'


const provinceNames = {
  'IR-32': 'البرز',
  'IR-15': 'کرمان',
  'IR-04': 'فارس',
  'IR-01': 'آذربایجان شرقی',
  'IR-02': 'آذربایجان غربی',
  'IR-03': 'اردبیل',
  'IR-05': 'اصفهان',
  'IR-06': 'بوشهر',
  'IR-07': 'تهران',
  'IR-08': 'چهارمحال و بختیاری',
  'IR-09': 'خراسان جنوبی',
  'IR-10': 'خراسان رضوی',
  'IR-11': 'خراسان شمالی',
  'IR-12': 'خوزستان',
  'IR-13': 'زنجان',
  'IR-14': 'سمنان',
  'IR-16': 'سیستان و بلوچستان',
  'IR-17': 'قزوین',
  'IR-18': 'قم',
  'IR-19': 'کردستان',
  'IR-20': 'کرمانشاه',
  'IR-21': 'کهگیلویه و بویراحمد',
  'IR-22': 'گلستان',
  'IR-23': 'گیلان',
  'IR-24': 'لرستان',
  'IR-25': 'مازندران',
  'IR-26': 'مرکزی',
  'IR-27': 'هرمزگان',
  'IR-28': 'همدان',
  'IR-29': 'یزد',
  'IR-30': 'ایلام',
};

const IranMapC = () => {

  const [selectedProvince, setSelectedProvince] = useState(null);

  const data = {};

  if (selectedProvince) {
    data[selectedProvince] = 100;
  }

  const handleMapClick = (event) => {

    const target = event.target;

    if (target.tagName === 'path') {

      const provinceCode = target.getAttribute('data-id') || target.id;


      setSelectedProvince(prevProvince => prevProvince === provinceCode ? null : provinceCode);
    }
  };


  const tooltipLabel = (code) => {
    return provinceNames[code] || code;
  };

  return (
    <div className=' w-full'>
      <div
        onClick={handleMapClick}
        className='flex justify-center w-full '
        >
        <IranMap
          backgroundColor='#E0E0E0'
          color='#228b6e'
          data={data}
          // className="border-8 border-gray-700"
          // tooltipLabel={tooltipLabel(data)}
        />
      </div>

      {/* نمایش نام استان انتخاب شده */}
      {/* {selectedProvince && (
        <div style={{ marginTop: "10px" }}>
          <p>استان انتخاب شده: {provinceNames[selectedProvince] || selectedProvince}</p>
        </div>
      )} */}
    </div>
  );
}

export default IranMapC;