"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { NavMenu } from "./NavigationMenu";
import { HiOutlineLogin } from "react-icons/hi";


const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = !!session && status === "authenticated";


  return (
    <>
      <header className="top-0 z-50 bg-gradient-to-b from-gray-200 to-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/[countryCode]/(home)/common/logo.png"
                alt="Last Land Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
              <span className="font-angelos text-2xl text-gray-800">
                Last Land
              </span>
            </Link>
          </div>

          {/* Navigation (desktop) */}
          <div className="flex-1 hidden lg:flex justify-center">
            <NavMenu />
          </div>

          {/* Session-based login/dashboard & avatar - reserve space to prevent shift */}
          <div
            className="ml-4 flex items-center space-x-4 min-w-[200px] justify-end"
            style={{ minWidth: "200px" }}
          >
            {isLoading && (
              // Animated placeholder while loading, same approximate size as final state
              <div className="flex items-center space-x-4">
                {/* Placeholder for button (same width and height as final button) */}
                <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse" />
                {/* Placeholder for avatar (same size as final avatar) */}
                <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse" />
              </div>
            )}

            {!isLoading && !isAuthenticated && (
              <Link href="/in/auth/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center whitespace-nowrap w-24 justify-center cursor-pointer 
                            border border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-400 hover:bg-white"
                >
                  <HiOutlineLogin className="h-5 w-5 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {!isLoading && isAuthenticated && (
              <>
                {/* If authenticated, show dashboard button with fixed width */}
                <Link href="/in/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center whitespace-nowrap w-24 justify-center cursor-pointer 
                              border border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-100"
                  >
                    <HiOutlineLogin className="h-5 w-5 mr-2 rotate-90" />
                    Dashboard
                  </Button>
                </Link>

                {/* Show avatar if authenticated */}
                <Link
                  href="/dashboard/settings/account"
                  className="group inline-flex items-center justify-center"
                  aria-label="Profile"
                >
                  <Avatar
                    className={cn(
                      "rounded-xl h-10 w-10 bg-gray-200 hover:bg-gray-300 transition-transform duration-200 ease-in-out",
                      "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                    )}
                  >
                    <AvatarImage
                      src={session?.user?.image || "/[countryCode]/(home)/common/avatardefault.png"}
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-gray-400 text-white font-bold">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* For smaller screens, show navigation below logo and buttons */}
        <div className="lg:hidden px-4 pb-4">
          <NavMenu />
        </div>
      </header>
    </>
  );
};

export default Header;
