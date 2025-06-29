
const ServicesT = ({data}) => {
    const {svg , description , title} =data;
    return (
        <div className='flex flex-col items-center w-[175px] h-[175px] lg:w-[220px]  lg:h-[220px] px-16 bg-[#F4F4FF] rounded-[16px]'>
            <div className='w-[52px] h-[52px] flex justify-center items-center my-3 lg:my-4 rounded-full bg-primary300'>
                {svg}
            </div>
            <span className='text-[12px] lg:text-[16px] font-medium my-3 '>
                {title}
            </span>
            <span className='text-[12px] text-secondary600 pb-2'>
                {description}
            </span>
            
        </div>
    );
};

export default ServicesT;