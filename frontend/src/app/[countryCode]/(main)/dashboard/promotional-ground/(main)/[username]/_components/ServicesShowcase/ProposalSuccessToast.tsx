import React from "react";
import { toast } from "sonner";
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaPinterest, FaLinkedin, FaTiktok, FaReddit } from "react-icons/fa";
import type { IconType } from "react-icons";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProposalSuccessToastProps } from "../interface";

const platformConfig: { [key: string]: { component: IconType; className: string } } = {
    youtube: { component: FaYoutube, className: "text-red-500" },
    instagram: { component: FaInstagram, className: "text-pink-500" },
    facebook: { component: FaFacebook, className: "text-blue-600" },
    tiktok: { component: FaTiktok, className: "text-neutral-900" },
    linkedin: { component: FaLinkedin, className: "text-sky-700" },
    twitter: { component: FaTwitter, className: "text-sky-500" },
    pinterest: { component: FaPinterest, className: "text-red-600" },
    reddit: { component: FaReddit, className: "text-orange-500" },
    default: { component: HelpCircle, className: "text-muted-foreground" },
};

export const PlatformIcon = ({ platform, size = 'md' }: { platform: string; size?: 'sm' | 'md' }) => {
    const config = platformConfig[platform.toLowerCase()] || platformConfig.default;
    const IconComponent = config.component;
    const sizeClass = size === 'sm' ? "w-4 h-4" : "w-5 h-5";
    return <IconComponent className={`${config.className} ${sizeClass}`} />;
};

export const ProposalSuccessToast: React.FC<ProposalSuccessToastProps> = ({
    selectedCards,
    finalTotal,
    toastId,
}) => {
    const platforms = Array.from(selectedCards.values()).map(item => item.platform);
    const uniquePlatforms = [...new Set(platforms)];

    const handleViewProject = () => {
        console.log("Navigating to project...");
        toast.dismiss(toastId);
    };

    return (
        <Card className="w-full max-w-md border border-gray-300 shadow-2xl">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                <CheckCircle2 className="h-7 w-7 text-green-500 mt-1" aria-hidden="true" />
                <div className="flex-1">
                    <CardTitle className="text-base font-semibold leading-tight">
                        Proposal Sent Successfully
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm">
                        Your proposal is now with the creator for review, please visit project page for updates.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="py-0">
                <Separator className="my-2" />
                <div className="space-y-3 py-2 text-sm">
                    <div className="flex items-start">
                        <span className="w-20 text-muted-foreground flex-shrink-0">Platforms</span>
                        <div className="flex flex-wrap items-center gap-2">
                            {uniquePlatforms.slice(0, 5).map(platform => (
                                <Badge key={platform} variant="secondary" className="font-normal capitalize">
                                    <div className="flex items-center gap-1.5">
                                        <PlatformIcon platform={platform} size="sm" />
                                        {platform}
                                    </div>
                                </Badge>
                            ))}
                            {uniquePlatforms.length > 5 && (
                               <Badge variant="outline" className="text-xs font-light tracking-wider">
                                    + {uniquePlatforms.length - 5} more
                               </Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="w-20 text-muted-foreground">Total Value</span>
                        <span className="font-bold text-base text-foreground">
                            ₹{finalTotal.toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2 p-4 pt-3 justify-end">
                <Button
                    size="sm"
                    variant="outline"
                    className="px-4 border-gray-300"
                    onClick={() => toast.dismiss(toastId)}
                >
                    Dismiss
                </Button>
                <Button size="sm" className="px-4" onClick={handleViewProject}>
                    View Project
                </Button>
            </CardFooter>
        </Card>
    );
};