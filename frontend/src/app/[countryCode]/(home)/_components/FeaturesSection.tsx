"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineSupport,
  HiOutlineCog,
  HiOutlinePuzzle,
  HiOutlineLogin, // Assuming this was for a feature like "Easy Onboarding" or similar
} from "react-icons/hi";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="w-full sm:w-64 h-auto sm:h-64 border border-gray-300 rounded-lg flex flex-col justify-center items-center p-4 text-center">
      <div className="text-5xl text-black mb-2 flex justify-center">{icon}</div>
      <CardTitle className="text-xl font-semibold text-black">
        {title}
      </CardTitle>
      <CardContent className="mt-2">
        <CardDescription className="text-gray-700 text-sm">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Our Features
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the benefits of working with us. We deliver innovative, fast,
            and secure solutions, tailored to meet your specific needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          <FeatureCard
            icon={<HiOutlineLogin className="h-12 w-12 text-black" />} // Changed from HiOutlineLogin to something more generic for design if needed.
            title="Innovative Design"
            description="Modern, intuitive designs tailored to your business requirements."
          />
          <FeatureCard
            icon={<HiOutlineLightningBolt className="h-12 w-12 text-black" />}
            title="Fast Performance"
            description="Solutions optimized for exceptional speed and reliability."
          />
          <FeatureCard
            icon={<HiOutlineShieldCheck className="h-12 w-12 text-black" />}
            title="Secure Solutions"
            description="We prioritize security, adhering to the latest industry standards."
          />
          <FeatureCard
            icon={<HiOutlineSupport className="h-12 w-12 text-black" />}
            title="24/7 Support"
            description="Dedicated support team available around the clock."
          />
          <FeatureCard
            icon={<HiOutlineCog className="h-12 w-12 text-black" />}
            title="Customization"
            description="Tailored solutions to meet your unique requirements seamlessly."
          />
          <FeatureCard
            icon={<HiOutlinePuzzle className="h-12 w-12 text-black" />}
            title="Seamless Integration"
            description="Effortless integration with your existing systems and workflows."
          />
        </div>
      </div>
    </section>
  );
}