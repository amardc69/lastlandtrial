"use client";

import React from "react";
import { CornerUpLeft, Edit, Trash, Share2, Info } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface SentMessageProps {
  message: {
    text: string;
    type: "message" | "proposal";
    sender: "sent";
  };
}

const handleReply = (message: SentMessageProps["message"]) => {
  console.log("Reply to message:", message);
  // Implement reply logic here
};

const handleEdit = (message: SentMessageProps["message"]) => {
  console.log("Edit message:", message);
  // Implement edit logic here
};

const handleDelete = (message: SentMessageProps["message"]) => {
  console.log("Delete message:", message);
  // Implement delete logic here
};

const handleForward = (message: SentMessageProps["message"]) => {
  console.log("Forward message:", message);
  // Implement forward logic here
};

const handleInfo = (message: SentMessageProps["message"]) => {
  console.log("View info of message:", message);
  // Implement view info logic here
};

const SentMessageView: React.FC<SentMessageProps> = ({ message }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="px-3 py-2 rounded-xl max-w-xs text-sm break-words border transition-colors duration-200 
          bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
        >
          {message.text}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onSelect={() => handleReply(message)}>
          <CornerUpLeft className="mr-2 h-4 w-4" />
          Reply
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleEdit(message)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleDelete(message)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleForward(message)}>
          <Share2 className="mr-2 h-4 w-4" />
          Forward
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => handleInfo(message)}>
          <Info className="mr-2 h-4 w-4" />
          Info
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SentMessageView;
