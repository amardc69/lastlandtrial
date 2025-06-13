"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserProfile, Fallbacks } from "../interface";

interface AboutTabProps {
  user: UserProfile;
  fallbacks: Fallbacks;
}

export function AboutTab({ user, fallbacks }: AboutTabProps) {
  return (
    <TabsContent value="about" className="flex-1 overflow-y-auto">
      <p className="text-md text-gray-700 mb-4">{fallbacks.bio}</p>
      {user.category && user.category.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {user.category.map((category: string) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      )}
    </TabsContent>
  );
}