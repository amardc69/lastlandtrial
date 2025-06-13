// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { Search, Maximize, Bell, MessageSquare, CreditCard, Keyboard, LifeBuoy, LogOut, Mail, Plus, PlusCircle, Settings, User, UserPlus, Users, Star, Box, ChevronLeft, ChevronRight, X, Mic } from 'lucide-react'; // Added Mic
// import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';

// const influencerTypes = ['All', 'Lifestyle', 'Travelling', 'Food', 'Vlogger', 'Podcaster', 'Fashion', 'Beauty',
//                          'Fitness', 'Tech', 'Music', 'Sports', 'Gaming', 'Comedy', 'Education', 'Business',
//                          'Motivation', 'Art', 'Science', 'Politics', 'News', 'Health', 'Spirituality',
//                          'Pets', 'Parenting', 'Relationships', 'DIY', 'Books', 'Movies', 'TV Shows',
//                          'Anime', 'Dance', 'Theatre', 'Photography', 'Design', 'Writing', 'Journalism'];

// // Define the structure for an Indian Influencer
// interface IndianInfluencer {
//   id: string;
//   name: string; // Online name
//   username: string; // e.g., @username
//   avatarUrl: string;
//   // Add any other relevant fields like follower count, category, etc. if needed for sorting/display later
// }

// // Sample data for famous Indian influencers (replace with actual data and more entries)
// const sampleIndianInfluencersData = [
//   { id: '1', name: 'Bhuvan Bam', username: 'bhuvan.bam22', avatarUrl: 'https://yt3.googleusercontent.com/H2c8y3sN7j3Hslc_eCun0FSJCQcrYl4zPyhsCt1510INBq1h2vFQTMUOtI4HJNkFD07s0pFlCA=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '2', name: 'Ashish Chanchlani', username: 'ashishchanchlani', avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kP47aiu-pgZDYOEGCSKXOHPZJUPQb3D0dbYRLhKj_YxrY=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '3', name: 'CarryMinati', username: 'carryminati', avatarUrl: 'https://yt3.googleusercontent.com/cxE8FStJktJ2oiuv1f-7OHMfJI7ZlMby4NgPDkfJTyV3sOsvdo5pmsAb8TAcJVNor6gNT2h_0w=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '4', name: 'Prajakta Koli', username: 'mostlysane', avatarUrl: 'https://yt3.googleusercontent.com/u10U6bHQbeDq0-yrR3dZAr7kLu51wYXsbhuxJqNgOUYF4vUhaWOmlJH3C5Va0li3tMJ-vfA6=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '5', name: 'Gaurav Chaudhary', username: 'technicalguruji', avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_nQFOjj2baePBWQGqL0lgv7SwxZ1uXYo8pg_hViDZb6DEsX=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '6', name: 'Round2hell', username: 'round2hell', avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kiR_xWlg7vo5dKLMFOxCgoYvV5xizv6zYbSrfrhiRbX2Q=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '7', name: 'Amit Bhadana', username: 'theamitbhadana', avatarUrl: 'https://yt3.googleusercontent.com/B1XPPqw4W6ZR0B7C4CDoe5UQgOPfD-DO0RUiylmwE_yBqJ-EbXelOhLXu4jOgGar6xa5TPiMglY=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '8', name: 'Sandeep Maheshwari', username: 'sandeep__maheshwari', avatarUrl: 'https://yt3.googleusercontent.com/5Egj8H7GT92E1dQZYhQuFvzInqR1iPo2YuXwJDcdO-qjRKuDNKuzjrQ7sxmjIP31j3Io0m6mATw=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '9', name: 'Dhruv Rathee', username: 'dhruvrathee', avatarUrl: 'https://yt3.googleusercontent.com/ATJuCH36wHPiFwumVBm423ouLVGQtq2pkPMOlSCclqqXErazOWyl4n07MRmbFnSJTL5P02Fq=s160-c-k-c0x00ffffff-no-rj'},
//   { id: '10', name: 'Ranveer Allahbadia', username: 'beerbiceps', avatarUrl: 'https://yt3.googleusercontent.com/Vgg0TqxVuR98dBQDoaebgM-4AEu1B_Snn0VmSPFpiD6GbCHOiUPdcophJGke3GlTdbBocotVBw=s160-c-k-c0x00ffffff-no-rj'}];


// const allPossibleSuggestions: (string | IndianInfluencer)[] = [
//   ...influencerTypes.filter(type => type !== 'All'),
//   "React projects", "Next.js authentication", "Tailwind CSS animations",
//   "Shadcn UI themes", "Frontend developer jobs", "UI/UX design trends",
//   "Digital marketing strategies", "Content creation tips", "Startup funding",
//   "Productivity hacks",
//   ...sampleIndianInfluencersData, // Add influencer objects to the suggestions list
// ];

// const trierBenefits = [
//   {
//     id: 1,
//     title: 'Exclusive Early Access',
//     description: 'Be the first to experience new features and updates before anyone else.',
//   },
//   {
//     id: 2,
//     title: 'Shape the Future',
//     description: 'Your valuable feedback will directly influence our product development.',
//   },
//   {
//     id: 3,
//     title: 'Direct Support Line',
//     description: 'Get priority support from our dedicated team for triers.',
//   },
//   {
//     id: 4,
//     title: 'Community & Recognition',
//     description: 'Join an exclusive community and get recognized for your contributions.',
//   },
// ];

// interface HomeHeaderProps {
//   tsmUser: any;
//   selectedType: string;
//   onToggleChange: (value: string) => void;
// }

// export function HomeHeader({
//   tsmUser,
//   selectedType,
//   onToggleChange,
// }: HomeHeaderProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [isTrierDialogOpen, setIsTrierDialogOpen] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [termsAccepted, setTermsAccepted] = useState(false);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredSuggestions, setFilteredSuggestions] = useState<(string | IndianInfluencer)[]>([]);
//   const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   const [favouriteInfluencerIds, setFavouriteInfluencerIds] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const queryFromUrl = searchParams.get('search_query');
//     if (queryFromUrl !== null) {
//       setSearchQuery(queryFromUrl);
//     } else {
//       setSearchQuery('');
//     }
//   }, [searchParams]);


//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => (prev === trierBenefits.length - 1 ? 0 : prev + 1));
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? trierBenefits.length - 1 : prev - 1));
//   };

//   const handleBecomeTrierContinue = () => {
//     if (termsAccepted) {
//       console.log('User agreed to terms and wants to become a Trier.');
//       setIsTrierDialogOpen(false);
//       // router.push('/become-a-trier-application');
//     } else {
//       console.warn('Please accept the terms and conditions to continue.');
//     }
//   };

//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.length > 0) {
//       const newSuggestions = allPossibleSuggestions
//         .filter((suggestion) => {
//           if (typeof suggestion === 'string') {
//             return suggestion.toLowerCase().includes(query.toLowerCase());
//           } else { // It's an IndianInfluencer object
//             return (
//               suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
//               suggestion.username.toLowerCase().includes(query.toLowerCase())
//             );
//           }
//         })
//         .slice(0, 100); // Show top 100 relevant suggestions
//       setFilteredSuggestions(newSuggestions);
//       setIsSuggestionsVisible(newSuggestions.length > 0);
//     } else {
//       setFilteredSuggestions([]);
//       setIsSuggestionsVisible(false);
//     }
//   };

//   const handleSuggestionClick = (suggestion: string | IndianInfluencer) => {
//     const queryValue = typeof suggestion === 'string' ? suggestion : suggestion.name;
//     setSearchQuery(queryValue);
//     setFilteredSuggestions([]);
//     setIsSuggestionsVisible(false);

//     const currentParams = new URLSearchParams(window.location.search);
//     currentParams.set('search_query', queryValue);
//     const newUrl = `${pathname}?${currentParams.toString()}`;
//     router.push(newUrl);
//   };

//   const handleToggleFavourite = (influencerId: string, event: React.MouseEvent) => {
//     event.stopPropagation(); // Prevent triggering handleSuggestionClick
//     setFavouriteInfluencerIds(prevIds => {
//       const newIds = new Set(prevIds);
//       if (newIds.has(influencerId)) {
//         newIds.delete(influencerId);
//       } else {
//         newIds.add(influencerId);
//       }
//       return newIds;
//     });
//     // Here you might want to persist this change, e.g., via an API call
//     console.log("Toggled favourite for:", influencerId, !favouriteInfluencerIds.has(influencerId));
//   };

//   const handleClearSearch = () => {
//     setSearchQuery('');
//     setFilteredSuggestions([]);
//     setIsSuggestionsVisible(false);
//     searchInputRef.current?.focus();
//     const currentParams = new URLSearchParams(window.location.search);
//     if (currentParams.has('search_query')) {
//       currentParams.delete('search_query');
//       let newSearchString = currentParams.toString();
//       const newUrl = `${pathname}${newSearchString ? `?${newSearchString}` : ''}`;
//       router.push(newUrl);
//     }
//   };

//   const handleVoiceSearch = () => {
//     console.log("Voice search initiated");
//     // Web Speech API implementation (as previously in your code)
//     if ('webkitSpeechRecognition' in window) {
//         const recognition = new (window as any).webkitSpeechRecognition();
//         recognition.continuous = false;
//         recognition.interimResults = false;
//         recognition.lang = 'en-US';

//         recognition.onstart = () => {
//             console.log('Voice recognition started. Try speaking into the microphone.');
//             // You could update UI here, e.g., show a "listening" icon
//         };

//         recognition.onresult = (event: any) => {
//             const transcript = event.results[0][0].transcript;
//             setSearchQuery(transcript);
//             // Trigger search with the transcript
//             const changeEvent = { target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>;
//             handleSearchInputChange(changeEvent); // This will update suggestions

//             // Update URL params and navigate
//             const currentParams = new URLSearchParams(window.location.search);
//             currentParams.set('search_query', transcript);
//             const newUrl = `${pathname}?${currentParams.toString()}`;
//             router.push(newUrl);
//             setIsSuggestionsVisible(false); // Hide suggestions after voice input processing
//         };

//         recognition.onerror = (event: any) => {
//             console.error('Voice recognition error', event.error);
//             if (event.error === 'no-speech') {
//                 // alert('No speech was detected. Please try again.');
//                 console.warn('No speech was detected.');
//             } else if (event.error === 'audio-capture') {
//                 // alert('No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.');
//                 console.warn('No microphone found or audio capture error.');
//             } else if (event.error === 'not-allowed') {
//                 // alert('Permission to use microphone was denied.');
//                 console.warn('Microphone permission denied.');
//             }
//             // Handle other errors or provide feedback to the user
//         };

//         recognition.onend = () => {
//             console.log('Voice recognition ended.');
//             // UI cleanup if needed
//         };

//         recognition.start();
//     } else {
//         console.warn('Speech recognition not supported in this browser.');
//         alert('Voice search is not supported in your browser. Please type your search query.');
//     }
//   };


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchContainerRef.current &&
//         !searchContainerRef.current.contains(event.target as Node)
//       ) {
//         setIsSuggestionsVisible(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <CardHeader>
//       <div className="flex items-center justify-between">
//         {/* Left Section: TSM User Info */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <div className="flex items-center space-x-4 cursor-pointer">
//               <Avatar className="shadow-xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
//                 <AvatarImage
//                   src={tsmUser?.avatarurl ? tsmUser.avatarurl : '/images/profile.jpg'}
//                   alt="User avatar"
//                 />
//                 <AvatarFallback>
//                   {tsmUser?.name
//                     ? tsmUser.name
//                         .split(' ')
//                         .map((n: string) => n[0]?.toUpperCase() || '')
//                         .join('')
//                     : 'NA'}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col">
//                 <CardTitle className="leading-tight text-sm">
//                   {tsmUser?.name ?? 'Unknown Name'}
//                 </CardTitle>
//                 <CardDescription className="text-sm text-muted-foreground">
//                   {tsmUser?.username ?? 'unknown'}
//                 </CardDescription>
//               </div>
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56 mt-3">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem asChild>
//                 <Link href="/in/dashboard/modules/promotional-ground/profile" className="flex items-center gap-2">
//                   <User className="h-4 w-4" />
//                   <span>Profile</span>
//                 </Link>
//               </DropdownMenuItem>
//               {/* ... other dropdown items ... */}
//               <DropdownMenuItem asChild>
//                 <Link href="/billing" className="flex items-center gap-2">
//                   <CreditCard className="h-4 w-4" />
//                   <span>Billing</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/settings" className="flex items-center gap-2">
//                   <Settings className="h-4 w-4" />
//                   <span>Settings</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/shortcuts" className="flex items-center gap-2">
//                   <Keyboard className="h-4 w-4" />
//                   <span>Keyboard shortcuts</span>
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem asChild>
//                 <Link href="/team" className="flex items-center gap-2">
//                   <Users className="h-4 w-4" />
//                   <span>Team</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuSub>
//                 <DropdownMenuSubTrigger className="flex items-center gap-2">
//                   <UserPlus className="h-4 w-4" />
//                   <span>Invite users</span>
//                 </DropdownMenuSubTrigger>
//                 <DropdownMenuPortal>
//                   <DropdownMenuSubContent>
//                     <DropdownMenuItem asChild>
//                       <Link href="/invite/email" className="flex items-center gap-2">
//                         <Mail className="h-4 w-4" />
//                         <span>Email</span>
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild>
//                       <Link href="/invite/message" className="flex items-center gap-2">
//                         <MessageSquare className="h-4 w-4" />
//                         <span>Message</span>
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem asChild>
//                       <Link href="/invite/more" className="flex items-center gap-2">
//                         <PlusCircle className="h-4 w-4" />
//                         <span>More...</span>
//                       </Link>
//                     </DropdownMenuItem>
//                   </DropdownMenuSubContent>
//                 </DropdownMenuPortal>
//               </DropdownMenuSub>
//               <DropdownMenuItem asChild>
//                 <Link href="/team/new" className="flex items-center gap-2">
//                   <Plus className="h-4 w-4" />
//                   <span>New Team</span>
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem asChild>
//               <Link href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="flex items-center gap-2">
//                 <Users className="h-4 w-4" /> {/* Assuming GitHub icon, Users might be placeholder */}
//                 <span>GitHub</span>
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link href="/support" className="flex items-center gap-2">
//                 <LifeBuoy className="h-4 w-4" />
//                 <span>Support</span>
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem disabled className="flex items-center gap-2">
//               {/* <Zap className="mr-2 h-4 w-4" /> */}
//               <span>API</span>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem asChild>
//               <Link href="/logout" className="flex items-center gap-2">
//                 <LogOut className="h-4 w-4" />
//                 <span>Log out</span>
//               </Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Center Section: Search Bar */}
//         <div className="flex flex-1 justify-center px-4">
//           <div className="flex w-full items-center gap-2 max-w-lg">
//             <div className="flex-grow relative" ref={searchContainerRef}>
//               <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-muted-foreground" />
//               </div>
//               <Input
//                 ref={searchInputRef}
//                 placeholder="Search influencers, topics..."
//                 aria-label="Search"
//                 className="pl-9 pr-10 rounded-2xl border-gray-300 h-10 w-full"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//                 onFocus={() => {
//                   if (searchQuery.length > 0 && filteredSuggestions.length > 0) {
//                     setIsSuggestionsVisible(true);
//                   } else if (searchQuery.length === 0) { // Optionally show some default suggestions on focus
//                     // const defaultSuggestions = allPossibleSuggestions.slice(0,5); // Example
//                     // setFilteredSuggestions(defaultSuggestions);
//                     // setIsSuggestionsVisible(true);
//                   }
//                 }}
//               />
//               {searchQuery.length > 0 && (
//                 <div className="absolute right-3 inset-y-0 flex items-center">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="h-7 w-7 p-0 rounded-full"
//                     onClick={handleClearSearch}
//                     aria-label="Clear search"
//                   >
//                     <X className="h-4 w-4 text-muted-foreground hover:text-foreground font-bold" />
//                   </Button>
//                 </div>
//               )}
//               {isSuggestionsVisible && filteredSuggestions.length > 0 && (
//                 <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-xl max-h-96 overflow-y-auto p-2">
//                   {filteredSuggestions.map((suggestion, index) => {
//                     if (typeof suggestion === 'string') {
//                       return (
//                         <div
//                           key={`str-${index}`}
//                           className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900 rounded-xl"
//                           onClick={() => handleSuggestionClick(suggestion)}
//                           onMouseDown={(e) => e.preventDefault()} // Prevents input blur before click
//                         >
//                           <Search size={16} className="text-gray-800" />
//                           {suggestion}
//                         </div>
//                       );
//                     } else { // It's an IndianInfluencer object
//                       const influencer = suggestion as IndianInfluencer;
//                       const isFavourite = favouriteInfluencerIds.has(influencer.id);
//                       return (
//                         <div
//                           key={influencer.id}
//                           className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900 rounded-xl"
//                           onClick={() => handleSuggestionClick(influencer)}
//                           onMouseDown={(e) => e.preventDefault()}
//                         >
//                           <div className="flex items-center gap-3 flex-grow">
//                             <Avatar className="h-9 w-9 border shadow-xl backdrop-blur-lg rounded-full ring-2 ring-white/20">
//                               <AvatarImage src={influencer.avatarUrl} alt={influencer.name} />
//                               <AvatarFallback>
//                                 {influencer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div className='flex-grow'>
//                               <p className="font-medium leading-tight">{influencer.name}</p>
//                               <p className="text-xs text-muted-foreground">@{influencer.username}</p>
//                             </div>
//                           </div>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 p-0 rounded-full shrink-0"
//                             onClick={(e) => handleToggleFavourite(influencer.id, e)}
//                             aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
//                           >
//                             <Star
//                               className={`h-5 w-5 ${isFavourite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
//                             />
//                           </Button>
//                         </div>
//                       );
//                     }
//                   })}
//                 </div>
//               )}
//             </div>

//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               className="p-0 h-10 w-10 flex items-center justify-center rounded-2xl text-muted-foreground hover:text-foreground shrink-0 border border-gray-300 cursor-pointer shadow-xs"
//               onClick={handleVoiceSearch}
//               aria-label="Search with voice"
//             >
//               <Mic className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Right Section: Icons and Buttons */}
//         <div className="flex items-center space-x-2">
//            <Button
//             variant="ghost"
//             className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
//             onClick={() =>
//               router.push('/in/dashboard/modules/promotional-ground/projects')
//             }
//           >
//             <Box className="h-6 w-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
//             onClick={() =>
//               router.push('/in/dashboard/modules/promotional-ground/inbox')
//             }
//           >
//             <MessageSquare className="h-6 w-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
//           >
//             <Bell className="h-6 w-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             className="text-gray-600 hover:text-gray-800 p-3 rounded-full cursor-pointer"
//           >
//             <Maximize className="h-6 w-6" />
//           </Button>

//           <Dialog open={isTrierDialogOpen} onOpenChange={setIsTrierDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 variant="default"
//                 className="py-3 text-sm rounded-2xl bg-black cursor-pointer"
//                 onClick={() => {
//                   setCurrentSlide(0);
//                   setTermsAccepted(false);
//                   setIsTrierDialogOpen(true);
//                 }}
//               >
//                 Become a Trier
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[525px]">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-semibold">Become a Trier</DialogTitle>
//                 <DialogDescription>
//                   Explore the benefits of joining our Trier program and help us grow.
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="my-3 p-6 rounded-lg border bg-slate-50 min-h-[150px] flex flex-col justify-center items-center text-center">
//                 <h3 className="text-lg font-semibold text-slate-800 mb-2">
//                   {trierBenefits[currentSlide].title}
//                 </h3>
//                 <p className="text-sm text-slate-600">
//                   {trierBenefits[currentSlide].description}
//                 </p>
//               </div>
//               <div className="flex items-center justify-between mb-6">
//                 <Button variant="outline" size="icon" onClick={handlePrevSlide} aria-label="Previous benefit">
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <div className="flex space-x-2">
//                   {trierBenefits.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentSlide(index)}
//                       className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'}`}
//                       aria-label={`Go to benefit ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//                 <Button variant="outline" size="icon" onClick={handleNextSlide} aria-label="Next benefit">
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="terms"
//                   checked={termsAccepted}
//                   onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
//                   aria-label="Accept terms and conditions"
//                 />
//                 <Label
//                   htmlFor="terms"
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   I agree to the{' '}
//                   <Link href="/in/dashboard/modules/promotional-ground/terms-and-conditions" className="underline hover:text-gray-800" target="_blank">
//                     Terms and Conditions
//                   </Link>.
//                 </Label>
//               </div>

//               <DialogFooter className="sm:justify-end">
//                 <DialogClose asChild>
//                   <Button type="button" variant="outline" className='rounded-2xl cursor-pointer'>
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button type="button" onClick={handleBecomeTrierContinue} disabled={!termsAccepted} className='rounded-2xl cursor-pointer'>
//                   Continue
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* ToggleGroup and Select for influencer types and sorting */}
//       <div className="flex w-full items-center py-4">
//         <div className="w-[85%] relative">
//           <ToggleGroup type="single" value={selectedType} onValueChange={onToggleChange}>
//             <div className="scrollable-container flex gap-2 overflow-x-auto"> {/* Add 'pb-2' or similar if scrollbar overlaps */}
//               {influencerTypes.map((type) => (
//                 <ToggleGroupItem
//                   key={type}
//                   value={type.toLowerCase()} // Ensure value matches selectedType state updates
//                   className="h-10 shrink-0 cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-black hover:text-black hover:border-gray-300 data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=on]:border-gray-900"
//                 >
//                   {type}
//                 </ToggleGroupItem>
//               ))}
//             </div>
//           </ToggleGroup>
//           {/* Fade effect for scrollable area */}
//           <div className="absolute right-0 top-0 bottom-0 h-full w-10 pointer-events-none bg-gradient-to-l from-card to-transparent" />
//         </div>
//         <div className="w-[15%] pl-4">
//           <Select>
//             <SelectTrigger className="w-full rounded-xl border-gray-300 bg-gray-100 h-10 text-sm">
//               <SelectValue placeholder="Sorting Station" />
//             </SelectTrigger>
//             <SelectContent className='rounded-lg border-gray-200 bg-white mt-1'>
//               <SelectGroup>
//                 <SelectItem value="name" className="rounded-lg text-sm">
//                   <div className="flex items-center space-x-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span>Name</span>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="followers" className="rounded-lg text-sm">
//                   <div className="flex items-center space-x-2">
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                     <span>Followers</span>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="engagement" className="rounded-lg text-sm">
//                   <div className="flex items-center space-x-2">
//                     <MessageSquare className="h-4 w-4 text-muted-foreground" />
//                     <span>Engagement</span>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="rating" className="rounded-lg text-sm">
//                   <div className="flex items-center space-x-2">
//                     <Star className="h-4 w-4 text-muted-foreground" />
//                     <span>Rating</span>
//                   </div>
//                 </SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </CardHeader>
//   );
// }

// src/components/layout/header/HomeHeader.tsx
'use client';

import React from 'react';
import { CardHeader } from '@/components/ui/card';
import { UserProfile } from './UserProfile';
import { SearchBar } from './SearchBar';
import { HeaderActions } from './HeaderActions';
import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';

// The props now only contain data and state handlers needed by its children.
interface HomeHeaderProps {
    tsmUser: any;
    selectedType: string;
    onToggleChange: (value: string) => void;
}

export function HomeHeader({
    tsmUser,
    selectedType,
    onToggleChange,
}: HomeHeaderProps) {
    return (
        <CardHeader>
            <div className="flex items-center justify-between">
                {/* Left Section: TSM User Info */}
                <UserProfile tsmUser={tsmUser} />

                {/* Center Section: Search Bar */}
                <SearchBar />

                {/* Right Section: Icons and Buttons */}
                <HeaderActions />
            </div>

            {/* Bottom Section: ToggleGroup and Select for filtering and sorting */}
            <div className="flex w-full items-center py-4">
                <FilterTabs
                    selectedType={selectedType}
                    onToggleChange={onToggleChange}
                />
                <SortDropdown />
            </div>
        </CardHeader>
    );
}