import React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Last Land",
  description: "This is the Best.",
  icons: {
    icon: "/common/favicon.ico", // Path to your favicon
  },
};

export default async function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
