import { FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaPinterest, FaLinkedin,
         FaGlobe, FaTiktok, FaReddit } from "react-icons/fa";
import { SocialMediaLink } from "../interface";

export const socialMediaIcons: Record<string, SocialMediaLink> = {
  twitter:   { platform: "Twitter",   icon: FaTwitter,   colorClass: "text-blue-500" },
  instagram: { platform: "Instagram", icon: FaInstagram, colorClass: "text-pink-500" },
  youtube:   { platform: "YouTube",   icon: FaYoutube,   colorClass: "text-red-600" },
  facebook:  { platform: "Facebook",  icon: FaFacebook,  colorClass: "text-blue-600" },
  pinterest: { platform: "Pinterest", icon: FaPinterest, colorClass: "text-red-600" },
  linkedin:  { platform: "LinkedIn",  icon: FaLinkedin,  colorClass: "text-blue-800" },
  website:   { platform: "Website",   icon: FaGlobe,     colorClass: "text-gray-500" },
  tiktok:    { platform: "TikTok",    icon: FaTiktok,    colorClass: "text-black" },
  reddit:    { platform: "Reddit",    icon: FaReddit,    colorClass: "text-orange-500" },
};