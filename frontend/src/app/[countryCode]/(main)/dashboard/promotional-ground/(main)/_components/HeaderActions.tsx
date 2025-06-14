// src/components/layout/header/HeaderActions.tsx
'use client';

import React, { useState, useEffect } from 'react';
// useRouter from next/navigation is not available in this environment.
// We will use standard window.location.href for navigation.
import { Button } from '@/components/ui/button';
import { Box, MessageSquare, Bell, Maximize, Minimize } from 'lucide-react';
import { TrierDialog } from './TrierDialog';


export function HeaderActions() {
    // The router hook is removed as it's part of Next.js and not available here.
    const [isFullscreen, setIsFullscreen] = useState(false);

    // This effect adds an event listener to sync the isFullscreen state
    // with the browser's actual fullscreen status, e.g., when the user presses 'ESC'.
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    /**
     * Toggles the browser's fullscreen mode.
     * Attempts to enter fullscreen if not already active, otherwise exits.
     */
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                // Log any errors that occur while trying to enter fullscreen
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
                // Replaced router.push with standard web API for navigation
                onClick={() => window.location.href = '/in/dashboard/modules/promotional-ground/projects'}
            >
                <Box className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
                 // Replaced router.push with standard web API for navigation
                onClick={() => window.location.href = '/in/dashboard/modules/promotional-ground/inbox'}
            >
                <MessageSquare className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
            >
                <Bell className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
                onClick={toggleFullScreen}
            >
                {/* Conditionally render the icon based on the fullscreen state */}
                {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
            </Button>
            <TrierDialog />
        </div>
    );
}
