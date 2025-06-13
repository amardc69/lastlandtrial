'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaPinterest, FaLinkedin, FaGlobe, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { X } from 'lucide-react';
import { Influencer } from './AccountShowcase'; // Assuming this path is correct

type InfluencerInfoDialogProps = {
  influencer: Influencer;
  isOpen: boolean;
  onClose: () => void;
};

// Define a type for the social link data
type SocialLinkDataItem = {
  key: string;
  url: string;
  icon: React.ReactNode; // Using React.ReactNode for the icon itself
  label: string;
};

const renderSocialMediaLinks = (influencer: Influencer) => {
  // platformLinks will now store objects of type SocialLinkDataItem
  const platformLinksData: SocialLinkDataItem[] = [];
  const platforms = influencer.platforms ?? [];
  const username = influencer.username ?? 'user'; // Fallback username

  platforms.forEach((sm) => {
    let icon: React.ReactNode | null = null;
    let url = '#';
    const platformName = sm.toLowerCase();

    switch (platformName) {
      case 'twitter':
        icon = <FaTwitter className="text-blue-500" />;
        url = `https://twitter.com/${username}`;
        break;
      case 'instagram':
        icon = <FaInstagram className="text-pink-500" />;
        url = `https://instagram.com/${username}`;
        break;
      case 'youtube':
        icon = <FaYoutube className="text-red-600" />;
        url = `https://youtube.com/${username}`; // Example, adjust if you have specific channel IDs
        break;
      case 'pinterest':
        icon = <FaPinterest className="text-red-600" />;
        url = `https://pinterest.com/${username}`;
        break;
      case 'facebook':
        icon = <FaFacebook className="text-blue-600" />;
        url = `https://facebook.com/${username}`;
        break;
      case 'linkedin':
        icon = <FaLinkedin className="text-blue-800" />;
        url = `https://linkedin.com/in/${username}`; // Placeholder
        break;
      default:
        // For unknown platforms, you might want a generic icon or to skip
        // icon = <FaGlobe />;
        // url = `#${platformName}`; // Or some other handling
        break;
    }

    if (icon) {
      platformLinksData.push({
        key: sm,
        url: url,
        icon: icon,
        label: `${sm} profile for ${influencer.name || username}`,
      });
    }
  });

  if (platformLinksData.length === 0) {
    return <p className="text-sm text-gray-500">No social platforms linked.</p>;
  }

  // Now, map over platformLinksData to create the JSX elements
  return (
    <div className="flex items-center gap-4 mt-2">
      {platformLinksData.map((linkData) => (
        <a
          key={linkData.key}
          href={linkData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:opacity-75 transition-opacity"
          aria-label={linkData.label}
        >
          {linkData.icon}
        </a>
      ))}
    </div>
  );
};


const DetailItem: React.FC<{ label: string; value?: string | number | null, children?: React.ReactNode }> = ({ label, value, children }) => {
  if (!value && !children) return null;
  return (
    <div className="mb-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h3>
      {value && <p className="text-gray-800 text-sm">{value}</p>}
      {children && <div className="text-gray-800 text-sm">{children}</div>}
    </div>
  );
};


export default function InfluencerInfoDialog({
  influencer,
  isOpen,
  onClose,
}: InfluencerInfoDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white p-4 overflow-y-auto flex flex-col">
        <div className="flex-grow overflow-y-auto p-0 md:p-4">
          <DialogHeader className="mb-6 text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
              <Avatar className="w-32 h-32 shadow-2xl border border-gray-400 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
                <AvatarImage
                  src={influencer.avatarUrl ?? '/images/profile.jpg'}
                  alt={influencer.name ?? 'Influencer'}
                />
                <AvatarFallback className="text-3xl">
                  {influencer.name
                    ? influencer.name
                        .split(' ')
                        .map((n) => n[0]?.toUpperCase() || '')
                        .join('')
                    : 'NA'}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                  <span className="mr-2">{influencer.name ?? 'N/A'}</span>
                  {influencer.isVerified && (
                    <Badge className="border-green-500 bg-green-100 text-green-700 text-sm px-2 whitespace-nowrap">
                      Verified
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base text-gray-600 mt-1">
                  {influencer.username ?? 'username_unavailable'}
                </DialogDescription>
                {/* Render social media links */}
                {renderSocialMediaLinks(influencer)}
              </div>
            </div>
          </DialogHeader>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <DetailItem label="Full Name" value={influencer.name} />
            <DetailItem label="Username" value={influencer.username} />
            {influencer.email && (
                <DetailItem label="Email">
                    <a href={`mailto:${influencer.email}`} className="text-blue-600 hover:underline flex items-center gap-1 break-all">
                        <FaEnvelope /> {influencer.email}
                    </a>
                </DetailItem>
            )}
            {influencer.website && (
                <DetailItem label="Website">
                    <a href={influencer.website.startsWith('http') ? influencer.website : `https://${influencer.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 break-all">
                       <FaGlobe /> {influencer.website}
                    </a>
                </DetailItem>
            )}
            <DetailItem label="Location" value={influencer.location} />
            <DetailItem label="Engagement Rate" value={influencer.engagementRate} />

            {influencer.bio && (
              <div className="md:col-span-2">
                <DetailItem label="Biography">
                    <p className="text-gray-800 text-sm whitespace-pre-line">{influencer.bio}</p>
                </DetailItem>
              </div>
            )}

            <div className="md:col-span-2">
                <DetailItem label="Categories">
                    {influencer.category && influencer.category.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                        {influencer.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-sm">
                            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                            </Badge>
                        ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 text-sm">No categories specified.</p>
                    )}
                </DetailItem>
            </div>

            {influencer.followers && Object.keys(influencer.followers).length > 0 && (
                <div className="md:col-span-2">
                    <DetailItem label="Follower Counts">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                            {Object.entries(influencer.followers).map(([platform, count]) => (
                                <div key={platform} className="bg-gray-50 p-2 rounded-md border">
                                    <p className="text-xs text-gray-500 capitalize">{platform}</p>
                                    <p className="text-sm font-semibold text-gray-800">{String(count)}</p>
                                </div>
                            ))}
                        </div>
                    </DetailItem>
                </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}