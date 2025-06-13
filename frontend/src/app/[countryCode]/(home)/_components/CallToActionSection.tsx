"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="py-20 from-gray-200 to-gray-300 bg-gradient-to-b">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 text-center space-y-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
          Ready to Elevate Your Business?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl">
          Take the next step in achieving your business goals. Partner with{" "}
          <span className="font-semibold text-black">Last Land</span> to access tailored solutions designed to transform your challenges into opportunities.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            asChild
            className="px-10 py-4 text-white bg-black rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <Link href="/explore/contact-us">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}