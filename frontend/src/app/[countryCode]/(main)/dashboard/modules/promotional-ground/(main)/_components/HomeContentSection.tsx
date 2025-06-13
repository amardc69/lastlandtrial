'use client';

import React from 'react';
import { CardContent } from '@/components/ui/card';
import AccountShowcase from './AccountShowcase';

type Influencer = {
  id: string;
  username?: string;
  avatarUrl?: string;
  name?: string;
  onSocialMedia?: string[];
  category?: string[];
};

type HomeContentSectionProps = {
  influencers: Influencer[];
};

export function HomeContentSection({ influencers }: HomeContentSectionProps) {
  return (
    <CardContent>
      <div className="grid grid-cols-3 gap-4">
        {influencers.map((influencer) => (
          <AccountShowcase key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </CardContent>
  );
}
