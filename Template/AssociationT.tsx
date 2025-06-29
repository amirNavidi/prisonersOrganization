import React from 'react';

interface IInfoesTypes{
    Name:string,
    Address:string,
    Telephone:string
}

const AssociationT = ({Infoes}:{Infoes:IInfoesTypes}) => {
    return (
        <div className='w-full md:w-[47%] h-[194px] border mt-8 px-4 border-[#8AACF0] rounded-2xl flex flex-col justify-center '>
            <span className='text-lg font-bold mb-8'>{Infoes.Name}</span>
            <p className='flex text-sm my-4'>
                <span className='ml-3 '>آدرس:</span>
                <span>{Infoes.Address}</span>
            </p>
            <p className='felx text-sm'>
                 <span className='ml-3'>شماره تلفن</span>
                 <span>{Infoes.Telephone}</span>
            </p>

        </div>
    );
};

export default AssociationT;