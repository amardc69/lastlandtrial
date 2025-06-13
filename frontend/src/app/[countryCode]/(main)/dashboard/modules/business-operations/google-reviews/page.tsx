'use client';

import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';

// Define the Review type
export type Review = {
  id: number;
  userId: number;
  imgeURL: string;
  prompt: string;
  colorofthesentiment: string;
  learning: string;
  stars: string;
  place: string;
  response: string;
  review_itself: string;
  reviewer_name: string;
  sentiment: 'Good' | 'Bad' | 'Neutral';
  createdAt: string;
};

export default function GoogleReviewPage() {
  const { data: session, status } = useSession();

  // 1. Manage Active Tab State
  const [activeTab, setActiveTab] = useState('generate_responses');

  // States for generating responses
  const [imageUrl, setImageUrl] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // History data
  const [prompts, setPrompts] = useState<Review[]>([]); // Data for History tab
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');

  // Table data
  const [tableData, setTableData] = useState<Review[]>([]); // Data for Tables tab
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState('');

  // Copy state
  const [copied, setCopied] = useState(false);

  // Effect to handle auto-copy when response changes
  useEffect(() => {
    if (response && response.response) {
      navigator.clipboard.writeText(response.response).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // Handle copy failure if needed
      });
    }
  }, [response]);

  // 3. Fetch Data When "History" or "Tables" Tab is Activated
  useEffect(() => {
    if (activeTab === 'history') {
      fetchPrompts();
    } else if (activeTab === 'tables') {
      fetchTableData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, session?.user?.id]); // Include session.user.id as dependency

  // 4. Define fetchPrompts Function for History Tab
  const fetchPrompts = async () => {
    // Ensure the user is authenticated
    if (status !== 'authenticated' || !session?.user?.id) {
      setHistoryError('You must be logged in to view history.');
      return;
    }

    setHistoryLoading(true);
    setHistoryError('');

    try {
      const res = await fetch(`/api/dashboard/business-operations/google-reviews/history/${session.user.id}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch history');
      }

      const data: Review[] = await res.json();
      setPrompts(data);
      setHistoryError(''); // Clear any previous errors
    } catch (err: any) {
      setHistoryError(err.message || 'Something went wrong while fetching history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  // 4. Define fetchTableData Function for Tables Tab
  const fetchTableData = async () => {
    // Ensure the user is authenticated
    if (status !== 'authenticated' || !session?.user?.id) {
      setTableError('You must be logged in to view tables.');
      return;
    }

    setTableLoading(true);
    setTableError('');

    try {
      const res = await fetch(`/api/dashboard/business-operations/google-reviews/history/${session.user.id}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch table data');
      }

      const data: Review[] = await res.json();
      setTableData(data);
      setTableError(''); // Clear any previous errors
    } catch (err: any) {
      setTableError(err.message || 'Something went wrong while fetching table data.');
    } finally {
      setTableLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);

    // Ensure the user is authenticated
    if (status === 'loading') {
      setError('Authentication status is loading. Please try again.');
      setLoading(false);
      return;
    }

    if (status !== 'authenticated' || !session?.user?.id) {
      setError('You must be logged in to perform this action.');
      setLoading(false);
      return;
    }

    // Determine if using URL or local image
    let payload: any = { userId: parseInt(session.user.id, 10) }; // Include userId in payload
    if (imageUrl) {
      payload.imageUrl = imageUrl;
    } else if (localImage) {
      // Handle file upload if necessary
      // For simplicity, we'll assume the API can handle base64 or multipart
      const reader = new FileReader();
      reader.readAsDataURL(localImage);
      reader.onloadend = async () => {
        payload.imageData = reader.result;
        await fetchData(payload);
      };
      return;
    } else {
      setError('Please provide an image URL or upload an image.');
      setLoading(false);
      return;
    }

    await fetchData(payload);
  };

  const fetchData = async (payload: any) => {
    try {
      const res = await fetch('/api/dashboard/business-operations/google-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate reply');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Determine the image preview source
  const previewSource = localImage ? previewUrl : imageUrl;

  // Handle image upload and preview
  useEffect(() => {
    if (localImage) {
      const objectUrl = URL.createObjectURL(localImage);
      setPreviewUrl(objectUrl);

      // Cleanup the object URL when component unmounts or image changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [localImage]);

  // Define the columns for the table
  const columns: ColumnDef<Review>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'reviewer_name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Reviewer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue('reviewer_name')}</div>,
    },
    {
      accessorKey: 'stars',
      header: 'Stars',
      cell: ({ row }) => <div>{row.getValue('stars')}</div>,
    },
    {
      accessorKey: 'sentiment',
      header: 'Sentiment',
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{ color: row.original.colorofthesentiment }}
        >
          {row.getValue('sentiment')}
        </div>
      ),
    },
    {
      accessorKey: 'place',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Place
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue('place')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => (
        <div>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(row.getValue('createdAt')))}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const review = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(review.response)}
              >
                Copy Response
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Initialize React Table
  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="py-5">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="generate_responses">Generate Responses</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="tables">Tables</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      </TabsList>

      {/* Generate Responses Tab Content */}
      <TabsContent value="generate_responses">
        <div className="p-8">
            {/* Fixed Side-by-Side Layout */}
            <div className="flex rounded-md gap-4">
              {/* Left Panel - Form */}
              <div className="flex-1 flex flex-col p-8 border border-gray-300 rounded-2xl overflow-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Generate Required Response
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                  <div
                    className="w-full h-[300px] border border-gray-300 rounded-2xl overflow-hidden bg-white flex items-center justify-center"
                  >
                    {previewSource ? (
                      <img
                        src={previewSource}
                        alt="Image Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-white"></div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700">
                      Image URL
                    </Label>
                    <Input
                      type="url"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 text-white bg-black focus:ring-2 focus:ring-grey-500 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {loading ? 'Generating...' : 'Generate Reply'}
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 px-4 py-3 border border-black text-black focus:ring-2 focus:ring-grey-500 rounded-md shadow-sm transition"
                        >
                          Upload Image
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md p-6">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-semibold text-gray-800">
                            Upload Review Image
                          </DialogTitle>
                          <DialogDescription className="mt-2 text-gray-600">
                            Upload a local image file to generate a reply.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                          <div>
                            <Label htmlFor="uploadImageUrl" className="block text-lg font-medium text-gray-700">
                              Image URL
                            </Label>
                            <Input
                              type="url"
                              id="uploadImageUrl"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          {/* Optional: Add file input for uploading local images */}
                          <div>
                            <Label htmlFor="localImage" className="block text-lg font-medium text-gray-700">
                              Or Upload Image
                            </Label>
                            <input
                              type="file"
                              id="localImage"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setLocalImage(e.target.files[0]);
                                }
                              }}
                              className="mt-2 w-full"
                            />
                          </div>

                          <DialogFooter className="flex justify-end space-x-3">
                            <Button
                              type="submit"
                              disabled={loading}
                              onClick={() => setIsDialogOpen(false)}
                              className="px-4 py-2 text-white bg-black focus:ring-2 focus:ring-grey-500 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                              Submit
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => setIsDialogOpen(false)}
                              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 text-gray-700 rounded-md shadow-sm transition"
                            >
                              Cancel
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>

                {error && (
                  <Alert variant="destructive" className="mt-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Right Panel - Response */}
              <div className="relative flex-1 flex flex-col p-8 bg-white border border-gray-300 rounded-2xl overflow-auto">
              {/* Fixed Top-Right Icon */}
              <div className="absolute top-8 right-8 flex-shrink-0">
                <FcGoogle size={36} />
              </div>
                {loading && (
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
                )}

                {!loading && response && (
                  <div className="relative space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Review by {response.reviewer_name}
                      </h2>
                      <h3 className="text-xl font-semibold text-gray-700">
                        {response.number_of_stars_in_emoji}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">Review:</h3>
                        <p className="text-gray-600 mt-1">{response.review_itself}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                          Response:
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              navigator.clipboard.writeText(response.response).then(() => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              });
                            }}
                            className="ml-3 p-1 text-gray-500 hover:text-gray-700 transition"
                            aria-label="Copy response"
                          >
                            <Copy className="h-5 w-5" />
                          </Button>
                        </h3>
                        <p className="text-gray-600 mt-1 break-words">{response.response}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-700">Sentiment:</h3>
                        <span
                          className="inline-block font-bold px-3 py-1 rounded-full"
                          style={{ color: response.color_of_sentiment_in_hex_code }}
                        >
                          {response.sentiment_of_review}
                        </span>

                      </div>

                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-700">Place:</h3>
                        <p className="text-gray-600">{response.place}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-700">Learning from the Review:</h3>
                        <p className="text-gray-600 mt-1">{response.learning_from_the_reviewers_review}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && !response && !error && (
                  <div className="flex items-center justify-center h-full text-center text-gray-500 px-4">
                    <p className="text-lg">
                      Enter an image URL or upload an image to generate a reply.
                    </p>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="mt-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
        </div>
      </TabsContent>

      {/* History Tab Content */}
      <TabsContent value="history">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {historyLoading ? (
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
            ) : historyError ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{historyError}</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {prompts.length > 0 ? (
                  prompts.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-2xl border border-gray-300 overflow-hidden flex flex-col transition-transform transform hover:scale-105"
                    >
                      {/* Review Header */}
                      <div className="p-4 flex justify-between items-start ">
                        {/* Left Side: Stars and Reviewer Info */}
                        <div className="flex flex-col">
                          {/* Stars and Name */}
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {review.reviewer_name}
                            </h3>
                            <span className="text-yellow-500">{review.stars}</span>
                          </div>

                          {/* Date and Sentiment */}
                          <div className="flex items-center space-x-2 mt-1">
                            {/* Date */}
                            <p className="text-sm text-gray-500">
                              {review.createdAt
                                ? new Intl.DateTimeFormat('en-US', {
                                    dateStyle: 'short',
                                    timeStyle: 'short',
                                  }).format(new Date(review.createdAt))
                                : 'Unknown Date'}
                            </p>

                            {/* Sentiment */}
                            <span
                              className="font-semibold text-sm"
                              style={{ color: review.colorofthesentiment }}
                            >
                              {review.sentiment}
                            </span>
                          </div>
                        </div>

                        {/* Right Side: Google Logo */}
                        <div className="flex-shrink-0">
                          <FcGoogle size={30} />
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="p-4 flex-1">
                        <p className="text-gray-700 line-clamp-4">{review.review_itself}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No history available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      {/* Tables Tab Content */}
      <TabsContent value="tables">
        <div className="p-8">
          <div className="w-full">
            {/* Filter and Columns Dropdown */}
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter by Reviewer Name..."
                value={(table.getColumn('reviewer_name')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('reviewer_name')?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id.replace(/_/g, ' ')}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table Rendering */}
            {tableLoading ? (
              <div className="flex items-center justify-center h-64">
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
            ) : tableError ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{tableError}</AlertDescription>
              </Alert>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
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
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
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
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination Controls */}
            {!tableLoading && !tableError && tableData.length > 0 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{' '}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      {/* Dashboard Tab Content */}
      <TabsContent value="dashboard">
        {/* Dashboard content goes here */}
        <div className="p-8">
          <p className="text-gray-600">Dashboard content is under construction.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
