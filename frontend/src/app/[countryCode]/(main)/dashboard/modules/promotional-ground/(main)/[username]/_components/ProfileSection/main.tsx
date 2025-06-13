"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeftSideProps } from "../interface";
import { sampleReviews, getRatingBreakdown, getAverageRating } from "./review-data";
import { UserProfileHeader } from "./UserProfileHeader";
import { ContentTab } from "./ContentTab";
import { CollaborationsTab } from "./CollaborationsTab";
import { ReviewsTab } from "./ReviewsTab";
import { PackagesTab } from "./PackagesTab";
import { AboutTab } from "./AboutTab";

export const ProfileSection: React.FC<LeftSideProps> = ({ user, fallbacks }) => {
  const stats = {
    followers: user.followers || "0",
    following: user.following || "0",
    engagement: "95.5%",
  };

  const breakdown = getRatingBreakdown(sampleReviews);
  const averageRating = getAverageRating(sampleReviews);
  const totalReviews = sampleReviews.length;

  return (
    <div className="md:w-3/5 w-full h-full">
      <Card className="border border-gray-300 shadow-none rounded-2xl overflow-y-auto min-h-full max-h-screen">
        <UserProfileHeader user={user} fallbacks={fallbacks} stats={stats} />

        <CardContent className="p-6 pt-8 flex-1 flex flex-col">
          <Tabs defaultValue="content" className="flex flex-col flex-1">
            <TabsList className="grid grid-cols-6 w-full mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="collaborations">Collab's</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({totalReviews})
              </TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <ContentTab />
            <CollaborationsTab user={user} />
            <ReviewsTab
              reviews={sampleReviews}
              breakdown={breakdown}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
            <PackagesTab user={user} />
            <AboutTab user={user} fallbacks={fallbacks} />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
