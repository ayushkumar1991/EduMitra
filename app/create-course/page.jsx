"use client"
import React, { useContext, useEffect, useState } from 'react';
import { HiClipboardDocumentCheck, HiMiniSquares2X2 } from "react-icons/hi2";
import { FcIdea } from "react-icons/fc";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { Flag } from 'lucide-react';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <FcIdea />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router=useRouter();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput])


  // Used to check Next Button Enable or Not
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
      return true;
    }
    else if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapter == undefined)) {
      return true;
    }
    return false;
  }

  const GenerateCourseLayout = async () => {
    setLoading(true)
    const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name , Description, Along with Chapter Name, about, Duration:'
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', Level: ' + userCourseInput?.level + ', Duration: ' + userCourseInput?.duration + ' , NoOf Chapters: ' + userCourseInput?.noOfChapter + ', in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response.text()));
  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    setLoading(true)
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl
    })
    console.log("FINISHED");
    setLoading(false);
    router.replace('/create-course/'+id)
  }

  return (
    <div>
      {/* Stepper */}
      <div className='flex flex-col justify-between items-center mt-10'>
        <h2 className='text-4xl text-primary font-medium'>Create Course</h2>

        <div className='flex mt-10'>
          {StepperOptions.map((item, index) => (
            <div key={item.id} className='flex items-center justify-between w-full'>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div className={`bg-green-200 p-3 rounded-full text-purple ${activeIndex >= index && 'bg-green-500'}`}>
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-green-200 ${activeIndex - 1 >= index && 'bg-green-500'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 px-10 md:px-20'>
        {/* Component */}
        {activeIndex === 0 ? <SelectCategory /> :
          activeIndex == 1 ? <TopicDescription /> :
            <SelectOption />}

        {/* Next Previous Button */}
        <div className='flex justify-between mt-10'>
          <Button disabled={activeIndex === 0} variant='outline' onClick={() => setActiveIndex(activeIndex - 1)}>
            Previous
          </Button>
          {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
          {activeIndex === 2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>Generate Course</Button>}

        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;