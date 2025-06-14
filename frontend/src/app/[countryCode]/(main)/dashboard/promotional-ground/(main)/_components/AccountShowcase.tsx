'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaPinterest, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from '@/components/ui/context-menu';
import { Users, MessageSquare, TrendingUp, Info, Check } from 'lucide-react';
import InfluencerInfoDialog from './InfluencerInfoDialog'; // Assuming this component exists

export type Influencer = {
  id: string;
  username?: string;
  avatarUrl?: string;
  name?: string;
  platforms?: string[];
  category?: string[];
  isVerified?: boolean;
  bio?: string;
  followers?: Record<string, number | string>;
  engagementRate?: string;
  location?: string;
  email?: string;
  website?: string;
};

type AccountShowcaseProps = {
  influencer: Influencer;
};

// Define a diverse color palette with darker borders for the categories
const categoryColors: { [key: string]: { textColor: string; borderColor: string; bgColor: string } } = {
    'Lifestyle': { textColor: '#d946ef', borderColor: '#e879f9', bgColor: '#faf5ff' },
    'Travelling': { textColor: '#3b82f6', borderColor: '#93c5fd', bgColor: '#eff6ff' },
    'Food': { textColor: '#f97316', borderColor: '#fdba74', bgColor: '#fff7ed' },
    'Vlogger': { textColor: '#ef4444', borderColor: '#fca5a5', bgColor: '#fef2f2' },
    'Podcaster': { textColor: '#8b5cf6', borderColor: '#c4b5fd', bgColor: '#f5f3ff' },
    'Fashion': { textColor: '#ec4899', borderColor: '#f9a8d4', bgColor: '#fdf2f8' },
    'Beauty': { textColor: '#f43f5e', borderColor: '#fda4af', bgColor: '#fff1f2' },
    'Fitness': { textColor: '#14b8a6', borderColor: '#5eead4', bgColor: '#f0fdfa' },
    'Tech': { textColor: '#6366f1', borderColor: '#a5b4fc', bgColor: '#eef2ff' },
    'Music': { textColor: '#a855f7', borderColor: '#d8b4fe', bgColor: '#faf5ff' },
    'Sports': { textColor: '#f59e0b', borderColor: '#fcd34d', bgColor: '#fffbeb' },
    'Gaming': { textColor: '#84cc16', borderColor: '#bef264', bgColor: '#f7fee7' },
    'Comedy': { textColor: '#eab308', borderColor: '#fde047', bgColor: '#fefce8' },
    'Education': { textColor: '#22c55e', borderColor: '#86efac', bgColor: '#f0fdf4' },
    'Business': { textColor: '#06b6d4', borderColor: '#67e8f9', bgColor: '#ecfeff' },
    'Motivation': { textColor: '#0ea5e9', borderColor: '#7dd3fc', bgColor: '#f0f9ff' },
    'Art': { textColor: '#d946ef', borderColor: '#e879f9', bgColor: '#faf5ff' },
    'Science': { textColor: '#65a30d', borderColor: '#a3e635', bgColor: '#f4f9ef' },
    'Politics': { textColor: '#4b5563', borderColor: '#9ca3af', bgColor: '#f3f4f6' },
    'News': { textColor: '#4f46e5', borderColor: '#a5b4fc', bgColor: '#eef2ff' },
    'Health': { textColor: '#10b981', borderColor: '#6ee7b7', bgColor: '#ecfdf5' },
    'Spirituality': { textColor: '#7e22ce', borderColor: '#c084fc', bgColor: '#f5f3ff' },
    'Pets': { textColor: '#a16207', borderColor: '#facc15', bgColor: '#fefce8' },
    'Parenting': { textColor: '#be185d', borderColor: '#f9a8d4', bgColor: '#fdf2f8' },
    'Relationships': { textColor: '#c026d3', borderColor: '#e879f9', bgColor: '#faf5ff' },
    'DIY': { textColor: '#ca8a04', borderColor: '#facc15', bgColor: '#fefce8' },
    'Books': { textColor: '#9333ea', borderColor: '#c084fc', bgColor: '#f5f3ff' },
    'Movies': { textColor: '#b91c1c', borderColor: '#fca5a5', bgColor: '#fef2f2' },
    'TV Shows': { textColor: '#1d4ed8', borderColor: '#93c5fd', bgColor: '#eff6ff' },
    'Anime': { textColor: '#db2777', borderColor: '#f472b6', bgColor: '#fdf2f8' },
    'Dance': { textColor: '#e11d48', borderColor: '#fb7185', bgColor: '#fff1f2' },
    'Theatre': { textColor: '#c2410c', borderColor: '#fb923c', bgColor: '#fff7ed' },
    'Photography': { textColor: '#4d7c0f', borderColor: '#a3e635', bgColor: '#f7fee7' },
    'Design': { textColor: '#5b21b6', borderColor: '#a78bfa', bgColor: '#f5f3ff' },
    'Writing': { textColor: '#1e3a8a', borderColor: '#93c5fd', bgColor: '#eff6ff' },
    'Journalism': { textColor: '#374151', borderColor: '#9ca3af', bgColor: '#f3f4f6' },
    'All': { textColor: '#6b7280', borderColor: '#9ca3af', bgColor: '#f9fafb' },
    'default': { textColor: '#6b7280', borderColor: '#9ca3af', bgColor: '#f9fafb' }
};

export default function AccountShowcase({ influencer }: AccountShowcaseProps) {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    'https://www.svgrepo.com/show/303173/nike-3-logo.svg',
    'https://www.svgrepo.com/show/473500/zomato.svg',
    '/netflix-logo.png',
    '/swiggy-logo.svg'
  ];

  const renderSocialMediaIcons = (connectedsm: string[] = []) => {
    if (connectedsm.length === 0) {
      return <span className="text-sm text-gray-500">None</span>;
    }
    return connectedsm.map((sm) => {
      switch (sm.toLowerCase()) {
        case 'twitter':
          return <FaTwitter key={sm} className="text-blue-500 text-sm" />;
        case 'instagram':
          return <FaInstagram key={sm} className="text-pink-500 text-sm" />;
        case 'youtube':
          return <FaYoutube key={sm} className="text-red-600 text-sm" />;
        case 'pinterest':
          return <FaPinterest key={sm} className="text-red-600 text-sm" />;
        case 'facebook':
          return <FaFacebook key={sm} className="text-blue-600 text-sm" />;
        case 'linkedin':
          return <FaLinkedin key={sm} className="text-blue-800 text-sm" />;
        case 'tiktok':
          return <FaTiktok key={sm} className="text-black text-sm" />;
        default:
          return (
            <span key={sm} className="border rounded px-2 py-1 text-xs text-gray-500">
              {sm}
            </span>
          );
      }
    });
  };

  const displayUsername = influencer.username ?? 'username';
  const truncatedUsername =
    displayUsername.length > 14
      ? `${displayUsername.substring(0, 14)}...`
      : displayUsername;

  const handleViewInfoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking context menu item
    setIsInfoDialogOpen(true);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link
            href={`/in/dashboard/modules/promotional-ground/${influencer.username ?? 'username'}`}
            className="block focus:outline-none"
          >
            <Card className="bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden flex flex-col">
              <CardContent className="p-4 flex items-center">
                <Avatar className="w-16 h-16 shadow-xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
                  <AvatarImage
                    src={influencer.avatarUrl ?? '/images/profile.jpg'}
                    alt={influencer.name ?? 'Influencer Avatar'}
                  />
                  <AvatarFallback>
                    {influencer.name
                      ? influencer.name
                          .split(' ')
                          .map((n) => n[0]?.toUpperCase() || '')
                          .join('')
                      : 'NA'}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 overflow-hidden">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <span className="line-clamp-1">{influencer.name ?? 'No Name'}</span>
                    {influencer.isVerified && (
                      <Badge
                        variant="outline"
                        className="border-gray-500 bg-gray-50 text-gray-700 text-[10px] font-medium py-px flex items-center gap-1 flex-shrink-0"
                        aria-label="Status: Verified"
                      >
                        <Check className="w-3 h-3 stroke-[3px]" />
                        Verified
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 overflow-hidden text-ellipsis flex items-center gap-2">
                    <span>{truncatedUsername}</span>
                    {renderSocialMediaIcons(influencer.platforms)}
                  </CardDescription>
                </div>
              </CardContent>

              <Separator className="mx-auto w-[90%] bg-gray-200 shadow mb-4 rounded-full" />

              <CardContent className="px-4 pt-0 pb-4">
                <div className="mb-4">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {logos.map((imgUrl, index) => (
                      <div
                        key={imgUrl}
                        className="w-14 h-14 flex items-center justify-center border border-gray-100 rounded-2xl shadow-sm"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Collaboration ${index + 1}`}
                          width={56}
                          height={56}
                          className="object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {influencer.category && influencer.category.length > 0 ? (
                    influencer.category.map((cat) => {
                      const capitalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
                      const colors = categoryColors[capitalizedCat] || categoryColors.default;

                      return (
                        <Badge
                          variant="outline"
                          key={cat}
                          style={{
                            color: colors.textColor,
                            borderColor: colors.borderColor,
                            backgroundColor: colors.bgColor,
                          }}
                          className="font-medium"
                        >
                          {capitalizedCat}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className="text-sm text-gray-400">No categories</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Compare User
          </ContextMenuItem>
          <ContextMenuItem className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message this User
          </ContextMenuItem>
          <ContextMenuItem className="flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Identify Relevancy
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            className="flex items-center"
            onSelect={(e) => {
              e.preventDefault();
              setIsInfoDialogOpen(true);
            }}
          >
            <Info className="mr-2 h-4 w-4" />
            View Info
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <InfluencerInfoDialog
        influencer={influencer}
        isOpen={isInfoDialogOpen}
        onClose={() => setIsInfoDialogOpen(false)}
      />
    </>
  );
}