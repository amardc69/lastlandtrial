// app/dashboard/business-operations/seo-blogs/page.tsx
"use client";
import React, { useState, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Download, Share2, Edit, Trash2, X, Info } from "lucide-react";

interface BlogContent {
  title: string;
  introduction: string;
  body: Array<{
    heading: string;
    content: string;
  }>;
  conclusion: string;
  imageSuggestions: string[]; // New property for image suggestions
  metadata: {
    keywords: string[];
    author: string;
    publish_date: string;
    meta_description: string;
    focus_keyword: string;
    meta_title: string;
  };
}


interface HistoryItem {
  id: number;
  topic: string;
  generatedAt: string;
}

export default function SEOBlogsPage() {
  const [topic, setTopic] = useState("");
  const [activeTab, setActiveTab] = useState("generate");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [imageSuggestions, setImageSuggestions] = useState<string[]>([]);
  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [tone, setTone] = useState("Formal");
  const [wordCount, setWordCount] = useState(1000);
  const [includeImages, setIncludeImages] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [multiLanguage, setMultiLanguage] = useState(false);
  const [language, setLanguage] = useState("English");
  const [seoScore, setSeoScore] = useState<number | null>(null);
  const [blog, setBlog] = useState<BlogContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBlog(null);
    setSeoScore(null);
    try {
      const response = await axios.post("/api/dashboard/business-operations/seo-blogs", {
        topic,
        category,
        tags,
        targetAudience,
        metaDescription,
        focusKeyword,
        metaTitle,
        tone,
        wordCount,
        language: multiLanguage ? language : "English",
      });
      if (response.status === 200) {
        setBlog(response.data);
        const simulatedScore = Math.floor(Math.random() * 26) + 75;
        setSeoScore(simulatedScore);
        setActiveTab("preview");
      } else {
        setError(response.data.error || "An unexpected error occurred.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (blog) {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(blog, null, 2)], { type: "application/json" });
      element.href = URL.createObjectURL(file);
      element.download = `${blog.title}.json`;
      document.body.appendChild(element);
      element.click();
    }
  }

  function handleShare() {
    if (blog) {
      navigator
        .share({
          title: blog.title,
          text: blog.introduction,
          url: window.location.href,
        })
        .catch(() => {
          setError("Unable to share the blog.");
        });
    }
  }

  return (
    <div className="container mx-auto min-h-screen bg-white">
      <Card className="bg-white rounded-2xl border border-gray-300">
        <CardHeader>
          <CardTitle className="text-3xl text-black">SEO Blog Generator</CardTitle>
          <CardDescription className="text-sm text-gray-500">Create comprehensive SEO blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-white">
            <TabsList className="grid grid-cols-4 bg-gray-200 rounded-t-lg">
              <TabsTrigger value="generate" className="text-black focus:bg-gray-300">
                Generate Blog
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-black focus:bg-gray-300">
                Preview
              </TabsTrigger>
              <TabsTrigger value="history" className="text-black focus:bg-gray-300">
                History
              </TabsTrigger>
              <TabsTrigger value="table" className="text-black focus:bg-gray-300">
                Table
              </TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="p-4 bg-white rounded-b-lg">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="topic" className="mb-2 text-black">
                      Blog Topic
                    </Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      placeholder="e.g., The Future of AI in Healthcare"
                      className="text-black bg-white"
                    />
                  </div>
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="category" className="mb-2 text-black">
                      Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="text-black bg-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="text-black bg-white">
                        <SelectItem value="technology" className="text-black bg-white">
                          Technology
                        </SelectItem>
                        <SelectItem value="healthcare" className="text-black bg-white">
                          Healthcare
                        </SelectItem>
                        <SelectItem value="finance" className="text-black bg-white">
                          Finance
                        </SelectItem>
                        <SelectItem value="education" className="text-black bg-white">
                          Education
                        </SelectItem>
                        <SelectItem value="marketing" className="text-black bg-white">
                          Marketing
                        </SelectItem>
                        <SelectItem value="lifestyle" className="text-black bg-white">
                          Lifestyle
                        </SelectItem>
                        <SelectItem value="travel" className="text-black bg-white">
                          Travel
                        </SelectItem>
                        <SelectItem value="entertainment" className="text-black bg-white">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="food" className="text-black bg-white">
                          Food
                        </SelectItem>
                        <SelectItem value="personal-development" className="text-black bg-white">
                          Personal Development
                        </SelectItem>
                        <SelectItem value="business" className="text-black bg-white">
                          Business
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="tags" className="mb-2 text-black">
                      Tags
                    </Label>
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Add several tags"
                      className="text-black bg-white"
                    />
                  </div>
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="targetAudience" className="mb-2 text-black">
                      Target Audience
                    </Label>
                    <Input
                      id="targetAudience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g., Healthcare Professionals"
                      className="text-black bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="metaDescription" className="mb-2 text-black flex items-center">
                      Meta Description
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-black rounded-full cursor-pointer">
                            <Info className="h-3 w-3" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="text-black bg-white border border-gray-300">
                          Provide a brief description of your blog post.
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Textarea
                      id="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="A brief description of your blog post."
                      className="text-black bg-white"
                    />
                  </div>
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="metaTitle" className="mb-2 text-black flex items-center">
                      Meta Title
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-black rounded-full cursor-pointer">
                            <Info className="h-3 w-3" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="text-black bg-white border border-gray-300">
                          Enter a concise title for SEO.
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="e.g., The Future of AI in Healthcare"
                      className="text-black bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="focusKeyword" className="mb-2 text-black">
                      Focus Keyword
                    </Label>
                    <Input
                      id="focusKeyword"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g., AI in Healthcare"
                      className="text-black bg-white"
                    />
                  </div>
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="tone" className="mb-2 text-black">
                      Tone/Style
                    </Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="text-black bg-white">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="text-black bg-white">
                        <SelectItem value="Formal" className="text-black bg-white">
                          Formal
                        </SelectItem>
                        <SelectItem value="Casual" className="text-black bg-white">
                          Casual
                        </SelectItem>
                        <SelectItem value="Persuasive" className="text-black bg-white">
                          Persuasive
                        </SelectItem>
                        <SelectItem value="Informative" className="text-black bg-white">
                          Informative
                        </SelectItem>
                        <SelectItem value="Humorous" className="text-black bg-white">
                          Humorous
                        </SelectItem>
                        <SelectItem value="Inspirational" className="text-black bg-white">
                          Inspirational
                        </SelectItem>
                        <SelectItem value="Conversational" className="text-black bg-white">
                          Conversational
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="wordCount" className="mb-2 text-black">
                      Word Count
                    </Label>
                    <Input
                      type="number"
                      id="wordCount"
                      value={wordCount}
                      onChange={(e) => setWordCount(parseInt(e.target.value))}
                      min={500}
                      max={2000}
                      className="text-black bg-white"
                    />
                  </div>
                  <div className="flex flex-col bg-white">
                    <Label htmlFor="language" className="mb-2 text-black">
                      Language
                    </Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="text-black bg-white">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent className="text-black bg-white">
                        <SelectItem value="English" className="text-black bg-white">
                          English
                        </SelectItem>
                        <SelectItem value="Spanish" className="text-black bg-white">
                          Spanish
                        </SelectItem>
                        <SelectItem value="French" className="text-black bg-white">
                          French
                        </SelectItem>
                        <SelectItem value="German" className="text-black bg-white">
                          German
                        </SelectItem>
                        <SelectItem value="Chinese" className="text-black bg-white">
                          Chinese
                        </SelectItem>
                        <SelectItem value="Japanese" className="text-black bg-white">
                          Japanese
                        </SelectItem>
                        <SelectItem value="Portuguese" className="text-black bg-white">
                          Portuguese
                        </SelectItem>
                        <SelectItem value="Russian" className="text-black bg-white">
                          Russian
                        </SelectItem>
                        <SelectItem value="Arabic" className="text-black bg-white">
                          Arabic
                        </SelectItem>
                        <SelectItem value="Hindi" className="text-black bg-white">
                          Hindi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 bg-white">
                  <div className="flex items-center bg-white">
                    <Checkbox
                      id="autoSave"
                      checked={autoSave}
                      onCheckedChange={(checked: boolean) => setAutoSave(checked)}
                      className="mr-2 text-black"
                    />
                    <Label htmlFor="autoSave" className="text-black">
                      Auto-save to History
                    </Label>
                  </div>
                  <div className="flex items-center mt-6 md:mt-0 bg-white">
                    <Checkbox
                      id="includeImages"
                      checked={includeImages}
                      onCheckedChange={(checked: boolean) => setIncludeImages(checked)}
                      className="mr-2 text-black"
                    />
                    <Label htmlFor="includeImages" className="text-black">
                      Include Image Suggestions
                    </Label>
                  </div>
                  <div className="flex items-center mt-6 md:mt-0 bg-white">
                    <Checkbox id="enablePreview" checked={blog !== null} onCheckedChange={() => {}} disabled className="mr-2 text-black" />
                    <Label htmlFor="enablePreview" className="text-black">
                      Preview Available
                    </Label>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full flex justify-center bg-black text-white hover:bg-gray-700">
                  {loading ? (
                    <div className="flex items-center space-x-2 bg-black text-white">
                      <Loader2 className="animate-spin h-5 w-5 text-white" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    "Generate Blog"
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="preview" className="p-4 rounded-b-lg">
              {blog && (
                <Card className="mb-6 bg-white shadow-inner rounded-lg border border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-black">{blog.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">By {blog.metadata.author} on {blog.metadata.publish_date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {seoScore !== null && (
                      <div className="mb-4 bg-white">
                        <Label className="text-black">SEO Score:</Label>
                        <div className="flex items-center mt-1 bg-white">
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className={
                                "h-4 rounded-full " +
                                (seoScore > 80
                                  ? "bg-green-500"
                                  : seoScore > 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500")
                              }
                              style={{ width: `${seoScore}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-black">{seoScore}/100</span>
                        </div>
                      </div>
                    )}
                    <section className="mb-6 bg-white">
                      <h2 className="text-xl font-semibold text-black mb-2">Introduction</h2>
                      <p className="text-black">{blog.introduction}</p>
                    </section>
                    {blog.body.map((section, index) => (
                      <section key={index} className="mb-6 bg-white">
                        <h3 className="text-lg font-semibold text-black mb-1">{section.heading}</h3>
                        <p className="text-black">{section.content}</p>
                      </section>
                    ))}
                    <section className="mb-6 bg-white">
                      <h2 className="text-xl font-semibold text-black mb-2">Conclusion</h2>
                      <p className="text-black">{blog.conclusion}</p>
                    </section>
                    <section className="mt-8 bg-white">
                      <h4 className="text-lg font-semibold text-black mb-2">Metadata</h4>
                      <ul className="list-disc list-inside text-gray-800">
                        <li>
                          <span className="text-gray-800">Author: {blog.metadata.author}</span>
                        </li>
                        <li>
                          <span className="text-gray-800">Publish Date: {blog.metadata.publish_date}</span>
                        </li>
                        <li>
                          <span className="text-gray-800">Keywords: {blog.metadata.keywords.join(", ")}</span>
                        </li>
                        <li>
                          <span className="text-gray-800">Meta Description: {blog.metadata.meta_description}</span>
                        </li>
                        <li>
                          <span className="text-gray-800">Focus Keyword: {blog.metadata.focus_keyword}</span>
                        </li>
                        <li>
                          <span className="text-gray-800">Meta Title: {blog.metadata.meta_title}</span>
                        </li>
                      </ul>
                      <h4 className="text-lg font-semibold text-black mt-4 mb-2">Image Suggestions</h4>
                      <ul className="list-disc list-inside text-gray-800">
                        {blog.imageSuggestions.map((suggestion, index) => (
                          <li key={index}>
                            <span className="text-gray-800">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </CardContent>
                  <CardFooter className="flex space-x-4">
                    <Button variant="secondary" onClick={() => setActiveTab('generate')} className="flex items-center bg-white text-black border border-gray-300 hover:bg-gray-200">
                      <Edit className="mr-2 h-4 w-4" /> Generate Another
                    </Button>
                    <Button variant="outline" onClick={handleDownload} className="flex items-center bg-white text-black border border-gray-300 hover:bg-gray-200">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button variant="ghost" onClick={handleShare} className="flex items-center bg-white text-black hover:bg-gray-200">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="history" className="p-4 rounded-b-lg bg-white">
            </TabsContent>
            <TabsContent value="table" className="p-4 rounded-b-lg bg-white">
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {error && (
        <Card className="mb-6 bg-gray-100 border border-gray-300 rounded-lg">
          <CardContent className="bg-white">
            <p className="text-black">Error: {error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}