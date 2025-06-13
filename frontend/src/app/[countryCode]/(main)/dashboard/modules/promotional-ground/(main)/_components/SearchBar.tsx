'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, X, Mic, Star } from 'lucide-react';

// Define structures (can be moved to a types file)
interface IndianInfluencer {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
}

// Sample data (can be fetched or stored elsewhere)
const sampleIndianInfluencersData: IndianInfluencer[] = [
    { id: '1', name: 'Bhuvan Bam', username: 'bhuvan.bam22', avatarUrl: 'https://yt3.googleusercontent.com/H2c8y3sN7j3Hslc_eCun0FSJCQcrYl4zPyhsCt1510INBq1h2vFQTMUOtI4HJNkFD07s0pFlCA=s160-c-k-c0x00ffffff-no-rj' },
    { id: '2', name: 'Ashish Chanchlani', username: 'ashishchanchlani', avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kP47aiu-pgZDYOEGCSKXOHPZJUPQb3D0dbYRLhKj_YxrY=s160-c-k-c0x00ffffff-no-rj' },
    { id: '3', name: 'CarryMinati', username: 'carryminati', avatarUrl: 'https://yt3.googleusercontent.com/cxE8FStJktJ2oiuv1f-7OHMfJI7ZlMby4NgPDkfJTyV3sOsvdo5pmsAb8TAcJVNor6gNT2h_0w=s160-c-k-c0x00ffffff-no-rj' },
    { id: '4', name: 'Prajakta Koli', username: 'mostlysane', avatarUrl: 'https://yt3.googleusercontent.com/u10U6bHQbeDq0-yrR3dZAr7kLu51wYXsbhuxJqNgOUYF4vUhaWOmlJH3C5Va0li3tMJ-vfA6=s160-c-k-c0x00ffffff-no-rj' },
    { id: '5', name: 'Gaurav Chaudhary', username: 'technicalguruji', avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_nQFOjj2baePBWQGqL0lgv7SwxZ1uXYo8pg_hViDZb6DEsX=s160-c-k-c0x00ffffff-no-rj' },
];

const allPossibleSuggestions: (string | IndianInfluencer)[] = [
    "Lifestyle", "Travelling", "Food", "Vlogger", "Podcaster",
    "React projects", "Next.js authentication", "Tailwind CSS animations",
    ...sampleIndianInfluencersData,
];


export function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<(string | IndianInfluencer)[]>([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const [favouriteInfluencerIds, setFavouriteInfluencerIds] = useState<Set<string>>(new Set());

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const queryFromUrl = searchParams.get('search_query');
        setSearchQuery(queryFromUrl ?? '');
    }, [searchParams]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSuggestionsVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const newSuggestions = allPossibleSuggestions
                .filter((suggestion) => {
                    if (typeof suggestion === 'string') {
                        return suggestion.toLowerCase().includes(query.toLowerCase());
                    }
                    return (
                        suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
                        suggestion.username.toLowerCase().includes(query.toLowerCase())
                    );
                })
                .slice(0, 100);
            setFilteredSuggestions(newSuggestions);
            setIsSuggestionsVisible(newSuggestions.length > 0);
        } else {
            setFilteredSuggestions([]);
            setIsSuggestionsVisible(false);
        }
    };

    const handleSuggestionClick = (suggestion: string | IndianInfluencer) => {
        const queryValue = typeof suggestion === 'string' ? suggestion : suggestion.name;
        setSearchQuery(queryValue);
        setIsSuggestionsVisible(false);
        updateUrlWithSearchQuery(queryValue);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredSuggestions([]);
        setIsSuggestionsVisible(false);
        searchInputRef.current?.focus();
        updateUrlWithSearchQuery(null);
    };

    const updateUrlWithSearchQuery = (query: string | null) => {
        const currentParams = new URLSearchParams(window.location.search);
        if (query) {
            currentParams.set('search_query', query);
        } else {
            currentParams.delete('search_query');
        }
        const newUrl = `${pathname}?${currentParams.toString()}`;
        router.push(newUrl);
    };

    const handleVoiceSearch = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice search is not supported in your browser.');
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            // Manually trigger suggestion update and URL change
            handleSearchInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>);
            updateUrlWithSearchQuery(transcript);
            setIsSuggestionsVisible(false);
        };

        recognition.onerror = (event: any) => console.error('Voice recognition error:', event.error);
        recognition.start();
    };

    const handleToggleFavourite = (influencerId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setFavouriteInfluencerIds(prevIds => {
            const newIds = new Set(prevIds);
            newIds.has(influencerId) ? newIds.delete(influencerId) : newIds.add(influencerId);
            // Persist this change, e.g., via an API call
            console.log("Toggled favourite for:", influencerId, !prevIds.has(influencerId));
            return newIds;
        });
    };

    return (
        <div className="flex flex-1 justify-center px-4">
            <div className="flex w-full items-center gap-2 max-w-lg">
                <div className="flex-grow relative" ref={searchContainerRef}>
                    <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                        ref={searchInputRef}
                        placeholder="Search influencers, topics..."
                        aria-label="Search"
                        className="pl-9 pr-10 rounded-2xl border-gray-300 h-10 w-full"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onFocus={() => {
                            if (searchQuery.length > 0 && filteredSuggestions.length > 0) {
                                setIsSuggestionsVisible(true);
                            }
                        }}
                    />
                    {searchQuery.length > 0 && (
                        <div className="absolute right-3 inset-y-0 flex items-center">
                            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 p-0 rounded-full" onClick={handleClearSearch} aria-label="Clear search">
                                <X className="h-4 w-4 text-muted-foreground hover:text-foreground font-bold" />
                            </Button>
                        </div>
                    )}
                    {isSuggestionsVisible && filteredSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-xl max-h-96 overflow-y-auto p-2">
                            {filteredSuggestions.map((suggestion, index) => {
                                if (typeof suggestion === 'string') {
                                    return (
                                        <div key={`str-${index}`} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900 rounded-xl" onClick={() => handleSuggestionClick(suggestion)} onMouseDown={(e) => e.preventDefault()}>
                                            <Search size={16} className="text-gray-800" />
                                            {suggestion}
                                        </div>
                                    );
                                }
                                const influencer = suggestion as IndianInfluencer;
                                const isFavourite = favouriteInfluencerIds.has(influencer.id);
                                return (
                                    <div key={influencer.id} className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900 rounded-xl" onClick={() => handleSuggestionClick(influencer)} onMouseDown={(e) => e.preventDefault()}>
                                        <div className="flex items-center gap-3 flex-grow">
                                            <Avatar className="h-9 w-9 border shadow-xl backdrop-blur-lg rounded-full ring-2 ring-white/20">
                                                <AvatarImage src={influencer.avatarUrl} alt={influencer.name} />
                                                <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className='flex-grow'>
                                                <p className="font-medium leading-tight">{influencer.name}</p>
                                                <p className="text-xs text-muted-foreground">@{influencer.username}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 rounded-full shrink-0" onClick={(e) => handleToggleFavourite(influencer.id, e)} aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}>
                                            <Star className={`h-5 w-5 ${isFavourite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`} />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <Button type="button" variant="ghost" size="icon" className="p-0 h-10 w-10 flex items-center justify-center rounded-2xl text-muted-foreground hover:text-foreground shrink-0 border border-gray-300 cursor-pointer shadow-xs" onClick={handleVoiceSearch} aria-label="Search with voice">
                    <Mic className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}