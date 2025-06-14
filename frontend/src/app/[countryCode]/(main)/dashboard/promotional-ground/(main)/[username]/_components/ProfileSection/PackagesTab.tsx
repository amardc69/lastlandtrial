"use client";

import { TabsContent } from "@/components/ui/tabs";
import { UserProfile } from "../interface";

interface PackagesTabProps {
  user: UserProfile;
}

export function PackagesTab({ user }: PackagesTabProps) {
  return (
    <TabsContent value="packages" className="flex-1 overflow-y-auto">
      <div className="space-y-4">
        {/* Placeholder content - can be replaced with actual package data */}
        {user.collaboratedWith && user.collaboratedWith.length > 0 ? (
          user.collaboratedWith.map((brand, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm font-semibold">{brand}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-700">No packages listed.</p>
        )}
      </div>
    </TabsContent>
  );
}