"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  senderId: string;
  message: string;
  timestamp: number;
};

interface SocketContextType {
  socket: Socket | null;
  messages: Message[];
  joinChat: (userId: string) => void;
  sendMessage: (receiverId: string, message: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const joinChat = (userId: string) => {
    if (!userId) {
      alert("Please enter a valid user ID");
      return;
    }
    // Create a new socket connection with the given userId
    const newSocket = io("http://localhost:3001", {
      query: { userId },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected! ID:", newSocket.id);
      newSocket.emit("fetchMessages");
    });

    // Listen for all stored messages
    newSocket.on("allMessages", (storedMessages: Message[]) => {
      setMessages(storedMessages);
    });

    // Listen for new real-time messages
    newSocket.on("newMessage", (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    setSocket(newSocket);
  };

  const sendMessage = (receiverId: string, message: string) => {
    if (!socket) {
      alert("You must join the chat first!");
      return;
    }
    if (!receiverId || !message) {
      alert("Receiver ID and message are required");
      return;
    }

    socket.emit("sendMessage", { receiverId, message });
  };

  useEffect(() => {
    // Disconnect the socket on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, messages, joinChat, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketWrapper");
  }
  return context;
};
