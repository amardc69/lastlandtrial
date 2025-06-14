// src/components/layout/header/UserProfile.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard, Keyboard, LifeBuoy, LogOut, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from 'lucide-react';

interface UserProfileProps {
    tsmUser: any;
}

export function UserProfile({ tsmUser }: UserProfileProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-4 cursor-pointer">
                    <Avatar className="shadow-xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
                        <AvatarImage
                            src={tsmUser?.avatarUrl ? tsmUser.avatarUrl : '/images/profile.jpg'}
                            alt="User avatar"
                        />
                        <AvatarFallback>
                            {tsmUser?.name
                                ? tsmUser.name
                                    .split(' ')
                                    .map((n: string) => n[0]?.toUpperCase() || '')
                                    .join('')
                                : 'NA'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <CardTitle className="leading-tight text-sm">
                            {tsmUser?.name ?? 'Unknown Name'}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            {tsmUser?.username ?? 'unknown'}
                        </CardDescription>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/in/dashboard/modules/promotional-ground/profile" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/billing" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Billing</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/shortcuts" className="flex items-center gap-2">
                            <Keyboard className="h-4 w-4" />
                            <span>Keyboard shortcuts</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/team" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Team</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem asChild>
                                    <Link href="/invite/email" className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <span>Email</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/invite/message" className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>Message</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/invite/more" className="flex items-center gap-2">
                                        <PlusCircle className="h-4 w-4" />
                                        <span>More...</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild>
                        <Link href="/team/new" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            <span>New Team</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> {/* Replace with a proper GitHub icon if available */}
                        <span>GitHub</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/support" className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4" />
                        <span>Support</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="flex items-center gap-2">
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/logout" className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}