"use client";

import { FaStar } from "react-icons/fa";

export default function ReviewList({ reviews }) {
  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-2">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="mb-3 p-2 border-b">
            <div className="flex items-center space-x-1">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="mt-1">{review.review}</p>
          </div>
        ))
      )}
    </div>
  );
}
