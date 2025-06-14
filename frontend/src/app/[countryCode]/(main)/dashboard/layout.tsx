import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "./_components/nav-actions";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "./_components/DynamicBreadcrumb";
import { Toaster } from "@/components/ui/sonner"
import { TanStackProvider } from './TanStackProvider';

export const metadata: Metadata = {
  title: "Last Land",
  description: "This is the Best.",
  icons: {
    icon: "/common/favicon.ico", // Path to your favicon
  },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger disabled className="mr-2" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <DynamicBreadcrumb />
                </div>
                <div className="ml-auto px-3">
                  <NavActions />
                </div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
