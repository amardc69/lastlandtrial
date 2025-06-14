"use client";

import React, { useState, useMemo } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaPinterest,
  FaLinkedin,
  // For TikTok & Reddit icons
  FaTiktok,
  FaReddit
} from "react-icons/fa";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { ArrowUpRight, Clock, CreditCard, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HomePage: React.FC = () => {
  const platforms = [
    {
      name: "Youtube",
      icon: <FaYoutube className="w-5 h-5 text-red-600" />,
      logo: <FaYoutube className="w-6 h-6 text-red-600" />,
      content: [
        {
          type: "Shorts",
          basePrice: 6000,
          description:
            "YouTube Shorts are short-form videos perfect for quick engagement.",
        },
        {
          type: "Video",
          basePrice: 15000,
          description:
            "YouTube Videos offer comprehensive content for your audience.",
        },
        {
          type: "Community Posts",
          basePrice: 6000,
          description: "Engage your audience with YouTube Community Posts.",
        },
        {
          type: "Live",
          basePrice: 25000,
          description: "YouTube Live enables real-time interaction with viewers.",
          disabled: true,
        },
      ],
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="w-5 h-5 text-pink-500" />,
      logo: <FaInstagram className="w-6 h-6 text-pink-500" />,
      content: [
        {
          type: "Story",
          basePrice: 2000,
          description:
            "Instagram Stories are ephemeral posts that engage your audience daily.",
        },
        {
          type: "Reel",
          basePrice: 5000,
          description:
            "Instagram Reels are short, entertaining videos to reach a wider audience.",
        },
        {
          type: "Post",
          basePrice: 3000,
          description:
            "Instagram Posts are permanent content for showcasing your brand.",
          disabled: true,
        },
      ],
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-5 h-5 text-blue-500" />,
      logo: <FaTwitter className="w-6 h-6 text-blue-500" />,
      content: [
        {
          type: "Tweet",
          basePrice: 1500,
          description:
            "Tweets are concise messages to engage with your followers.",
        },
        {
          type: "Video",
          basePrice: 4000,
          description:
            "Twitter Videos enhance your tweets with multimedia content.",
        },
        {
          type: "Space",
          basePrice: 10000,
          description:
            "Twitter Spaces are live audio conversations with your audience.",
        },
        {
          type: "Thread",
          basePrice: 6900,
          description:
            "Twitter Threads let you share extended thoughts across multiple tweets.",
        },
      ],
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5 text-blue-800" />,
      logo: <FaLinkedin className="w-6 h-6 text-blue-800" />,
      content: [
        {
          type: "Post",
          basePrice: 3000,
          description:
            "LinkedIn Posts help you share professional updates and insights.",
        },
        {
          type: "Video",
          basePrice: 7000,
          description:
            "LinkedIn Videos engage your professional network with rich content.",
        },
        {
          type: "Live",
          basePrice: 15000,
          description:
            "LinkedIn Live broadcasts allow real-time professional interactions.",
        },
      ],
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="w-5 h-5 text-blue-600" />,
      logo: <FaFacebook className="w-6 h-6 text-blue-600" />,
      content: [
        {
          type: "Story",
          basePrice: 2500,
          description:
            "Facebook Stories offer temporary content to engage your audience.",
        },
        {
          type: "Reel",
          basePrice: 6000,
          description:
            "Facebook Reels are short videos designed for high engagement.",
        },
        {
          type: "Post",
          basePrice: 3500,
          description:
            "Facebook Posts are versatile content pieces for your page.",
        },
        {
          type: "Live",
          basePrice: 12000,
          description:
            "Facebook Live streams enable real-time interaction with viewers.",
          disabled: true,
        },
      ],
    },
    {
      name: "Pinterest",
      icon: <FaPinterest className="w-5 h-5 text-red-600" />,
      logo: <FaPinterest className="w-6 h-6 text-red-600" />,
      content: [
        {
          type: "Pin",
          basePrice: 2000,
          description: "Pinterest Pins are visual bookmarks to inspire your audience.",
        },
        {
          type: "Video Pin",
          basePrice: 5000,
          description: "Video Pins add motion and engagement to your Pinterest strategy.",
        },
        {
          type: "Story Pin",
          basePrice: 4000,
          description: "Story Pins allow for multi-page storytelling on Pinterest.",
        },
        {
          type: "Idea Pin",
          basePrice: 7000,
          description: "Idea Pins showcase creative ideas and projects to your followers.",
        },
      ],
    },
    // -------------------------------
    // TikTok
    // -------------------------------
    {
      name: "TikTok",
      icon: <FaTiktok className="w-5 h-5 text-black" />,
      logo: <FaTiktok className="w-6 h-6 text-black" />,
      content: [
        {
          type: "Short Video",
          basePrice: 4000,
          description: "TikTok short videos for quick engagement.",
        },
        {
          type: "Live",
          basePrice: 8000,
          description: "TikTok live streaming for real-time audience interaction.",
        },
      ],
    },
    // -------------------------------
    // Reddit
    // -------------------------------
    {
      name: "Reddit",
      icon: <FaReddit className="w-5 h-5 text-orange-500" />,
      logo: <FaReddit className="w-6 h-6 text-orange-500" />,
      content: [
        {
          type: "Post",
          basePrice: 2000,
          description: "Reddit Post to engage with niche communities.",
        },
        {
          type: "AMA",
          basePrice: 5000,
          description: "AMA sessions to connect with the Reddit community in real time.",
        },
      ],
    },
  ];

  // --- State Hooks ---
  const [selectedCards, setSelectedCards] = useState<
    Map<string, { platform: string; content: any }>
  >(new Map());

  // Handle selection toggles
  const handleToggleGroupChange = (selectedValues: string[]) => {
    const newSelected = new Map<string, { platform: string; content: any }>();
    selectedValues.forEach((value) => {
      const [platformName, contentType] = value.split("|");
      const platform = platforms.find((p) => p.name === platformName);
      const content = platform?.content.find((c) => c.type === contentType);
      if (platform && content) {
        newSelected.set(value, { platform: platform.name, content });
      }
    });
    setSelectedCards(newSelected);
  };

  // Calculate total price with useMemo
  const totalPrice = useMemo(() => {
    let total = 0;
    selectedCards.forEach(({ content }) => {
      total += content.basePrice;
    });
    return total;
  }, [selectedCards]);

  const selectedValues = Array.from(selectedCards.keys());

  return (
    <div className="w-full p-6 space-y-6 h-full max-h-screen overflow-y-auto">
      {/* Page Title with HoverCard */}
      <div className="flex items-center justify-between space-x-2">
        <h1 className="text-xl font-bold text-left">Edit your Services</h1>
        <div className="ml-auto">
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Info size={22} className="text-gray-400 hover:text-gray-700 transform rotate-180" />
            </HoverCardTrigger>
            <HoverCardContent className="w-64 p-4 bg-white rounded-md shadow-md">
              <h4 className="font-semibold mb-2">Terms and Conditions</h4>
              <p className="text-sm text-gray-600">
                By selecting services, you agree to our terms and conditions. Please review them carefully before proceeding.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* ToggleGroup for Selecting Services */}
      <ToggleGroup
        type="multiple"
        value={selectedValues}
        onValueChange={handleToggleGroupChange}
        className="flex flex-wrap gap-3 justify-start"
      >
        {platforms.flatMap((platform) =>
          platform.content.map((card) => {
            const key = `${platform.name}-${card.type}`;
            const value = `${platform.name}|${card.type}`;
            const isSelected = selectedCards.has(value);
            const isDisabled = card.disabled || false;

            return (
              <ToggleGroupItem
                key={key}
                value={value}
                disabled={isDisabled}
                className={`flex items-center justify-start border-2 rounded-2xl cursor-pointer transition-colors
                  ${
                    isSelected
                      ? "border-black bg-gray-100"
                      : "border-gray-300 hover:border-gray-400"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  px-4 py-2 whitespace-nowrap`}
              >
                {/* Logo and Service Side by Side */}
                <div className="flex-shrink-0">{platform.logo}</div>
                <div className="text-sm font-medium">{card.type}</div>
              </ToggleGroupItem>
            );
          })
        )}
      </ToggleGroup>

      {/* Display Selected Items and Total Price */}
      {selectedCards.size > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-300 space-y-6">
          <h3 className="text-xl font-semibold">Edit your Preferences</h3>
          <ul className="space-y-4">
            {Array.from(selectedCards.entries()).map(([value, { platform, content }]) => {
              const [platformName] = value.split("|");
              const platformObj = platforms.find((p) => p.name === platformName);
              const platformLogo = platformObj?.logo || null;

              return (
                <Card
                  key={value}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {platformLogo && <div className="flex-shrink-0">{platformLogo}</div>}
                        <span className="font-medium text-base">{platform}</span>
                        <Badge variant="outline" className="text-sm">
                          {content.type}
                        </Badge>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 px-4 pb-4">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {content.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Valid for 30 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-600" />
                          <p className="text-sm font-semibold text-gray-800">
                            ₹{content.basePrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </ul>
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">
              Total Price: ₹{totalPrice.toLocaleString()}
            </h4>
            {/* The button remains, but does nothing now */}
            <button
              // onClick removed
              className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors"
            >
              Send Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
