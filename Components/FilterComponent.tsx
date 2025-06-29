import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterItem {
  id: string;
  label: string;
  type?: 'select' | 'radio' | 'checkbox' | 'range' | '' ;
  options?: FilterOption[];
  min?: number;
  max?: number;
  defaultValue?: number[];
  unit?: string;
}

interface FilterValues {
  [key: string]: string | string[] | number[] | undefined;
}

const FilterComponent: React.FC = ({setPrisoners}:any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [provinceOptions, setProvinceOptions] = useState<FilterOption[]>([]);
  const [cityOptions, setCityOptions] = useState<FilterOption[]>([]);

  const getProvinces = async () => {
    try {
      const response = await fetch('/api/get-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: 'GetProvinces' })
      });

      const { data } = await response.json();
      const options = data.map((prov: Province) => ({
        value: prov.ProvinceID,
        label: prov.ProvinceName
      }));
      setProvinceOptions(options);
    } catch (error) {
      console.error('Error fetching provinces', error);
    }
  };

  const getCities = async (provinceId: string) => {
    try {
      const response = await fetch('/api/get-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: 'GetCitys', ProvinceID: provinceId })
      });

      const { data } = await response.json();
      const options = data?.map((city: City) => ({
        value: city.CityID,
        label: city.CityName
      }));
      setCityOptions(options);
    } catch (error) {
      console.error('Error fetching cities', error);
    }
  };
  const selectedProvinceID = Cookies.get('selectedProvinceID');

  useEffect(()=>{
      if(selectedProvinceID){
        getCities(selectedProvinceID);
      }
  },[selectedProvinceID])
  console.log(selectedProvinceID,"selected province");

  interface Province {
    ProvinceID: string;
    ProvinceName: string;
  }

  interface City {
    CityID: string;
    CityName: string;
  }


  const getPrisoners = async (filters: FilterValues = filterValues) => {
    const response = await fetch('/api/get-prisoners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters })
    });
    const data = await response.json();
    setPrisoners(data.backendResponse);
  };

  const handleFilterChange = async (filterId: string, value: string | string[] | number[]) => {
    let newFilterValues = {
      ...filterValues,
      [filterId]: value
    };


    if (filterId === 'ProvinceID') {
      Cookies.set("selectedProvinceID",value as string)
      newFilterValues = {
        ...newFilterValues,
        city: ''
      };
      setCityOptions([]);


      await getCities(value as string);
    }

    setFilterValues(newFilterValues);


    const currentFilter = filterItems.find(item => item.id === filterId);
    if (currentFilter?.type !== 'range') {
      await getPrisoners(newFilterValues);
    }
  };

  const filterItems: FilterItem[] = [
    {
      id: 'ProvinceID',
      label: 'استان',
      type: 'select',
      options: provinceOptions
    },
    {
      id: 'CityID',
      label: 'شهر',
      type: 'select',
      options: cityOptions
    },
    {
      id: 'PrisonName',
      label: 'عنوان زندان',
      type: 'select',
      options: [
        { value: 'evin', label: 'اوین' },
        { value: 'gohardasht', label: 'گوهردشت' },
        { value: 'central', label: 'مرکزی' }
      ]
    },
    {
      id: 'GenderID',
      label: 'جنسیت',
      type: 'radio',
      options: [
        { value: '1', label: 'مرد' },
        { value: '2', label: 'زن' }
      ]
    },
    {
      id: 'Marital',
      label: 'وضعیت تاهل',
      type: 'radio',
      options: [
        { value: '1', label: 'مجرد' },
        { value: '2', label: 'متاهل' },
        { value: '3', label: 'مطلقه' }
      ]
    },
    {
      id: 'Age',
      label: 'سن',
      type: 'range',
      min: 18,
      max: 80,
      defaultValue: [25, 65]
    },
    {
      id: 'PrisonSentenceDuration',
      label: 'مدت زمان حبس',
      type: 'range',
      min: 1,
      max: 50,
      defaultValue: [5, 20],
      unit: 'سال'
    },
    {
      id: 'Education',
      label: 'تحصیلات',
      type: 'checkbox',
      options: [
        { value: 'elementary', label: 'ابتدایی' },
        { value: 'middle', label: 'راهنمایی' },
        { value: 'high', label: 'دبیرستان' },
        { value: 'diploma', label: 'دیپلم' },
        { value: 'bachelor', label: 'کارشناسی' },
        { value: 'master', label: 'کارشناسی ارشد' },
        { value: 'PHD', label: 'دکتری' }
      ]
    },
    {
      id: 'Nationality',
      label: 'تابعیت',
      type: 'checkbox',
      options: [
        { value: 'iranian', label: 'ایرانی' },
        { value: 'afghan', label: 'افغان' },
        { value: 'pakistani', label: 'پاکستانی' },
        { value: 'other', label: 'سایر' }
      ]
    },
    {
      id: 'FamilySituation',
      label: 'شرایط خانوادگی',
      type: '',
      options: [
        { value: 'with_family', label: 'دارای خانواده' },
        { value: 'without_family', label: 'بدون خانواده' }
      ]
    },
    {
      id: 'PhysicalSituation',
      label: 'شرایط جسمانی',
      type: 'checkbox',
      options: [
        { value: 'healthy', label: 'سالم' },
        { value: 'disabled', label: 'معلول' },
        { value: 'chronic', label: 'بیماری مزمن' }
      ]
    },
    {
      id: 'Category',
      label: 'دهک بندی',
      type: '',
      min: 1,
      max: 10,
      defaultValue: [3, 7]
    },
    {
      id: 'SupportedBy',
      label: 'تحت پوشش',
      type: 'checkbox',
      options: [
        { value: 'commity', label: 'کمیته امداد امام (ره)' },
        { value: 'helale-ahmar', label: 'حلال احمر' },
        { value: ',otazafan', label: 'بنیاد مستضعفان' }
      ]
    }
  ];

  const renderFilterContent = (item: FilterItem) => {
    switch (item.type) {
      case 'select':
        return (
          <select
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary500"
            value={(filterValues[item.id] as string) || ''}
            onChange={(e) => handleFilterChange(item.id, e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            {item.options?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {item.options?.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={item.id}
                  value={option.value}
                  checked={filterValues[item.id] === option.value}
                  onChange={(e) => handleFilterChange(item.id, e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2 max-h-20 overflow-y-auto">
            {item.options?.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={(filterValues[item.id] as string[])?.includes(option.value) || false}
                  onChange={(e) => {
                    const currentValues = (filterValues[item.id] as string[]) || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter(v => v !== option.value);
                    handleFilterChange(item.id, newValues);
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
        case 'range':
          const rangeValue = (filterValues[item.id] as [number, number]) || (item.defaultValue as [number, number]) || [item.min || 0, item.max || 100];

          return (
            <div className="space-y-4">
              <RangeSlider
                min={item.min}
                max={item.max}
                step={1}
                value={rangeValue}
                onInput={(value) => handleFilterChange(item.id, value)}
                className="custom-range-slider"
              />
              <div className="flex justify-between text-sm text-gray-700">
                <span>{item.label.includes('سن') ? `تا ${rangeValue[1]} سال` : rangeValue[1]} {item.unit || ''}</span>
                <span>{item.label.includes('سن') ? `از ${rangeValue[0]} سال` : rangeValue[0]} {item.unit || ''}</span>
              </div>

                <button
                  onClick={() => getPrisoners()}
                  className="bg-primary500 text-white px-4 py-2 rounded-md text-sm hover:bg-primary600 mx-auto"
                >
                  اعمال فیلتر
                </button>
            </div>
          );

      default:
        return <div>نوع فیلتر تعریف نشده</div>;
    }
  };

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClearFilters = async () => {
    const emptyFilters = {};
    setFilterValues(emptyFilters);
    setCityOptions([]);
    await getPrisoners(emptyFilters);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(()=>{
    const initialGetPrisoners = async()=>{
        const response = await fetch('/api/get-prisoners',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        });
        const data = await response.json();
        setPrisoners(data.backendResponse);
    };
    initialGetPrisoners();
  },[])


  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm" dir="rtl">
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
             <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <path fill="none" stroke="#8a8a8a" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={1} d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"></path>
          </svg>
          <span className="text-gray-700 font-medium mr-2">فیلتر ها</span>
        </div>
        </div>
        <button className="text-sm text-primary500" onClick={handleClearFilters}>
          حذف فیلترها
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {filterItems.map((item, index) => (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span>{item.label}</span>
              {
                openIndex === index ? <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8l-7 7M12 8l7 7">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                        </path>
                    </svg>:<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="none" stroke="#565656" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16l-7 -7M12 16l7 -7">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"></animate>
                    </path>
                    </svg>
              }
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-4 pb-4 bg-gray-50">
                {renderFilterContent(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;