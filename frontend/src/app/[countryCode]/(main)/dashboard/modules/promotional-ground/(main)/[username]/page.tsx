import { notFound } from 'next/navigation';
import { ServicesShowcase } from './_components/ServicesShowcase/main';
import { ProfileSection } from './_components/ProfileSection/main';
import React from 'react';

interface PGUser {
  username: string;
  isVerified: boolean;
  name?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  platforms?: string[] | null;
  collaboratedWith?: string[] | null;
  category?: string[] | null;
  followers?: string | null;
  following?: string | null;
}

export default async function InfluencerProfilePage({ params }: { params: { username: string } }) {
  const usernameFromParams = decodeURIComponent(params.username);
  const apiUsername = usernameFromParams;
  let tsmUser: PGUser | null = null;
  try {
    const response = await fetch(`http://localhost:3001/pgusers/username/${apiUsername}`);
    if (!response.ok) {
      if (response.status === 404) {
        notFound();
        return null;
      }
      throw new Error(`Failed to fetch user. Status: ${response.status}`);
    }
    tsmUser = await response.json() as PGUser;
    if (!tsmUser) {
      notFound();
      return null;
    }
  } catch (error: any) {
    console.error('Error fetching TSM user:', error.message);
    notFound();
    return null;
  }
  const fallbacks = {
    name: tsmUser.name || 'User Name',
    avatar: tsmUser.avatarUrl || '/default-avatar.png',
    bio: tsmUser.bio || 'No bio available.',
  };
  const userForRightSide = {
    platforms: tsmUser.platforms || [],
  };


  return (
    <div className="flex flex-col md:flex-row gap-4 h-full max-h-[100vh] overflow-y-auto">
      <ProfileSection user={tsmUser} fallbacks={fallbacks} />
      <ServicesShowcase user={userForRightSide} />
    </div>
  );
}
