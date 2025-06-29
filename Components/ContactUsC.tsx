import { useEffect, useState } from "react";
import AssociationT from '../Template/AssociationT';

interface Province {
  ProvinceID: string;
  ProvinceName: string;
}

interface City {
  CityID: string;
  CityName: string;
}

// interface NGO {
//     Name: string;
//     Address: string;
//     Telephone: string;
//   }
// interface Service{
//     Name: string;
//     Address: string;
//     Telephone: string;
// }

const ContactUsC = () => {
    const [location, setLocation] = useState<{ province: Province[], city: City[] }>({
        province: [],
        city: []
    });
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
    const [Cities, setCities] = useState<City[] | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
    const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
    // const [association, setAssociation]=useState<{ NGOs: NGO[]; Services: Service[] }>({
    //     NGOs: [],
    //     Services: []
    //   });
    const [association, setAssociation]=useState<any>()

    const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const handleSelectProvince = (provinceId: string, provinceName: string) => {
        setSelectedProvince(provinceId);
        setSelectedProvinceName(provinceName);
        setIsLoadingCities(true);
        getCities(provinceId);
        setOpenIndex(null);
    };

    const handleSelectCity = (cityId: string, cityName: string) => {
        setSelectedCity(cityId);
        setSelectedCityName(cityName);
        setOpenIndex(null);
    };

    const handleSearch = async() => {
        console.log(`Searching for province: ${selectedProvince}, city: ${selectedCity}`);
        const backendResponse =await fetch('/api/get-communities',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                ProvinceID:selectedProvince,
                CityID:selectedCity
            })
        })
        const data =await backendResponse.json();
        setAssociation(data.data)
    };

    console.log(association,"this is NGO response");

    const getProvince = async (): Promise<void> => {
        try {
            const result = await fetch('/api/get-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location: 'GetProvinces' })
            });

            const returnedData: { data: Province[] } = await result.json();
            setLocation((prev) => ({
                ...prev,
                province: returnedData.data
            }));
        } catch (error) {
            console.log('An error occurred on get province', error);
        }
    };

    const getCities = async (provinceId?: string): Promise<void> => {
        setIsLoadingCities(true);
        try {
            const result = await fetch('/api/get-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: 'GetCitys',
                    ProvinceID: provinceId || selectedProvince
                })
            });

            const returnedData: { data: City[] } = await result.json();
            setCities(returnedData.data);
            setIsLoadingCities(false);
            // Open city accordion after data is loaded
            setOpenIndex(1);
        } catch (error) {
            console.log('An error occurred on get cities', error);
            setIsLoadingCities(false);
        }
    };

    // useEffect to call getProvince on component mount
    useEffect(() => {
        getProvince();
    }, []);

    return (
        <div className="flex flex-col items-center mb-28 px-10">
            {/* top image */}
            <div className='relative flex justify-center bg-[url("/images/contactUs.png")] bg-cover bg-no-repeat bg-center w-full h-[106px] lg:h-[296px]'></div>

            {/* Contact card - removed fixed height container and adjusted positioning */}
            <div className='relative flex justify-center w-full'>
                <div className='lg:-mt-24 flex flex-col bg-white lg:shadow-md pb-10 rounded-[26px] w-full lg:w-10/12'>
                    <span className='my-6 px-4 font-semibold text-[16px] lg:text-[20px]'>تماس با ما</span>
                    <div className="flex px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#1f7e64" fillRule="evenodd" d="M5.733 2.043c1.217-1.21 3.221-.995 4.24.367l1.262 1.684c.83 1.108.756 2.656-.229 3.635l-.238.238a.65.65 0 0 0-.008.306c.063.408.404 1.272 1.832 2.692s2.298 1.76 2.712 1.824a.7.7 0 0 0 .315-.009l.408-.406c.876-.87 2.22-1.033 3.304-.444l1.91 1.04c1.637.888 2.05 3.112.71 4.445l-1.421 1.412c-.448.445-1.05.816-1.784.885c-1.81.169-6.027-.047-10.46-4.454c-4.137-4.114-4.931-7.702-5.032-9.47l.749-.042l-.749.042c-.05-.894.372-1.65.91-2.184zm3.04 1.266c-.507-.677-1.451-.731-1.983-.202l-1.57 1.56c-.33.328-.488.69-.468 1.036c.08 1.405.72 4.642 4.592 8.492c4.062 4.038 7.813 4.159 9.263 4.023c.296-.027.59-.181.865-.454l1.42-1.413c.578-.574.451-1.62-.367-2.064l-1.91-1.039c-.528-.286-1.146-.192-1.53.19l-.455.453l-.53-.532c.53.532.529.533.528.533l-.001.002l-.003.003l-.007.006l-.015.014a1 1 0 0 1-.136.106c-.08.053-.186.112-.319.161c-.27.101-.628.155-1.07.087c-.867-.133-2.016-.724-3.543-2.242c-1.526-1.518-2.122-2.66-2.256-3.526c-.069-.442-.014-.8.088-1.07a1.5 1.5 0 0 1 .238-.42l.032-.035l.014-.015l.006-.006l.003-.003l.002-.002l.53.53l-.53-.531l.288-.285c.428-.427.488-1.134.085-1.673z" clipRule="evenodd" strokeWidth="0.7" stroke="#1f7e64"/></svg>
                        <span className="mr-4">تماس با ما</span>
                    </div>

                    <div className="flex  mt-8 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#1f7e64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8"/></g></svg>
                        <span className="mr-4">تهران - سعادت آباد - ضلع شمالی بزرگراه یادگار امام- بلوار بهزاد (کوی فراز) - ساختمان مرکزی سازمان زندان‌ها و اقدامات تأمینی و تربیتی کشور</span>
                    </div>
                </div>
            </div>

            {/* Description text - moved closer to the card above */}
            <div className="mt-10 w-full lg:w-10/12">
                <p className="text-[16px] text-gray-600">در این صفحه لیست کامل انجمن‌های حمایت از زندانیان کشور را مشاهده می‌کنید. می‌توانید بر اساس استان و شهرستان، اطلاعات مربوط به آدرس و شماره تماس هر انجمن را جستجو کنید.</p>
            </div>
            <div id="accordion-collapse" className="w-full flex  lg:w-10/12 flex-wrap justify-between mt-8">
            {/* Province -------------------- ----------- */}
            <div className="w-full md:w-[47%]">
                <h2>
                    <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium  rounded-lg text-gray-500 border border-b-1 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        onClick={() => toggleAccordion(0)}
                    >
                        <span>{selectedProvinceName || "استان"}</span>
                        <svg
                            className={`w-3 h-3 transform ${openIndex === 0 ? "rotate-180" : ""}`}
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
                </h2>
                <div className={`overflow-hidden transition-all duration-300 border-2 ${openIndex === 0 ? "block" : "hidden"}`}>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <div>
                            {location.province.length > 0 ? (
                                location.province.map((province) => (
                                    <label key={province.ProvinceID} className="flex items-center gap-2 p-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={province.ProvinceID}
                                            checked={selectedProvince === province.ProvinceID}
                                            onChange={() => handleSelectProvince(province.ProvinceID, province.ProvinceName)}
                                        />
                                        {province.ProvinceName}
                                    </label>
                                ))
                            ) : (
                                <p>در حال بارگذاری استان‌ها...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* City ---------------------------------------------------------- */}
             <div className="w-full md:w-[47%] mt-8 md:mt-0 ">
                <h2>
                    <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium rounded-lg text-gray-500 border border-b-1 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        onClick={() => toggleAccordion(1)}
                    >
                        <span>{selectedCityName || "شهر"}</span>
                        <svg
                            className={`w-3 h-3 transform ${openIndex === 1 ? "rotate-180" : ""}`}
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
                </h2>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === 1 ? "block" : "hidden"}`}>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        {isLoadingCities ? (
                            <p>در حال بارگذاری شهرها...</p>
                        ) : Cities && Cities.length > 0 ? (
                            Cities.map((city) => (
                                <label key={city.CityID} className="flex items-center gap-2 p-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="city"
                                        value={city.CityID}
                                        checked={selectedCity === city.CityID}
                                        onChange={() => handleSelectCity(city.CityID, city.CityName)}
                                    />
                                    {city.CityName}
                                </label>
                            ))
                        ) : (
                            <p>{selectedProvince ? "شهری یافت نشد" : "لطفا ابتدا یک استان انتخاب کنید"}</p>
                        )}
                    </div>
                </div>
            </div>
            </div>

            {/* Search Button */}
            <div className="mt-8 flex justify-center w-full">
                <button
                    onClick={handleSearch}
                    disabled={!selectedCity}
                    className={`w-[228px] h-[56px] rounded-lg font-medium ${selectedCity ? 'bg-[#004ADF] text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition-colors duration-200`}
                >
                    جستجو
                </button>
            </div>

            {Array.isArray(association) && association.map((item, index) => (
            <div key={index} className="w-full lg:w-10/12 mt-10">
                <h3 className="text-xl font-bold mb-4">{item.Title}</h3>
                <div className="flex flex-wrap justify-between">
                {item.Data.map((innerItem: any, innerIndex: number) => (
                    <AssociationT key={innerIndex} Infoes={innerItem} />
                ))}
                </div>
            </div>
            ))}


        </div>
    );
};

export default ContactUsC;