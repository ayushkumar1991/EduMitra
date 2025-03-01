import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import EditCourseBasicInfo from './EditCourseBasicInfo';

function CourseBasicInfo({ course }) {
    return (
        <div className='p-10 border rounded-xl shadow-md mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>

                    <h2 className='font-bold text-3xl'>{course?.courseOutput?.CourseName}<EditCourseBasicInfo course={course}/> </h2>

                    <p className='text-sm text-gray-500 mt-3 '>{course?.courseOutput?.Description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><IoExtensionPuzzleSharp />{course?.category}</h2>
                    <Button className="w-full mt-20">Start</Button>
                </div>
                <div>
                    <Image src={'/Book1.jpg'} width={300} height={300}
                        className='w-full rounded-xl h-[280px] object-cover' />
                </div>
            </div>

        </div>
    );
}

export default CourseBasicInfo;