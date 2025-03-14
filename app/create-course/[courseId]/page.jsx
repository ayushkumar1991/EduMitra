"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    console.log(params)
    params && GetCourse();
  }, [params, user])

  const GetCourse = async () => {

    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))

    setCourse(result[0]);
    console.log(result);
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      {/* basic info */}
      <CourseBasicInfo course={course}  />

      {/* course detail */}
      <CourseDetail course={course}/>

      {/* list of lesson  */}
      <ChapterList course={course}/>

    </div>
  )
}

export default CourseLayout