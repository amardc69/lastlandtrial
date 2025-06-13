"use client";

import Link from "next/link";
import AnimatedGradientText from './AnimatedGradientText';
import React, { useState, useMemo, ChangeEvent, useEffect } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, RowSelectionState } from "@tanstack/react-table";
import { Users, TrendingUp, Award, Star, ExternalLink, Search, Briefcase, Zap, Target, Palette, BarChartBig, MoreHorizontal, ArrowUpDown, ChevronDown, Share2, UserPlus, Star as StarIcon, Flag, Copy, Eye, MessageCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Define the structure for an Influencer
interface Influencer {
  id: string;
  rank: number;
  name: string;
  avatarPlaceholder: string;
  category: string;
  followers: number;
  engagementRate: number;
  impactScore: number;
  profileUrl: string;
  joinedDate: string;
  platform: string;
}

// Define the possible fields to sort by (matches accessorKeys)
type InfluencerSortField = "rank" | "name" | "category" | "followers" | "engagementRate" | "impactScore";
type SortOrder = "asc" | "desc";

const getCategoryBadgeStyle = (category: string): string => {
  switch (category) {
    case "AI & Futurism":
      return "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200";
    case "Quantum Computing":
      return "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200";
    case "Web3 & Metaverse":
      return "bg-green-100 text-green-700 border-green-300 hover:bg-green-200";
    case "Sustainability Tech":
      return "bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";
  }
};

const initialInfluencersData: Influencer[] = [
  {
    id: "tanmay-bhat",
    rank: 1,
    name: "Tanmay Bhat",
    avatarPlaceholder: "TB",
    category: "AI & Futurism",
    followers: 12500000,
    engagementRate: 7.8,
    impactScore: 98,
    profileUrl: "/influencers/tanmay-bhat",
    joinedDate: "2020-03-15",
    platform: "YouTube",
  },
  {
    id: "gourav-choudhary",
    rank: 2,
    name: "Technical Guruji",
    avatarPlaceholder: "TG",
    category: "Quantum Computing",
    followers: 9200000,
    engagementRate: 6.5,
    impactScore: 95,
    profileUrl: "/influencers/gourav-choudhary",
    joinedDate: "2019-11-01",
    platform: "YouTube",
  },
  {
    id: "shraddha-sharma",
    rank: 3,
    name: "Shraddha Sharma",
    avatarPlaceholder: "SS",
    category: "Web3 & Metaverse",
    followers: 7800000,
    engagementRate: 8.2,
    impactScore: 92,
    profileUrl: "/influencers/shraddha-sharma",
    joinedDate: "2021-01-20",
    platform: "LinkedIn",
  },
  {
    id: "varun-mayya",
    rank: 4,
    name: "Varun Mayya",
    avatarPlaceholder: "VM",
    category: "Sustainability Tech",
    followers: 6300000,
    engagementRate: 7.1,
    impactScore: 90,
    profileUrl: "/influencers/varun-mayya",
    joinedDate: "2020-08-05",
    platform: "Instagram",
  },
  {
    id: "neil-parekh",
    rank: 5,
    name: "Neil Parekh",
    avatarPlaceholder: "NP",
    category: "AI & Futurism",
    followers: 8100000,
    engagementRate: 6.9,
    impactScore: 93,
    profileUrl: "/influencers/neil-parekh",
    joinedDate: "2022-02-10",
    platform: "Twitter",
  },
];


// Helper to format large numbers
const formatFollowers = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Category Icon Helper
const getCategoryIcon = (category: string): React.ReactNode => {
  switch (category) {
    case "AI & Futurism": return <Zap size={16} className="mr-2 text-blue-500 shrink-0" />;
    case "Quantum Computing": return <Target size={16} className="mr-2 text-purple-500 shrink-0" />;
    case "Web3 & Metaverse": return <Palette size={16} className="mr-2 text-green-500 shrink-0" />;
    case "Sustainability Tech": return <BarChartBig size={16} className="mr-2 text-teal-500 shrink-0" />;
    default: return <Briefcase size={16} className="mr-2 text-gray-500 shrink-0" />;
  }
};


// Column Definitions for TanStack Table
const columns: ColumnDef<Influencer>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 text-gray-600 hover:text-gray-900"
      >
        <Star size={14} className="mr-1.5 text-amber-500" /> Rank
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-bold text-base text-center text-gray-700">#{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
       <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 text-gray-600 hover:text-gray-900"
      >
        Influencer
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const influencer = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300 text-gray-700 text-sm font-semibold shadow-sm shrink-0">
            {influencer.avatarPlaceholder}
          </div>
          <div>
            <div className="font-medium text-sm text-gray-800">{influencer.name}</div>
            <div className="text-xs text-gray-500 md:hidden flex items-center mt-0.5">
              {getCategoryIcon(influencer.category)} {influencer.category}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hidden md:inline-flex"
      >
        Category
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const categoryValue = row.getValue("category") as string;
      return (
        <div className="text-sm hidden md:flex items-center">
          <Badge 
            variant="outline" // Base variant
            className={`capitalize flex items-center gap-x-0.5 py-0.5 px-2 rounded-md text-xs font-medium ${getCategoryBadgeStyle(categoryValue)}`}
          >
            <span>{categoryValue}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => { // Custom filter function for category
      const rowValue = row.getValue(id) as string;
      return value === "all" ? true : rowValue === value;
    },
  },
  {
    accessorKey: "followers",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 text-gray-600 hover:text-gray-900 text-right w-full justify-end"
      >
        <Users size={14} className="mr-1.5 text-sky-600" /> Followers
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-gray-700 text-sm font-medium text-center">{formatFollowers(row.getValue("followers"))}</div>,
  },
  {
    accessorKey: "engagementRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 text-gray-600 hover:text-gray-900 text-right w-full justify-end"
      >
        <TrendingUp size={14} className="mr-1.5 text-green-600" /> Engagement
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-gray-700 text-sm font-medium text-center">{row.getValue("engagementRate")}%</div>,
  },
  {
    accessorKey: "impactScore",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 text-gray-600 hover:text-gray-900 text-right w-full justify-end"
      >
        <Award size={14} className="mr-1.5 text-purple-600" /> Impact
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-gray-700 text-sm font-medium text-center">{row.getValue("impactScore")}/100</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>, // Added a header for the actions column
    cell: ({ row }) => {
      const influencer = row.original;

      // Placeholder functions for actions - implement these as needed
      const handleShareProfile = () => {
        // Example: Copy a shareable link to clipboard
        const shareUrl = `${window.location.origin}/influencers/${influencer.id}`;
        navigator.clipboard.writeText(shareUrl)
          .then(() => alert(`Profile link copied: ${shareUrl}`)) // Replace alert with a toast notification
          .catch(err => console.error('Failed to copy share link: ', err));
      };

      const handleAddToFavorites = () => {
        // Example: Toggle favorite status (requires state management)
        console.log(`Toggling favorite for ${influencer.name}`);
        alert(`Toggled favorite for ${influencer.name}. Implement actual logic.`); // Replace alert
      };
      
      const handleReportProfile = () => {
        console.log(`Reporting profile for ${influencer.name}`);
        alert(`Reported ${influencer.name}. Implement actual reporting flow.`); // Replace alert
      };

      return (
        <div className="text-center"> {/* Ensures the trigger button is centered */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 data-[state=open]:bg-gray-100">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-5 w-5" /> {/* Slightly larger icon */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 shadow-lg border-gray-200"> {/* Added width and more shadow */}
              <DropdownMenuLabel className="text-gray-700 font-medium px-3 py-2">
                Manage Influencer
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />

              {/* View Profile Action */}
              <DropdownMenuItem asChild className="cursor-pointer group hover:bg-gray-100">
                <Link href={influencer.profileUrl} className="flex items-center px-3 py-2 text-sm text-gray-700 group-hover:text-gray-900">
                  <ExternalLink size={16} className="mr-2.5 text-blue-500 group-hover:text-blue-600" />
                  View Full Profile
                </Link>
              </DropdownMenuItem>

              {/* View Details Action (placeholder) */}
              <DropdownMenuItem className="cursor-pointer group hover:bg-gray-100 flex items-center px-3 py-2 text-sm text-gray-700 group-hover:text-gray-900" onClick={() => alert(`Viewing details for ${influencer.name}`)}>
                <Eye size={16} className="mr-2.5 text-green-500 group-hover:text-green-600" />
                Quick View Details
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-200" />

              {/* Copy Influencer ID Action */}
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(influencer.id)} className="cursor-pointer group hover:bg-gray-100 flex items-center px-3 py-2 text-sm text-gray-700 group-hover:text-gray-900">
                <Copy size={16} className="mr-2.5 text-purple-500 group-hover:text-purple-600" />
                Copy Influencer ID
              </DropdownMenuItem>

              {/* Share Profile Action */}
              <DropdownMenuItem onClick={handleShareProfile} className="cursor-pointer group hover:bg-gray-100 flex items-center px-3 py-2 text-sm text-gray-700 group-hover:text-gray-900">
                <Share2 size={16} className="mr-2.5 text-teal-500 group-hover:text-teal-600" />
                Share Profile
              </DropdownMenuItem>
              
              {/* Follow on Platform (Example - assuming platform link) */}
              {influencer.platform && ( // Conditionally render if platform info exists
                 <DropdownMenuItem asChild className="cursor-pointer group hover:bg-gray-100">
                    {/* Replace '#' with actual platform profile URL construction logic */}
                    <a href={`https://example.com/${influencer.platform}/${influencer.name.toLowerCase().replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 text-sm text-gray-700 group-hover:text-gray-900">
                        <UserPlus size={16} className="mr-2.5 text-indigo-500 group-hover:text-indigo-600" />
                        Follow on {influencer.platform}
                    </a>
                </DropdownMenuItem>
              )}


              <DropdownMenuSeparator className="bg-gray-200" />

              {/* Add to Favorites Action */}
              <DropdownMenuItem onClick={handleAddToFavorites} className="cursor-pointer group hover:bg-gray-100 flex items-center px-3 py-2 text-sm text-gray-700 group-hover:text-gray-900">
                <StarIcon size={16} className="mr-2.5 text-amber-500 group-hover:text-amber-600" /> {/* Renamed Star to StarIcon if Star from lucide is already used for ranking */}
                Add to Favorites
              </DropdownMenuItem>

              {/* Report Profile Action */}
              <DropdownMenuItem onClick={handleReportProfile} className="cursor-pointer group hover:bg-gray-100 flex items-center px-3 py-2 text-sm text-red-600 group-hover:text-red-700 focus:bg-red-50 focus:text-red-700">
                <Flag size={16} className="mr-2.5 text-red-600 hover:text-red-700" /> {/* Icon inherits color */}
                Report Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false, // Changed to false as per your original code, but actions columns are often hideable. Set to true if you want it in the "Columns" dropdown.
  },
];


// DataTable Component
const InfluencerDataTable: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'rank', desc: false }]); // Default sort by rank asc
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    // Hide some columns by default on smaller screens if needed, e.g.
    // engagementRate: false, 
    // impactScore: false,
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState(''); // For the main search input

  // For custom sort by select and switch
  const [customSortField, setCustomSortField] = useState<InfluencerSortField>("rank");
  const [customSortOrder, setCustomSortOrder] = useState<SortOrder>("asc");


  const table = useReactTable({
    data: initialInfluencersData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter, // For global search
    globalFilterFn: (row, columnId, filterValue) => { // Custom global filter logic
        const searchTerm = filterValue.toLowerCase();
        return row.original.name.toLowerCase().includes(searchTerm) ||
               row.original.category.toLowerCase().includes(searchTerm) ||
               row.original.platform.toLowerCase().includes(searchTerm);
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const uniqueCategories = useMemo<string[]>(() => {
    const allCategories = new Set(initialInfluencersData.map(inf => inf.category));
    return ["all", ...Array.from(allCategories)];
  }, []);

  // Effect to sync custom sort controls with table's sorting state
  useEffect(() => {
    if (customSortField) {
        table.setSorting([{ id: customSortField, desc: customSortOrder === 'desc' }]);
    }
  }, [customSortField, customSortOrder, table]);


  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl border border-gray-200/80">
      <div className="mb-6 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">Influencer Leaderboard</h2>
        <p className="text-gray-600 text-sm">
          Use the filters below to refine the list and find the influencers most relevant to your interests.
        </p>
        {/* Global Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by name, category, platform..."
            value={globalFilter ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
            className="pl-10 pr-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {/* Filter and Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          {/* Category Filter */}
          <div>
            <Label htmlFor="category-filter-dt" className="text-sm font-medium text-gray-700 mb-1.5 block">Filter by Category</Label>
            <Select
              value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) => table.getColumn("category")?.setFilterValue(value === "all" ? undefined : value)}
            >
              <SelectTrigger id="category-filter-dt" className="w-full border-gray-300 rounded-md shadow-sm">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Sort Field Select */}
          <div>
            <Label htmlFor="sort-field-dt" className="text-sm font-medium text-gray-700 mb-1.5 block">Sort By</Label>
            <Select value={customSortField} onValueChange={(value) => setCustomSortField(value as InfluencerSortField)}>
              <SelectTrigger id="sort-field-dt" className="w-full border-gray-300 rounded-md shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rank">Rank</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="followers">Followers</SelectItem>
                <SelectItem value="engagementRate">Engagement</SelectItem>
                <SelectItem value="impactScore">Impact Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Sort Order Switch */}
          <div className="flex items-center space-x-2 justify-self-start sm:justify-self-auto mt-4 sm:mt-0 md:mt-auto pb-1.5">
            <Switch
              id="sort-order-dt"
              checked={customSortOrder === "desc"}
              onCheckedChange={(checked: boolean) => setCustomSortOrder(checked ? "desc" : "asc")}
            />
            <Label htmlFor="sort-order-dt" className="text-sm font-medium text-gray-700">
              {customSortOrder === "asc" ? "Ascending" : "Descending"}
            </Label>
          </div>
           {/* Column Visibility Dropdown */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto border-gray-300 shadow-sm">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id === "engagementRate" ? "Engagement" : column.id === "impactScore" ? "Impact" : column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* TanStack Table */}
      <div className="rounded-md border border-gray-200/80 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-3 py-3 sm:px-4 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-200/70 hover:bg-gray-50/80 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-3 sm:px-4 sm:py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination and Row Selection Info */}
      <div className="flex items-center justify-between space-x-2 pt-4">
        <div className="flex-1 text-sm text-gray-600">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 flex items-center">
            <span className="text-sm text-gray-600">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-gray-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-gray-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};


// Main Hero Section Component
const InfluencerRankingHeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900 pt-12 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-24 gap-12 xl:gap-16 items-start">
          {/* Left Column: Text and Info */}
          <div className="lg:col-span-9 space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Discover Top <AnimatedGradientText>Innovators</AnimatedGradientText>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Discover top influencers shaping the future of tech. Our detailed rankings use comprehensive metrics to highlight key voices and thought leaders.
            </p>
            <div className="space-y-4">
              {/* 1. Authentic Brand Partnerships */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-1">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Authentic Partnerships</h3>
                  <p className="text-gray-600">Partner with influencers whose values match yours for genuine brand alignment.</p>
                </div>
              </div>

              {/* 2. Audience Engagement */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-3 mt-1">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Engagement Tactics</h3>
                  <p className="text-gray-600">Use interactive campaigns to spark conversations and build community trust.</p>
                </div>
              </div>

              {/* 3. Content Collaboration */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center mr-3 mt-1">
                  <Camera size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Co‑Created Content</h3>
                  <p className="text-gray-600">Collaborate on creative content—from tutorials to live takeovers—to boost reach.</p>
                </div>
              </div>
            </div>
            <Link href="/in/all-rankings">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-900 text-white py-3.5 text-base shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
              >
                Explore Everything
              </Button>
            </Link>
          </div>

          {/* Right Column: DataTable */}
          <div className="lg:col-span-15">
            <InfluencerDataTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerRankingHeroSection;
