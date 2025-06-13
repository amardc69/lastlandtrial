import type { Metadata } from "next";
import "@/app/globals.css";
import SessionWrapper from "@/providers/SessionWrapper";
import Header from "./_components/Header"; // We'll create this next

export const metadata: Metadata = {
  title: "Last Land",
  description: "This is the Best.",
  icons: {
    icon: "/common/favicon.ico", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <Header />
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
