"use client";

import { TabsContent } from "@/components/ui/tabs";

export function ContentTab() {
  return (
    <TabsContent value="content" className="flex-1">
      <div className="grid grid-cols-3 gap-1">
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 flex items-center justify-center text-gray-600 h-52 rounded-2xl"
            >
              Post {index + 1}
            </div>
          ))}
      </div>
    </TabsContent>
  );
}