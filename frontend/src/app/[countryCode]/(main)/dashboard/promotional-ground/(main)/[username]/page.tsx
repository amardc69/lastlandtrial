'use client';


import React from 'react';
import { Loading } from '@/components/ui/loading';
import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getUserByUsername } from './_lib/getUserByUsername';
import { ServicesShowcase } from './_components/ServicesShowcase/main';
import { ProfileSection } from './_components/ProfileSection/main';


export default function InfluencerProfilePage() {
  const { username } = useParams() as { username: string };
  const decodedUsername = decodeURIComponent(username);

  const { data: PGUser, isLoading, isError, error } = useQuery({
    queryKey: ['pguser', decodedUsername],
    queryFn: () => getUserByUsername(decodedUsername),
    retry: false,
  });

  if (isLoading) return <Loading />;

  if (isError || !PGUser) {
    console.error('Failed to fetch user:', error);
    notFound();
  }

  const fallbacks = {
    name: PGUser.name || 'User Name',
    avatar: PGUser.avatarUrl || '/default-avatar.png',
    bio: PGUser.bio || 'No bio available.',
  };
  
  const services = {
    username: PGUser.username,
    platforms: PGUser.platforms || [],
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full max-h-[100vh] overflow-y-auto">
      <ProfileSection user={PGUser} fallbacks={fallbacks} />
      <ServicesShowcase user={services} />
    </div>
  );
}
