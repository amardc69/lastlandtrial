'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { HomeHeader } from './_components/HomeHeader';
import { HomeContentSection } from './_components/HomeContentSection';

const PGHomePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [tsmUser, setTsmUser] = useState<any>(null);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Handler for toggle group changes in single mode
  const handleToggleChange = (value: string) => {
    setSelectedType(value);
  };

  // Fetch influencers data
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/pgusers'
        );
        if (!response.ok) throw new Error('Failed to fetch influencers');
        const data = await response.json();
        setInfluencers(data);
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  useEffect(() => {
    const fetchTSMUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/pgusers/username/@amardc69');
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setTsmUser(data);
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred');
      }
    };
    fetchTSMUser();
  }, []);

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

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <Card className="rounded-2xl border border-gray-300 h-full shadow-md">
      <HomeHeader
        tsmUser={tsmUser}
        selectedType={selectedType}
        onToggleChange={handleToggleChange}
      />
      <HomeContentSection influencers={influencers} />
    </Card>
  );
};

export default PGHomePage;
