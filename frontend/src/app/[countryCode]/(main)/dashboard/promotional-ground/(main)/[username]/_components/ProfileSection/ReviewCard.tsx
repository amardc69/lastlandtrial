"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, Dot } from "lucide-react";
import { Review } from "../interface";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border border-gray-200 rounded-2xl p-4">
      <CardHeader className="flex flex-col p-0">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 shadow-2xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
            <AvatarImage src={review.avatar} alt={review.name} />
            <AvatarFallback>
              {review.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-md">{review.name}</CardTitle>
            <CardDescription>{review.location}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator className="mx-auto bg-gray-200 shadow mt-4 mb-5 rounded-full" />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="3"
            />
          ))}
          <span className="text-black font-bold text-md ml-1">
            {review.rating}
          </span>
          <Dot className="w-5 h-5 text-gray-300" />
          <span className="text-gray-500 text-sm">{review.date}</span>
        </div>
      </div>
      <CardContent className="p-0 mt-4">
        <p className="text-md text-gray-600">{review.text}</p>
      </CardContent>
    </Card>
  );
}