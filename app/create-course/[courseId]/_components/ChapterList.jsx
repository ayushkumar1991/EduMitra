"use client"
import React from 'react';
import { FcClock } from "react-icons/fc";
import { FaRegCheckCircle } from "react-icons/fa";
import EditChapters from './EditChapters';

function ChapterList({ course }) {
    return (
        <div className='mt-3'>
            <h2 className='font-medium text-xl'>Chapters:-</h2>
            <div className='mt-2'>
                {/* Add a return statement inside the map function */}
                {course?.courseOutput?.Chapters.map((chapter, index) => (
                    <div className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
                        <div className="flex gap-2 items-center" ey={index}>
                            <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2'>{index + 1}</h2>
                            <div>
                                <h2 className='font-medium text-lg'>{chapter?.ChapterName} <EditChapters course={course} index={index} /> </h2>
                                <p className='text-sm text-gray-500'>{chapter?.About}</p>
                                <p className='flex gap-2 text-primary items-center'> <FcClock /> {chapter?.Duration}</p>
                            </div>
                        </div>
                        <FaRegCheckCircle className='text-4xl text-green-300 flex-none'/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterList;