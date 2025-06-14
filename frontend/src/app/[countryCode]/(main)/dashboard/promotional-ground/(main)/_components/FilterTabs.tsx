// src/components/layout/header/FilterTabs.tsx
'use client';

import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface FilterTabsProps {
    selectedType: string;
    onToggleChange: (value: string) => void;
}

const influencerTypes = [
    'All', 'Lifestyle', 'Travelling', 'Food', 'Vlogger', 'Podcaster', 'Fashion', 'Beauty',
    'Fitness', 'Tech', 'Music', 'Sports', 'Gaming', 'Comedy', 'Education', 'Business',
    'Motivation', 'Art', 'Science', 'Politics', 'News', 'Health', 'Spirituality',
    'Pets', 'Parenting', 'Relationships', 'DIY', 'Books', 'Movies', 'TV Shows',
    'Anime', 'Dance', 'Theatre', 'Photography', 'Design', 'Writing', 'Journalism'
];

export function FilterTabs({ selectedType, onToggleChange }: FilterTabsProps) {
    return (
        <div className="w-[85%] relative">
            <ToggleGroup type="single" value={selectedType} onValueChange={onToggleChange}>
                <div className="scrollable-container flex gap-2 overflow-x-auto">
                    {influencerTypes.map((type) => (
                        <ToggleGroupItem
                            key={type}
                            value={type.toLowerCase()}
                            className="h-10 shrink-0 cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-black hover:text-black hover:border-gray-300 data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=on]:border-gray-900"
                        >
                            {type}
                        </ToggleGroupItem>
                    ))}
                </div>
            </ToggleGroup>
            {/* Fade effect for scrollable area */}
            <div className="absolute right-0 top-0 bottom-0 h-full w-10 pointer-events-none bg-gradient-to-l from-card to-transparent" />
        </div>
    );
}