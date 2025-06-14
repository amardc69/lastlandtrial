// app/dashboard/business-operations/google-reviews/page.tsx
"use client"
import React, { useState, ChangeEvent } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar";
import TimePicker from 'react-time-picker';
import { 
  ChevronDown, 
  Share, 
  Edit, 
  Trash, 
  Plus, 
  CheckCircle, 
  Info 
} from "lucide-react" // or another icon library

/* 
  ================================================================
  ===========           STYLES & FAKE DATA              ============
  ================================================================
  - Basic utility classes for black-white-gray theme
  - Fake data placeholders
*/

const containerStyles = "p-6 bg-white text-gray-800 min-h-screen"
const headingStyles = "text-2xl md:text-3xl font-bold text-black"
const subheadingStyles = "text-gray-600 text-sm md:text-base"

const sampleScheduledPosts = [
  {
    id: 1,
    platform: "Google",
    content: "Thanks for checking out our new product line!",
    date: "2024-01-15",
    time: "09:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    platform: "Facebook",
    content: "Announcing a new partnership with XYZ Corp",
    date: "2024-01-16",
    time: "02:30 PM",
    status: "Draft",
  },
  {
    id: 3,
    platform: "Instagram",
    content: "Sneak peek of our upcoming product photoshoot",
    date: "2024-01-17",
    time: "06:45 PM",
    status: "Published",
  },
]

const analyticsData = [
  { name: "Google", engagement: 70 },
  { name: "Facebook", engagement: 50 },
  { name: "Twitter", engagement: 80 },
  { name: "Instagram", engagement: 90 },
  { name: "LinkedIn", engagement: 40 },
  { name: "TikTok", engagement: 65 },
  { name: "Pinterest", engagement: 30 },
]

/* 
  ================================================================
  ===========    MAIN PAGE COMPONENT (20+ features)    ============
  ================================================================
*/
export default function SocialMediaManagementPage() {
  // States & Effects
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)
  const [scheduledPosts, setScheduledPosts] = React.useState(sampleScheduledPosts)
  const [selectedPlatform, setSelectedPlatform] = React.useState("google")
  const [postContent, setPostContent] = React.useState("")
  const [loadingAI, setLoadingAI] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("pinterest")
  const [showDialog, setShowDialog] = React.useState(false)

  // Missing states for the Pinterest panel
  const [publishLater, setPublishLater] = React.useState(false)
  const [scheduledDate, setScheduledDate] = React.useState("")
  const [scheduledTime, setScheduledTime] = React.useState("")
  const [allowComments, setAllowComments] = React.useState(false)
  const [showSimilarProducts, setShowSimilarProducts] = React.useState(false)
  const [preview, setPreview] = useState<string | null>(null); // Allow string or null

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result); // Ensure result is a string
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      alert("Please upload a valid image file (JPG, JPEG, or PNG).");
    }
  };

  // Basic collapsible state used in More Options
  const [isOpen, setIsOpen] = React.useState(false)

  // Simulate AI content generation
  async function handleGenerateContent() {
    setLoadingAI(true)
    setTimeout(() => {
      // Fake AI response
      const capitalizedPlatform =
        selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
      setPostContent(
        `AI-Generated Post for ${capitalizedPlatform}: "Experience the best of innovation and quality with our newest launch!"`
      )
      setLoadingAI(false)
    }, 1500)
  }

  // Add new scheduled post
  function handleAddScheduledPost() {
    const newPost = {
      id: scheduledPosts.length + 1,
      platform: selectedPlatform,
      content: postContent,
      date: "2024-02-01",
      time: "10:00 AM",
      status: "Scheduled",
    }
    setScheduledPosts([...scheduledPosts, newPost])
    setPostContent("")
  }

  // Delete a scheduled post
  function handleDeleteScheduledPost(id: number) {
    const updated = scheduledPosts.filter((post) => post.id !== id)
    setScheduledPosts(updated)
  }

  // Switch tab
  function handleTabChange(value: string) {
    setActiveTab(value)
  }

  // Pinterest form submission
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Your form submission logic here (e.g. uploading the pin or scheduling it)
    console.log("Submitting Pinterest form...")
  }

  return (
    <div className="p-4"> {/* Fallback for containerStyles */}
      {/*======================== PAGE HEADER =========================*/}
      <Card className="mb-6 bg-white rounded-3xl border border-gray-300">
        <CardHeader>
          <CardTitle className="text-3xl text-gray-800">
            Social Media Posts Manager
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Manage, schedule, and analyze posts across various platforms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/*======================== MAIN TABS ===========================*/}
          <Tabs
            defaultValue="pinterest"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/*=== TABS LIST (PLATFORMS) ===*/}
            <TabsList className="grid grid-cols-5 bg-gray-200 rounded-t-lg">
              <TabsTrigger
                value="pinterest"
                className="text-gray-700 focus:bg-gray-300"
              >
                Pinterest
              </TabsTrigger>
              <TabsTrigger
                value="facebook"
                className="text-gray-700 focus:bg-gray-300"
              >
                Facebook
              </TabsTrigger>
              <TabsTrigger
                value="twitter"
                className="text-gray-700 focus:bg-gray-300"
              >
                Twitter
              </TabsTrigger>
              <TabsTrigger
                value="instagram"
                className="text-gray-700 focus:bg-gray-300"
              >
                Instagram
              </TabsTrigger>
              <TabsTrigger
                value="linkedin"
                className="text-gray-700 focus:bg-gray-300"
              >
                LinkedIn
              </TabsTrigger>
            </TabsList>

            {/*-----------------------------------------------------------------*/}
            {/*==================== PINTEREST PANEL ============================*/}
            {/*-----------------------------------------------------------------*/}
            <TabsContent value="pinterest">
              <Card className="mt-4 shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">
                    Pinterest Management
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pin images, schedule boards, and track analytics.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Image upload / drag & drop */}
                    <div className="flex-1 flex flex-col">
                      <label className="font-medium block mb-2">
                        Choose a file or drag and drop it here
                      </label>
                      <div className="relative border-dashed border-2 border-gray-300 bg-gray-100 rounded-2xl p-6 h-72 flex flex-col items-center justify-center text-center flex-grow">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleFileChange}
                        />
                        {preview ? (
                          <img
                            src={preview}
                            alt="Uploaded Preview"
                            className="absolute inset-0 w-full h-full object-contain rounded-2xl"
                          />
                        ) : (
                          <span className="text-sm text-gray-500">
                            We recommend using high-quality .jpg files less than 20 MB.
                          </span>
                        )}
                      </div>
                      <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-2xl shadow-md hover:bg-blue-600">
                        Generate Content
                      </button>
                    </div>

                    {/* Right: Form */}
                    <div className="flex-1 space-y-6">
                      <form className="space-y-6" onSubmit={onSubmit}>
                        {/* Title */}
                        <div>
                          <label
                            htmlFor="title"
                            className="font-medium block mb-2"
                          >
                            Title
                          </label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Add a title"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label
                            htmlFor="description"
                            className="font-medium block mb-2"
                          >
                            Description
                          </label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Add a detailed description"
                          />
                        </div>

                        {/* Link */}
                        <div>
                          <label
                            htmlFor="link"
                            className="font-medium block mb-2"
                          >
                            Link
                          </label>
                          <Input id="link" name="link" placeholder="Add a link" />
                        </div>

                        {/* Board selection */}
                        <div>
                          <label
                            className="font-medium block mb-2"
                            htmlFor="board"
                          >
                            Board
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a board" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="board1">Board 1</SelectItem>
                              <SelectItem value="board2">Board 2</SelectItem>
                              <SelectItem value="board3">Board 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Tags */}
                        <div>
                          <label
                            htmlFor="tags"
                            className="font-medium block mb-2"
                          >
                            Tagged Topics
                          </label>
                          <Input
                            id="tags"
                            name="tags"
                            placeholder="Search or add tags"
                          />
                        </div>

                        {/* Publish at a later date */}
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="publishLater"
                            className="font-medium"
                          >
                            Publish at a later date
                          </label>
                          <Switch
                            id="publishLater"
                            name="publishLater"
                            checked={publishLater}
                            onCheckedChange={(checked) =>
                              setPublishLater(checked)
                            }
                          />
                        </div>

                        {/* Date/Time inputs (only show if publishLater is true) */}
                        {publishLater && (
                          <div className="flex flex-wrap gap-4">
                            <div>
                              <label
                                htmlFor="scheduledDate"
                                className="font-medium block mb-2"
                              >
                                Date
                              </label>
                              <Input
                                type="date"
                                id="scheduledDate"
                                name="scheduledDate"
                                value={scheduledDate}
                                onChange={(e) =>
                                  setScheduledDate(e.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="scheduledTime"
                                className="font-medium block mb-2"
                              >
                                Time
                              </label>
                              <Input
                                type="time"
                                id="scheduledTime"
                                name="scheduledTime"
                                value={scheduledTime}
                                onChange={(e) =>
                                  setScheduledTime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        )}

                        {/* More options collapsible */}
                        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="outline"
                              type="button"
                              className="w-full"
                            >
                              More options
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-4 space-y-4">
                            {/* Allow people to comment */}
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="allowComments"
                                className="font-medium"
                              >
                                Allow people to comment
                              </label>
                              <Switch
                                id="allowComments"
                                name="allowComments"
                                checked={allowComments}
                                onCheckedChange={(checked) =>
                                  setAllowComments(checked)
                                }
                              />
                            </div>

                            {/* Show similar products */}
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="showSimilarProducts"
                                className="font-medium"
                              >
                                Show similar products
                              </label>
                              <Switch
                                id="showSimilarProducts"
                                name="showSimilarProducts"
                                checked={showSimilarProducts}
                                onCheckedChange={(checked) =>
                                  setShowSimilarProducts(checked)
                                }
                              />
                            </div>
                            {showSimilarProducts && (
                              <p className="text-sm text-gray-600">
                                People can shop products similar to what&apos;s
                                shown in this Pin using visual search. Shopping
                                recommendations aren&apos;t available for Idea
                                ads and Pins with tagged products or paid
                                partnership label.
                              </p>
                            )}
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Submit */}
                        <Button
                          type="submit"
                          className="bg-red-500 hover:bg-red-600 rounded-2xl"
                        >
                          Publish
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

        {/*-----------------------------------------------------------------*/}
        {/*====================== FACEBOOK PANEL ===========================*/}
        {/*-----------------------------------------------------------------*/}
        <TabsContent value="facebook">
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Facebook Management</CardTitle>
              <CardDescription className="text-gray-600">
                Manage Facebook page, ads, and campaigns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
            </CardContent>
          </Card>
        </TabsContent>

        {/*-----------------------------------------------------------------*/}
        {/*====================== TWITTER PANEL ============================*/}
        {/*-----------------------------------------------------------------*/}
        <TabsContent value="twitter">
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Twitter Management</CardTitle>
              <CardDescription className="text-gray-600">
                Automate tweets and monitor mentions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
            </CardContent>
          </Card>
        </TabsContent>

        {/*-----------------------------------------------------------------*/}
        {/*==================== INSTAGRAM PANEL ============================*/}
        {/*-----------------------------------------------------------------*/}
        <TabsContent value="instagram">
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Instagram Management</CardTitle>
              <CardDescription className="text-gray-600">
                Schedule posts, reels, and stories ahead of time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
            </CardContent>
          </Card>
        </TabsContent>

        {/*-----------------------------------------------------------------*/}
        {/*==================== LINKEDIN PANEL =============================*/}
        {/*-----------------------------------------------------------------*/}
        <TabsContent value="linkedin">
          <Card className="mt-4 shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">LinkedIn Management</CardTitle>
              <CardDescription className="text-gray-600">
                Maintain a strong professional presence.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      {/*======================== SCHEDULED POSTS LIST ======================*/}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-black">Scheduled Posts</h2>
        <p className="text-gray-700">
          Review your scheduled posts across platforms.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="py-2 px-4">Platform</th>
                <th className="py-2 px-4">Content</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100">
                  <td className="py-2 px-4">{post.platform}</td>
                  <td className="py-2 px-4">{post.content}</td>
                  <td className="py-2 px-4">{post.date}</td>
                  <td className="py-2 px-4">{post.time}</td>
                  <td className="py-2 px-4">
                    <Badge variant="outline" className="text-black border-black">
                      {post.status}
                    </Badge>
                  </td>
                  <td className="py-2 px-4">
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteScheduledPost(post.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </CardContent>
      </Card>
    </div>
  )
}
