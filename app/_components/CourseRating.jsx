"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // Ensure you have this component from shadcn

export default function CourseRating({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and a review.");
      return;
    }
    onSubmit({ rating, review });
    setRating(0);
    setReview("");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Rate this Course</h2>
      <div className="flex space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer transition ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            size={30}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded-md"
        rows="3"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <Button onClick={handleSubmit} className="mt-3">
        Submit Review
      </Button>
    </div>
  );
}
