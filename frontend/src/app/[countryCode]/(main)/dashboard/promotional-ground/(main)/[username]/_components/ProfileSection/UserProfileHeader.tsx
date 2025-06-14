"use client";

import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { socialMediaIcons } from "./SocialMedia";
import { ProfileSectionProps } from "../interface";

interface UserProfileHeaderProps extends ProfileSectionProps {
  stats: {
    followers: string;
    following: string;
    engagement: string;
  };
}

export function UserProfileHeader({
  user,
  fallbacks,
  stats,
}: UserProfileHeaderProps) {
  return (
    <CardHeader className="h-40 relative">
      <div className="absolute top-0 left-0 w-full p-6 text-white">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <Avatar className="w-32 h-32 shadow-2xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
            <AvatarImage src={fallbacks.avatar} alt={fallbacks.name} />
            <AvatarFallback className="text-white font-bold">
              {fallbacks.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <CardTitle className="text-3xl font-bold text-black">
                {fallbacks.name}
              </CardTitle>
              {user.isVerified && (
                <Badge
                  variant="outline"
                  className="inline-flex items-center text-gray-900 bg-gray-50 border-gray-500 mt-1 md:mt-0"
                >
                  <Check className="w-3 h-3 mr-1" strokeWidth={4} />
                  Verified
                </Badge>
              )}
            </div>

            <CardDescription className="text-lg text-gray-700 mb-8">
              <div className="flex items-center gap-4">
                {user.username}
                {user.platforms && user.platforms.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {user.platforms.map((platform, index) => {
                      const social = socialMediaIcons[platform.toLowerCase()];
                      if (!social) return null;
                      const Icon = social.icon;
                      return (
                        <div
                          key={`${platform}-${index}`}
                          className="flex items-center"
                        >
                          <Icon className={`w-5 h-5 ${social.colorClass}`} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardDescription>

            <div className="flex gap-6 text-sm text-black">
              <div>
                <span className="font-bold">{stats.followers}</span>
                <span className="ml-1 text-gray-700">Followers</span>
              </div>
              <div>
                <span className="font-bold">{stats.following}</span>
                <span className="ml-1 text-gray-700">Following</span>
              </div>
              <div>
                <span className="font-bold">{stats.engagement}</span>
                <span className="ml-1 text-gray-700">Engagement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}