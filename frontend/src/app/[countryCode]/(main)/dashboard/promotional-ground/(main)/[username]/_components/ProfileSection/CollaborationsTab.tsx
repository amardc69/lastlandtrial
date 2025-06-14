"use client";

import { TabsContent } from "@/components/ui/tabs";
import { UserProfile } from "../interface";

interface CollaborationsTabProps {
  user: UserProfile;
}

export function CollaborationsTab({ user }: CollaborationsTabProps) {
  return (
    <TabsContent value="collaborations" className="flex-1 overflow-y-auto">
      <div className="space-y-4">
        {user.collaboratedWith && user.collaboratedWith.length > 0 ? (
          user.collaboratedWith.map((brand, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm font-semibold">{brand}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-700">No collaborations listed.</p>
        )}
      </div>
    </TabsContent>
  );
}