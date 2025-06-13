"use client";

import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import { ArrowUp, Plus, Bell } from "lucide-react";
import { useSocket } from "@/providers/SocketWrapper";
import SentMessageView from "./components/SentMessageView";
import ReceivedMessageView from "./components/ReceivedMessageView";
import SentProposalView from "./components/SentProposalView";
import ReceivedProposalView from "./components/ReceivedProposalView";

interface Message {
  text: string;
  sender: "sent" | "received";
  type: "message" | "proposal";
}

// Type guards (optional helpers)
const isSentMessage = (msg: Message): msg is Message & { sender: "sent" } =>
  msg.sender === "sent";

const isReceivedMessage = (msg: Message): msg is Message & { sender: "received" } =>
  msg.sender === "received";

const Chat: React.FC = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Send the current input as a JSON message.
   */
  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Create a sent message
    const newMessage: Message = {
      text: message.trim(),
      sender: "sent",
      type: "proposal",
    };
    setMessages((prev) => [...prev, newMessage]);

    const jsonMessage = {
      type: newMessage.type,
      content: message.trim(),
      // Additional properties (e.g., userId, timestamp) can be added here
    };

    if (socket) {
      socket.emit("message", JSON.stringify(jsonMessage));
    }
    setMessage("");
  };

  /**
   * Capture the "Enter" key to send messages.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Listen for incoming messages from the socket server.
   */
  useEffect(() => {
    if (!socket) return;

    const handleReceivedMessage = (data: string) => {
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        console.error("Error parsing incoming socket data as JSON:", err);
        return;
      }

      const receivedMessage: Message = {
        text: parsedData.content || "[No Content]",
        sender: "received",
        type: parsedData.type || "message",
      };

      setMessages((prev) => [...prev, receivedMessage]);
    };

    // Listen for "decision-response" or any relevant socket event name
    socket.on("decision-response", handleReceivedMessage);

    return () => {
      socket.off("decision-response", handleReceivedMessage);
    };
  }, [socket]);

  /**
   * Auto-scroll to the bottom whenever a new message arrives.
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-2/6 flex flex-col border border-gray-300 rounded-2xl shadow">
      {/* Header with user info and icons */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <img
            src="/[countryCode]/(main)/dashboard/modules/promotional-ground/(main)/inbox/Brain-graph.svg"
            alt="Brain"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-offset-2 ring-green-600"
          />
          <div>
            <div className="font-semibold text-sm">Brain</div>
            <div className="text-xs text-gray-500">@brain</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full" title="Notifications">
            <Bell className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-full border hover:bg-gray-100"
            title="Select a user to chat with"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Message display area */}
      <div className="flex-grow max-h-screen overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "sent" ? "justify-end" : "justify-start"}`}
          >
            {/* 
              If it's a proposal and "sent", show SentProposalView. 
              If it's a proposal and "received", show ReceivedProposalView. 
              Otherwise, show the normal "message" views.
            */}
            {msg.type === "proposal" ? (
              msg.sender === "sent" ? (
                <SentProposalView
                  message={msg}
                  senderName="Adete Dahiya"
                  // senderAvatarUrl can be added if available, e.g. senderAvatarUrl="/path/to/avatar.jpg"
                />
              ) : (
                <ReceivedProposalView message={msg} />
              )
            ) : // else it's a "message"
            isSentMessage(msg) ? (
              <SentMessageView message={msg} />
            ) : isReceivedMessage(msg) ? (
              <ReceivedMessageView message={msg} />
            ) : null}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area for new messages */}
      <div className="p-3 flex gap-3">
        <input
          type="text"
          className="border flex-grow px-3 py-2 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="bg-white border w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-black">
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full"
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
