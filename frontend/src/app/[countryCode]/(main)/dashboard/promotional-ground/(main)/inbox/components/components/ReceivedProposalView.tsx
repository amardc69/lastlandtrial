"use client";

import React from "react";
import { Check, HelpCircle, Inbox, Archive, Share2, Info } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"; // Adjust path as needed

interface ReceivedProposalViewProps {
  message: {
    text: string;
    type: "proposal" | "message";
  };
}

// Example function to integrate with a timeline manager or any other logic
const sendToTimelineManager = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("Sending received proposal to timeline manager:", proposal);
};

// Action handlers specific to received proposals
const handleApprove = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("Approve Proposal:", proposal);
};

const handleRequestChanges = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("Request Changes for Proposal:", proposal);
};

const handleMarkAsUnread = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("Mark as Unread:", proposal);
};

const handleArchive = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("Archive Proposal:", proposal);
};

const handleForward = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("Forward Proposal:", proposal);
};

const handleViewDetails = (proposal: ReceivedProposalViewProps["message"]) => {
  console.log("View Details of Received Proposal:", proposal);
};

const ReceivedProposalView: React.FC<ReceivedProposalViewProps> = ({ message }) => {
  // Handle left-click on the proposal view
  const handleClick = () => {
    sendToTimelineManager(message);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          onClick={handleClick}
          className="cursor-pointer relative px-4 py-3 rounded-2xl max-w-xs text-sm break-words border transition-colors duration-200 bg-green-50 border-green-300 hover:bg-green-100"
        >
          <h4 className="font-bold mb-1">Proposal</h4>
          <p>{message.text}</p>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuItem onSelect={() => handleApprove(message)}>
          <Check className="mr-2 h-4 w-4" />
          Approve
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleRequestChanges(message)}>
          <HelpCircle className="mr-2 h-4 w-4" />
          Request Changes
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleMarkAsUnread(message)}>
          <Inbox className="mr-2 h-4 w-4" />
          Mark as Unread
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleForward(message)}>
          <Share2 className="mr-2 h-4 w-4" />
          Forward
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleArchive(message)}>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onSelect={() => handleViewDetails(message)}>
          <Info className="mr-2 h-4 w-4" />
          View Details
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ReceivedProposalView;
