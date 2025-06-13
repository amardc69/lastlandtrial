"use client";

import React from "react";
import { CornerUpLeft, Share2, Info, Flag } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface RecievedMessageProps {
  message: {
    text: string;
    type: "message" | "proposal";
    sender: "received";
  };
}

const handleReply = (message: RecievedMessageProps["message"]) => {
  console.log("Reply to message:", message);
  // Implement reply logic here
};

const handleForward = (message: RecievedMessageProps["message"]) => {
  console.log("Forward message:", message);
  // Implement forward logic here
};

const handleInfo = (message: RecievedMessageProps["message"]) => {
  console.log("View info of message:", message);
  // Implement view info logic here
};

const handleReport = (message: RecievedMessageProps["message"]) => {
  console.log("Report message:", message);
  // Implement report logic here
};

const ReceivedMessageView: React.FC<RecievedMessageProps> = ({ message }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="px-3 py-2 rounded-xl max-w-xs text-sm break-words border transition-colors duration-200 
          bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300"
        >
          {message.text}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onSelect={() => handleReply(message)}>
          <CornerUpLeft className="mr-2 h-4 w-4" />
          Reply
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleForward(message)}>
          <Share2 className="mr-2 h-4 w-4" />
          Forward
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleInfo(message)}>
          <Info className="mr-2 h-4 w-4" />
          Info
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => handleReport(message)}>
          <Flag className="mr-2 h-4 w-4" />
          Report
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ReceivedMessageView;
