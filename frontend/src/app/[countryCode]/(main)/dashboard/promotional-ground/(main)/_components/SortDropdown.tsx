// src/components/layout/header/SortDropdown.tsx
'use client';

import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import { User, Users, MessageSquare, Star } from 'lucide-react';

export function SortDropdown() {
    return (
        <div className="w-[15%] pl-4">
            <Select>
                <SelectTrigger className="w-full rounded-xl border-gray-300 bg-gray-100 h-10 text-sm">
                    <SelectValue placeholder="Sorting Station" />
                </SelectTrigger>
                <SelectContent className='rounded-lg border-gray-200 bg-white mt-1'>
                    <SelectGroup>
                        <SelectItem value="name" className="rounded-lg text-sm">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>Name</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="followers" className="rounded-lg text-sm">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>Followers</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="engagement" className="rounded-lg text-sm">
                            <div className="flex items-center space-x-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <span>Engagement</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="rating" className="rounded-lg text-sm">
                            <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-muted-foreground" />
                                <span>Rating</span>
                            </div>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}