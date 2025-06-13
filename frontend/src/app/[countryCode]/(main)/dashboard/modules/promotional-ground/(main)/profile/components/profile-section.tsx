"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, Upload, UserCheck, FilePlus, Package, Users } from "lucide-react";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaPinterest,
  FaLinkedin,
  FaGlobe,
  FaTiktok,
  FaReddit,
  FaSnapchatGhost,
  FaDiscord,
} from "react-icons/fa";
import { SiClubhouse } from "react-icons/si";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

// Shadcn UI form components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { IconType } from "react-icons";

interface SocialMediaLink {
  platform: string;
  icon: IconType;
  colorClass: string;
  hoverColorClass: string;
}

const socialMediaIcons: Record<string, SocialMediaLink> = {
  twitter:   { platform: "Twitter",   icon: FaTwitter,       colorClass: "text-blue-500",    hoverColorClass: "hover:text-blue-500" },
  instagram: { platform: "Instagram", icon: FaInstagram,     colorClass: "text-pink-500",    hoverColorClass: "hover:text-pink-500" },
  youtube:   { platform: "YouTube",   icon: FaYoutube,       colorClass: "text-red-600",     hoverColorClass: "hover:text-red-600" },
  facebook:  { platform: "Facebook",  icon: FaFacebook,      colorClass: "text-blue-600",    hoverColorClass: "hover:text-blue-600" },
  pinterest: { platform: "Pinterest", icon: FaPinterest,     colorClass: "text-red-600",     hoverColorClass: "hover:text-red-600" },
  linkedin:  { platform: "LinkedIn",  icon: FaLinkedin,      colorClass: "text-blue-800",    hoverColorClass: "hover:text-blue-800" },
  tiktok:    { platform: "TikTok",    icon: FaTiktok,        colorClass: "text-black",       hoverColorClass: "hover:text-black" },
  reddit:    { platform: "Reddit",    icon: FaReddit,        colorClass: "text-orange-500",  hoverColorClass: "hover:text-orange-500" },
  snapchat:  { platform: "Snapchat",  icon: FaSnapchatGhost, colorClass: "text-yellow-500",  hoverColorClass: "hover:text-yellow-500" },
  discord:   { platform: "Discord",   icon: FaDiscord,       colorClass: "text-indigo-600",  hoverColorClass: "hover:text-indigo-600" },
  clubhouse: { platform: "Clubhouse", icon: SiClubhouse,     colorClass: "text-green-600",   hoverColorClass: "hover:text-green-600" },
  website:   { platform: "Website",   icon: FaGlobe,         colorClass: "text-gray-500",    hoverColorClass: "hover:text-gray-500" },
};

interface LeftSideProps {
  user: {
    username: string;
    isVerified: boolean;
    onSocialMedia?: string[];
    collaboratedWith?: string[];
    category?: string[];
    followers?: string;
    following?: string;
    bio?: string;
    avatarurl?: string;
    name?: string;
  };
  fallbacks: {
    name: string;
    avatar: string;
    bio: string;
  };
}

export function LeftSide({ user, fallbacks }: LeftSideProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Form state for name, email, password and bio.
  const [formData, setFormData] = useState({
    name: user.name || fallbacks.name,
    email: "",
    password: "",
    bio: user.bio || fallbacks.bio,
  });

  // State for avatar file and its preview.
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatarurl || fallbacks.avatar);

  // Ref for the hidden file input.
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Dummy edit handler – replace with your actual edit logic.
  const handleEditProfile = () => {
    console.log("Profile updated:", { ...formData, avatarFile });
    // Your edit profile logic here...
    setIsSheetOpen(false);
  };

  // Dummy OAuth handler – replace with your actual OAuth logic.
  const handleOAuth = (platform: string) => {
    console.log(`Initiate OAuth flow for ${platform}`);
  };

  // Dummy upload option handler – replace with your actual upload logic.
  const handleUploadOption = (option: "content" | "package" | "collaboration") => {
    console.log(`Upload option selected: ${option}`);
  };

  const stats = {
    followers: user.followers || "0",
    following: user.following || "0",
    engagement: "95.5%",
  };

  // Normalize the user's social media list for easy comparison
  const activeSocialMedia = user.onSocialMedia
    ? user.onSocialMedia.map((platform) => platform.toLowerCase())
    : [];

  return (
    <div className="md:w-3/5 w-full h-full">
      <Card className="border border-gray-300 shadow-none rounded-2xl overflow-y-auto min-h-full max-h-screen">
        <CardHeader className="h-40 relative">
          {/* Background and content container */}
          <div className="absolute top-0 left-0 w-full p-6 text-white">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <Avatar className="w-32 h-32 shadow-2xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
                <AvatarImage src={fallbacks.avatar} alt={fallbacks.name} className="object-cover" />
                <AvatarFallback className="text-white font-bold">
                  {fallbacks.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-3xl font-bold text-black">
                    {fallbacks.name}
                  </CardTitle>
                  {user.isVerified ? (
                    <Badge
                      variant="outline"
                      className="inline-flex items-center text-gray-800 border-gray-400 mt-1 md:mt-0"
                    >
                      <Check className="w-3 h-3 mr-1" strokeWidth={4} />
                      Verified
                    </Badge>
                  ) : (
                    <button type="button">
                      <Badge
                        variant="outline"
                        className="inline-flex items-center text-gray-800 border-gray-400 mt-1 md:mt-0 cursor-pointer"
                      >
                        <UserCheck className="w-3 h-3 mr-1" strokeWidth={2.5} />
                        Get Verified
                      </Badge>
                    </button>
                  )}
                </div>

                <CardDescription className="text-lg text-gray-700 mb-8">
                  <div className="flex items-center gap-4">
                    {user.username}
                    {/* Social Media Icons */}
                    <div className="flex flex-wrap gap-4">
                      {Object.keys(socialMediaIcons).map((platformKey) => {
                        const social = socialMediaIcons[platformKey];
                        const Icon = social.icon;
                        const isActive = activeSocialMedia.includes(platformKey);

                        return (
                          <div key={platformKey} className="flex items-center">
                            {isActive ? (
                              <Icon className={`w-5 h-5 ${social.colorClass}`} />
                            ) : (
                              <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Icon className={`w-5 h-5 text-gray-400 transition-colors duration-200 ${social.hoverColorClass}`} />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-[200px] mt-3">
                                  <div className="p-2">
                                    <p className="text-sm mb-2">
                                      Connect your {social.platform} account to seamlessly share your posts and enjoy advanced insights.
                                    </p>
                                    <button
                                      className={`py-1 px-2 text-sm rounded border border-current ${social.colorClass} w-full`}
                                      onClick={() => handleOAuth(social.platform)}
                                    >
                                      Connect {social.platform}
                                    </button>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardDescription>

                <div className="flex gap-6 text-sm text-black">
                  <div>
                    <span className="font-bold">{stats.followers}</span>
                    <span className="ml-1 text-gray-700">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold">{stats.following}</span>
                    <span className="ml-1 text-gray-700">Following</span>
                  </div>
                  <div>
                    <span className="font-bold">{stats.engagement}</span>
                    <span className="ml-1 text-gray-700">Engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit and Upload Buttons */}
          <div className="absolute top-4 right-6 flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="p-2 bg-white rounded-full hover:bg-gray-200"
                  aria-label="Edit Profile"
                >
                  <Edit className="w-5 h-5 text-gray-800" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="p-6 space-y-4">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-semibold">
                    Confirm Profile Edit
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-700">
                    You are about to modify your profile details. Please review your changes carefully before continuing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end space-x-2">
                  <AlertDialogCancel className="px-3 py-1 text-sm rounded-2xl">
                    Cancel Process
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setTimeout(() => {
                        setIsSheetOpen(true);
                      }, 200);
                    }}
                    className="px-3 py-1 text-sm rounded-2xl"
                  >
                    Continue Editing
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="p-2 bg-white rounded-full hover:bg-gray-200"
                  aria-label="Upload"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="p-6 space-y-4 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-black">
                    Upload Options
                  </DialogTitle>
                  <DialogDescription className="text-gray-700">
                    Select the type of content you want to upload.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <DialogClose asChild>
                    <button
                      onClick={() => handleUploadOption("content")}
                      className="flex flex-col items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-800 hover:text-black text-sm hover:bg-gray-100 rounded-2xl h-24 transition-colors duration-200 shadow-sm"
                    >
                      <FilePlus className="w-5 h-5" />
                      Upload Content
                    </button>
                  </DialogClose>
                  <DialogClose asChild>
                    <button
                      onClick={() => handleUploadOption("package")}
                      className="flex flex-col items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-800 hover:text-black text-sm hover:bg-gray-100 rounded-2xl h-24 transition-colors duration-200 shadow-sm"
                    >
                      <Package className="w-5 h-5" />
                      Upload Package
                    </button>
                  </DialogClose>
                  <DialogClose asChild>
                    <button
                      onClick={() => handleUploadOption("collaboration")}
                      className="flex flex-col items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-800 hover:text-black text-sm hover:bg-gray-100 rounded-2xl h-24 transition-colors duration-200 shadow-sm"
                    >
                      <Users className="w-5 h-5" />
                      Upload Collab's
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-8 flex-1 flex flex-col">
          <Tabs defaultValue="content" className="flex flex-col flex-1">
            <TabsList className="grid grid-cols-5 w-full mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1">
              <div className="grid grid-cols-3 gap-1">
                {Array(15)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="bg-gray-200 flex items-center justify-center text-gray-600 h-52 rounded-2xl">
                      Post {index + 1}
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="collaborations" className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {user.collaboratedWith && user.collaboratedWith.length > 0 ? (
                  user.collaboratedWith.map((brand, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-sm font-semibold">{brand}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-700">No collaborations listed.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="about" className="flex-1 overflow-y-auto">
              <p className="text-sm text-gray-700 mb-4">{fallbacks.bio}</p>
              {user.category && user.category.length > 0 && (
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Categories:</strong> {user.category.join(", ")}
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Sheet for editing profile using shadcn components */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="rounded-2xl">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">Edit Profile</SheetTitle>
            <SheetDescription className="text-gray-700">
              Modify your profile details below.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-6">
            {/* Clickable Avatar Section */}
            <div className="flex flex-col items-center">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarPreview} alt="Avatar" className="object-cover" />
                  <AvatarFallback>{fallbacks.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {/* Hover overlay with edit icon */}
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Edit className="w-6 h-6 text-white" />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarChange}
              />
            </div>
            {/* Profile Details Form */}
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 rounded-2xl"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 rounded-2xl"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 rounded-2xl"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 rounded-2xl"
                />
              </div>
            </form>
          </div>

          {/* Bottom Right Action Buttons */}
          <div className="flex justify-end mt-4 space-x-2">
            <SheetClose asChild>
              <Button variant="outline" className="rounded-2xl">
                Cancel
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button onClick={handleEditProfile} className="rounded-2xl">
                Save Changes
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
