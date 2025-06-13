"use client";

import { Star } from "lucide-react";

interface RatingBreakdownProps {
  breakdown: Record<number, number>;
  averageRating: number;
  totalReviews: number;
}

export function RatingBreakdown({
  breakdown,
  averageRating,
  totalReviews,
}: RatingBreakdownProps) {
  const ratingLevels = [5, 4, 3, 2, 1];
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 space-y-3">
        <div className="font-semibold text-gray-800">Rating Breakdown</div>
        {ratingLevels.map((level) => (
          <div key={level} className="flex items-center gap-4 text-sm">
            <span className="whitespace-nowrap flex items-center justify-end gap-1 w-16">
              {level} Star{level > 1 ? "s" : ""} [{breakdown[level]}]
            </span>
            <div className="flex-1 bg-gray-200 h-2 rounded">
              <div
                className="bg-black h-2 rounded"
                style={{
                  width: `${
                    totalReviews > 0
                      ? (breakdown[level] / totalReviews) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/2 space-y-3">
        <div className="flex items-center gap-3 text-2xl font-semibold text-black">
          {averageRating.toFixed(1)}
          <Star
            className="inline w-6 h-6 text-black stroke-current"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="3"
          />
        </div>
        <div className="text-sm space-y-2 text-gray-500">
          <div className="flex items-center justify-between">
            <span>Influencer communication level</span>
            <span className="text-black font-medium flex items-center gap-1">
              {averageRating.toFixed(1)}
              <Star
                className="inline w-4 h-4 text-black stroke-current"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="3"
              />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Quality of delivery</span>
            <span className="text-black font-medium flex items-center gap-1">
              {averageRating.toFixed(1)}
              <Star
                className="inline w-4 h-4 text-black stroke-current"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="3"
              />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Value of delivery</span>
            <span className="text-black font-medium flex items-center gap-1">
              {averageRating.toFixed(1)}
              <Star
                className="inline w-4 h-4 text-black stroke-current"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="3"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}