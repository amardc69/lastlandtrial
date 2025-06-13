"use server";

import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { prisma } from "@/lib/prisma";
import { SocketWrapper } from "@/providers/SocketWrapper";
import { Toaster } from "@/components/ui/sonner"


export default async function PromotionalGroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/in/auth/login");
  // }

  // const user = await prisma.user.findUnique({
  //   where: { email: session.user?.email ?? "" },
  // });

  // if (!user) {
  //   redirect(`/in/auth/login`);
  // }

  // if (!user.promotionalground) {
  //   redirect(`/in/dashboard/modules/promotional-ground/create-account`);
  // }

  return (
    <SocketWrapper>
      {children}
    </SocketWrapper>
  );
}
