import React, { useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Convert duration to minutes for consistency
  const convertDurationToMinutes = (duration) => {
    if (duration.includes("1 Hour")) return 60;
    if (duration.includes("2 Hours")) return 120;
    if (duration.includes("More than 3 Hours")) return 180;
    return 60; // Default to 1 hour
  };

  // Automatically recalculate chapter durations
  useEffect(() => {
    const totalMinutes = convertDurationToMinutes(userCourseInput?.duration || "1 Hour");
    const numChapters = parseInt(userCourseInput?.noOfChapter || "1", 10);

    if (numChapters > 0) {
      const chapterDuration = (totalMinutes / numChapters).toFixed(2);
      setUserCourseInput((prev) => ({
        ...prev,
        chapterDuration: `${chapterDuration} minutes per chapter`,
      }));
    }
  }, [userCourseInput?.duration, userCourseInput?.noOfChapter]);

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        {/* Difficulty Level */}
        <div>
          <label className="text-sm">🎓 Difficulty Level</label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label className="text-sm">⌛ Course Duration</label>
          <Select
            defaultValue={userCourseInput?.duration}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video Option */}
        <div>
          <label className="text-sm">▶️ Add Video</label>
          <Select
            defaultValue={userCourseInput?.displayVideo}
            onValueChange={(value) => handleInputChange("displayVideo", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div>
          <label className="text-sm">📖 Number of Chapters</label>
          <Input
            type="number"
            className="h-14 text-lg"
            defaultValue={userCourseInput?.noOfChapter}
            onChange={(event) => handleInputChange("noOfChapter", event.target.value)}
            min="1"
          />
          {/* Display Calculated Duration per Chapter */}
          <p className="text-gray-500 mt-2">
            ⏳ {userCourseInput?.chapterDuration || "60 minutes per chapter"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
