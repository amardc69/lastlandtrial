"use client";

import { useEffect, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { LeftSide } from './components/profile-section';
import RightSide from './components/services-showcase';

interface PublicInfluencer {
  id: number;
  userId: number;
  name?: string;
  username: string;
  avatarurl?: string;
  deckpic?: string;
  bio?: string;
  followers?: string;
  following?: string;
  category?: string[];
  collabratedWith?: string[];
  connectedsm?: string[];
  verifiedStatus: boolean;
}

interface InfluencerProfilePageProps {
  params: {
    username: string;
  };
}

export default function InfluencerProfilePage({ params }: InfluencerProfilePageProps) {
  const [user, setUser] = useState<PublicInfluencer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/dashboard/the-social-media/tsm-user');
        if (!res.ok) {
          if (res.status === 401) {
            // Redirect if unauthorized
            router.push('/auth/login');
            return;
          }
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
    <div className="flex items-center justify-center h-full">
      <svg
        className="animate-spin h-10 w-10 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>
    );
  }
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return notFound();

  // Prepare fallback values for user properties.
  const fallbacks = {
    name: user.name || 'User Name',
    avatar: user.avatarurl || '/default-avatar.png',
    bio: user.bio || 'No bio available',
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full max-h-[100vh] overflow-y-auto">
      <LeftSide
        user={{
          ...user,
          // Map or rename properties as needed by LeftSide.
          username: user.username,
          isVerified: user.verifiedStatus,
          followers: user.followers || undefined,
          following: user.following || undefined,
          bio: user.bio || undefined,
          avatarurl: user.avatarurl || undefined,
          name: user.name || undefined,
        }}
        fallbacks={fallbacks}
      />

      {/* The container is marked as relative to position the edit button absolutely */}
      <div className="md:w-2/5 w-full min-h-full border border-gray-300 rounded-2xl relative">
        <RightSide />
      </div>
    </div>
  );
}
