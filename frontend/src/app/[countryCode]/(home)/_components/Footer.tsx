"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FaLinkedin, FaInstagram, FaTiktok, FaYoutube, FaPinterest, FaGithub } from "react-icons/fa"; // Added FaPinterest, FaGithub, Removed FaFacebook
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-100 py-16 rounded-t-4xl"> {/* Changed bg color to black for better contrast */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center md:justify-items-start"> {/* Adjusted grid for better alignment on larger screens */}
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="font-angelos text-2xl mb-6 text-white">Last Land</h3> {/* Ensured heading is white */}
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base"> {/* Adjusted text color for better readability */}
              Delivering innovative solutions that drive your business forward.
              Join us in shaping the future with technology and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3> {/* Ensured heading is white */}
            <ul className="space-y-4 text-sm sm:text-base">
              <li>
                <Link href="/explore/about-us" className="text-gray-300 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/explore/our-services" className="text-gray-300 hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/explore/blogs" className="text-gray-300 hover:text-white transition duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/explore/careers" className="text-gray-300 hover:text-white transition duration-300">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6 text-white">Resources</h3> {/* Ensured heading is white */}
            <ul className="space-y-4 text-sm sm:text-base">
              <li>
                <Link href="/explore/contact-us" className="text-gray-300 hover:text-white transition duration-300">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link href="/explore/public-privacy-policy" className="text-gray-300 hover:text-white transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/explore/terms-of-services" className="text-gray-300 hover:text-white transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/explore/credits" className="text-gray-300 hover:text-white transition duration-300">
                  Credits
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center md:text-left w-full"> {/* Ensure this column takes full width if needed or adjust md:grid-cols */}
            <h3 className="text-xl font-semibold mb-6 text-white">Stay Updated</h3> {/* Ensured heading is white */}
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Subscribe to our newsletter to get the latest updates and news.
            </p>
            <form className="flex flex-col sm:flex-row items-center sm:items-start w-full max-w-xs sm:max-w-none mx-auto md:mx-0">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-auto text-white bg-zinc-900 border border-zinc-700 placeholder-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:outline-none"
                  required
                />
                <Button
                  variant="default"
                  className="mt-4 sm:mt-0 sm:ml-4 h-9 px-6 text-sm sm:text-base cursor-pointer
                             border-2 border-transparent transition-all duration-300 ease-in-out
                             hover:border-gray-700"
                >
                  <Send className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </form>
          </div>
        </div>

        {/* Divider with Decorative SVG */}
        <div className="my-12">
          <svg
            className="mx-auto"
            width="240"
            height="2"
            viewBox="0 0 240 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="240" height="2" fill="url(#paint0_linear_footer)" /> {/* Ensure unique ID if multiple SVGs */}
            <defs>
              <linearGradient
                id="paint0_linear_footer" // Unique ID
                x1="0"
                y1="1"
                x2="240"
                y2="1"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" stopOpacity="0.2" /> {/* Adjusted opacity for dark bg */}
                <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.8"/> {/* Adjusted opacity */}
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" /> {/* Adjusted opacity */}
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <Link
            href="https://twitter.com/lastlanders" // Replace with your actual Twitter URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="Twitter"
          >
            <FaXTwitter className="h-6 w-6" />
          </Link>
          <Link
            href="https://linkedin.com/company/lastlanders" // Replace with your actual LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6" />
          </Link>
          <Link
            href="https://instagram.com/lastlanders" // Replace with your actual Instagram URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </Link>
          {/* Added Pinterest Icon */}
          <Link
            href="https://pinterest.com/lastlanders" // Replace with your actual Pinterest URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="Pinterest"
          >
            <FaPinterest className="h-6 w-6" />
          </Link>
          {/* Added GitHub Icon */}
          <Link
            href="https://github.com/lastlanders" // Replace with your actual GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6" />
          </Link>
          {/* Added TikTok Icon */}
          <Link
            href="https://tiktok.com/@lastlanders" // Replace with your actual TikTok URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="TikTok"
          >
            <FaTiktok className="h-6 w-6" />
          </Link>
          {/* Added YouTube Icon */}
          <Link
            href="https://youtube.com/@lastlanders" // Replace with your actual YouTube URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="YouTube"
          >
            <FaYoutube className="h-6 w-6" />
          </Link>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-xs sm:text-sm text-gray-400"> {/* Adjusted text color */}
          © {new Date().getFullYear()} Last Land Information Technologies LLP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}