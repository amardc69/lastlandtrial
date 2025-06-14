"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Review } from "../interface";
import { RatingBreakdown } from "./RatingBreakdown";
import { ReviewCard } from "./ReviewCard";

interface ReviewsTabProps {
  reviews: Review[];
  breakdown: Record<number, number>;
  averageRating: number;
  totalReviews: number;
}

export function ReviewsTab({
  reviews,
  breakdown,
  averageRating,
  totalReviews,
}: ReviewsTabProps) {
  return (
    <TabsContent value="reviews" className="flex-1 overflow-y-auto">
      <div className="space-y-6 py-4 px-6 pb-6">
        <RatingBreakdown
          breakdown={breakdown}
          averageRating={averageRating}
          totalReviews={totalReviews}
        />
        <div className="mt-8 space-y-6">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
      </div>
    </TabsContent>
  );
}