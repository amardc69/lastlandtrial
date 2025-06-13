"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-16 space-y-10 lg:space-y-0 lg:space-x-16">
        {/* Text Content */}
        <div className="lg:w-1/2 text-white space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            About Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            At Last Land, we are passionate about delivering exceptional solutions that empower businesses to soar. Our team of seasoned professionals excels in crafting innovative strategies tailored to your unique needs, ensuring you achieve your goals with efficiency and style.
          </p>
          <Link href="/explore/about-us">
            <Button
              className="flex items-center justify-center cursor-pointer 
                        border-2 border-transparent text-gray-200 
                        hover:border-white hover:bg-white/10 hover:text-white 
                        transform transition-transform duration-300
                        transition-all ease-in-out"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Card Content */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* Card 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Innovative Solutions
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              We specialize in creating tailored solutions to meet your unique business challenges with innovation and precision.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Expert Team
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Our team of experts brings decades of experience to deliver results that exceed expectations.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Client-Centric Approach
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              We prioritize your goals and work closely with you to ensure success at every step.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Future-Ready Strategies
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Our solutions are designed to not only address today’s challenges but also prepare you for tomorrow’s opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}