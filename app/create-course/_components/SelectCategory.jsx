import React, { useContext } from 'react';
import Image from 'next/image';
import CategoryList from '@/app/_shared/CategoryList';
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectCategory() {

  const {userCourseInput , setUserCourseInput} = useContext(UserInputContext);

  const handleCategoryChange=(category)=>{
    setUserCourseInput(prev=>({
      ...prev,
      category:category,

    }))
  }
  return (
    <div className=' px-10 md:px-20'>
       <h2 className='my-5'>Select the Course Category</h2>
    <div className='grid grid-cols-3 gap-10 '>
      {CategoryList.map((item, index) => (
        <div className={`flex flex-col items-center p-5 border rounded-xl
         hover:border-green-600 hover:bg-green-200 cursor-pointer 
         ${userCourseInput?.category==item.name&&'border-primary bg-blue-50 '}`}

         onClick={() => handleCategoryChange(item.name)}
        >
          <Image src={item.icon} alt={item.name} width={50} height={50} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default SelectCategory;