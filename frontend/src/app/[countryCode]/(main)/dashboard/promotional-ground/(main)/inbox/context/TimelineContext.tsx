"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Proposal interface (includes all details)
export interface Service {
  name: string;
  logoUrl: string;
  amount: number;
}

export interface Proposal {
  senderName: string;
  text: string;
  date: string;
  proposalVerified: boolean;
  services: Service[];
  status: string;
  proposalType: "Service" | "Package";
  packageNegotiated: boolean;
  contentPromotion: boolean;
  contentType: "normal" | "separate post";
  timeForPost: string;
}

// Define the context type
interface TimelineContextType {
  proposal: Proposal | null;
  setProposal: (proposal: Proposal) => void;
}

// Create the context
const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

// Provider component
export const TimelineContextProvider = ({ children }: { children: ReactNode }) => {
  const [proposal, setProposal] = useState<Proposal | null>(null);

  return (
    <TimelineContext.Provider value={{ proposal, setProposal }}>
      {children}
    </TimelineContext.Provider>
  );
};

// Custom hook for easy access
export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimelineContext must be used within a TimelineContextProvider");
  }
  return context;
};
