import { useState } from "react";

const AccordionT = ({ provinces , setPrisoners , setShowFilter }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [Cities, setCities] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const getCities = async (province) => {
        const result = await fetch('/api/get-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: 'GetCitys', ProvinceID: province })
        });

        const returnedData = await result.json();
        setCities(returnedData.data);
    };

    const handleSelectProvince = (id) => {
        setSelectedProvince(id);
        getCities(id);
        setOpenIndex(null);
    };

    const handleSelectCity = (id) => {
        setSelectedCity(id);
        setOpenIndex(null);
    };

    const handleSelectGender = (gender) => {
        setSelectedGender(gender);
        setOpenIndex(null);
    };

    const filterHandler =async()=>{
        if(selectedCity||selectedGender){
            const response =await fetch('/api/get-prisoners',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({PrisonerCity:selectedCity, PrisonerGrnder:selectedGender})
            });
            const data = await response.json();
            setPrisoners(data.backendResponse);
            setShowFilter(false);

        }
    };

    return (
        <div id="accordion-collapse">
            {/* Province ------------------------------- */}
            <div>
                <h2>
                    <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-1 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        onClick={() => toggleAccordion(0)}
                    >
                        <span>استان</span>
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
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === 0 ? "block" : "hidden"}`}>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <div>
                            {provinces.map((province) => (
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

            {/* City ---------------------------------------------------------- */}
            <div>
                <h2>
                    <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-1 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        onClick={() => toggleAccordion(1)}
                    >
                        <span>شهر</span>
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
                        {Cities &&
                            Cities.map((city) => (
                                <label key={city.CityID} className="flex items-center gap-2 p-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="city"
                                        value={city.CityID}
                                        checked={selectedCity === city.CityID}
                                        onChange={() => handleSelectCity(city.CityID)}
                                    />
                                    {city.CityName}
                                </label>
                            ))}
                    </div>
                </div>
            </div>

            {/* Gender ------------------------------------------------ */}
            <div>
                <h2>
                    <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-1 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        onClick={() => toggleAccordion(2)}
                    >
                        <span>جنسیت</span>
                        <svg
                            className={`w-3 h-3 transform ${openIndex === 2 ? "rotate-180" : ""}`}
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
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === 2 ? "block" : "hidden"}`}>
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <label className="flex items-center gap-2 p-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="1"
                                checked={selectedGender === "male"}
                                onChange={() => handleSelectGender("male")}
                            />
                            مرد
                        </label>
                        <label className="flex items-center gap-2 p-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="2"
                                checked={selectedGender === "female"}
                                onChange={() => handleSelectGender("female")}
                            />
                            زن
                        </label>
                    </div>
                </div>
            </div>
            <button onClick={filterHandler} className='block text-white py-2 px-6 rounded-[8px] bg-primary500 mt-10 mx-auto'>
                فیلتر
            </button>
        </div>
    );
};

export default AccordionT;

