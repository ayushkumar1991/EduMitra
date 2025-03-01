import React from 'react';
import { IoBarChartSharp } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoBook } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";

function CourseDetail({ course }) {
    return (
        <div className='border p-7 rounded-xl shadow-sm mt-3'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                <div className='flex gap-2'>
                    <IoBarChartSharp className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-600'>Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                <FaClockRotateLeft  className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-600'>Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                <IoBook  className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-600'>No Of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.NoOfChapters}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <FaRegPlayCircle className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-600'>Video Included</h2>
                        <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default CourseDetail