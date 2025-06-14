"use client";

import React from "react";
import Chat from "./components/Chat";
import TimelineManager from "./components/TimelineManager";
import { TimelineContextProvider } from "./context/TimelineContext";

export default function HomePage() {

  return (
    <TimelineContextProvider>
      <div className="h-full max-h-[90vh] flex gap-4">
        <Chat />
        <TimelineManager />
      </div>
    </TimelineContextProvider>
  );
}
