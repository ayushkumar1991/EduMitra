"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CourseRecommendations = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const recommendedCourses = [
        {
          id: 1,
          title: "Introduction to Web Design",
          description: "Learn the basics of web design principles.",
          rating: 4.7,
        },
        {
          id: 2,
          title: "React for Beginners",
          description: "Understand the fundamentals of React.js.",
          rating: 4.8,
        },
        {
          id: 3,
          title: "Advanced JavaScript",
          description: "Deep dive into JavaScript concepts.",
          rating: 4.6,
        },
      ];
      setCourses(recommendedCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="p-4 shadow-md">
          <CardTitle>{course.title}</CardTitle>
          <CardContent>
            <p>{course.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              ⭐ {course.rating} Rating
            </p>
            <Button className="mt-4 w-full">Enroll Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseRecommendations;
