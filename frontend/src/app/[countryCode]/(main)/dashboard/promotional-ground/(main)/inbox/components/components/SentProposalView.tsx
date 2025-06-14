"use client";

import React from "react";
import {
  Edit,
  Trash,
  Share2,
  Users,
  Copy,
  Info,
  Package as PackageIcon,
  CalendarDays,
  Tag,
  Clock,
  CheckSquare,
  FileText, // For Content Type/Format
  Megaphone, // For Content Promo
  Handshake, // For Negotiated
  ListChecks,
  UserCircle2 // Fallback avatar icon
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"; // Adjust path as needed
import { useTimelineContext, Proposal } from "../../context/TimelineContext"; // Path from user
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SentProposalViewProps {
  message: {
    text: string;
    type: "proposal" | "message";
    sentAt?: string; // ISO date string is recommended
  };
  senderName: string; // Added sender's name
  senderAvatarUrl?: string; // Added optional sender's avatar URL
}

const SentProposalView: React.FC<SentProposalViewProps> = ({ message, senderName, senderAvatarUrl }) => {
  const { setProposal } = useTimelineContext();

  const sentAtDate = message.sentAt ? new Date(message.sentAt) : new Date();
  const formattedSentAtDisplay = sentAtDate.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const defaultDetails: Omit<Proposal, "text"> = {
    senderName: "Adete Dahiya",
    date: sentAtDate.toISOString(), // Store as ISO string for consistency
    proposalVerified: false,
    services: [
      { name: "Instagram", logoUrl: "", amount: 150 },
      { name: "Facebook", logoUrl: "", amount: 200 },
      
    ],
    status: "Pending",
    proposalType: "Package",
    packageNegotiated: true,
    contentPromotion: true,
    contentType: "separate post",
    timeForPost: "72 Hours",
  };

  const proposal: Proposal = { text: message.text, ...defaultDetails };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const proposalDetailsConfig = [
    {
      label: "Status",
      icon: <Tag className="w-3.5 h-3.5" />,
      render: () => <Badge variant={getStatusBadgeVariant(proposal.status)} className="text-xs px-1.5 py-0 h-5 ml-1">{proposal.status}</Badge>,
    },
    {
      label: "Type",
      icon: <PackageIcon className="w-3.5 h-3.5" />,
      render: () => <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 ml-1">{proposal.proposalType}</Badge>,
    },
    { label: "Post Time", value: proposal.timeForPost, icon: <Clock className="w-3.5 h-3.5" /> },
    {
      label: "Verified",
      icon: <CheckSquare className="w-3.5 h-3.5" />,
      render: () => proposal.proposalVerified ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>,
    },
    {
      label: "Negotiated",
      icon: <Handshake className="w-3.5 h-3.5" />,
      render: () => proposal.packageNegotiated ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>,
    },
    {
      label: "Promo",
      icon: <Megaphone className="w-3.5 h-3.5" />,
      render: () => proposal.contentPromotion ? <span className="text-green-600 font-medium">Enabled</span> : <span className="text-red-600 font-medium">Disabled</span>,
    },
    {
      label: "Format",
      value: proposal.contentType === "normal" ? "Influencer Content" : "Separate Post",
      icon: <FileText className="w-3.5 h-3.5" />,
    },
  ];

  const handleViewDetails = () => setProposal(proposal);
  const handleEdit = () => console.log("Edit Proposal:", proposal);
  const handleDelete = () => console.log("Delete Proposal:", proposal);
  const handleShare = () => console.log("Share Proposal:", proposal);
  const handleAddCollaborator = () => console.log("Add Collaborator:", proposal);
  const handleDuplicate = () => console.log("Duplicate Proposal:", proposal);

  // Get initials for Avatar Fallback
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };


  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex justify-end">
          {/* Updated Card's max-width for sm screens and up */}
          <Card className="max-w-xs sm:max-w-[22rem] ml-auto cursor-pointer hover:shadow-md transition-shadow duration-200 border-border rounded-2xl">
            <CardHeader className="rounded-t-2xl p-3 bg-gray-50">
              <div className="flex justify-between items-start">
                {/* Updated CardTitle to show Avatar and Sender Name */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10 shadow-2xl border border-white/30 bg-white/10 backdrop-blur-lg rounded-full ring-2 ring-white/20">
                    <AvatarImage src="https://yt3.googleusercontent.com/5FavwUVGBG9Mv2HoJNU0GtoieCc4caddkY8KPa2mH1G0r1gNdr0Ap2ltUymDW2udoPGcqZDCz2U=s160-c-k-c0x00ffffff-no-rj" alt={senderName} />
                    <AvatarFallback className="text-xs">
                      {senderAvatarUrl ? getInitials(senderName) : <UserCircle2 className="h-4 w-4" />}
                    </AvatarFallback>
                    </Avatar>
                  <CardTitle className="text-base text-card-foreground leading-tight">
                    {senderName}
                  </CardTitle>
                </div>
                <span className="text-xs text-muted-foreground pt-3 whitespace-nowrap">{formattedSentAtDisplay}</span>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-x-3 gap-y-3 mb-2.5">
                {proposalDetailsConfig.map((item, index) => (
                  <div key={index} className="text-xs flex items-center" title={`${item.label}: ${item.value || proposal[item.label.toLowerCase().replace(/\s+/g, '') as keyof Proposal] || ''}`}>
                    {item.icon && React.cloneElement(item.icon, { className: `${item.icon.props.className || ''} mr-1.5 text-muted-foreground flex-shrink-0` })}
                    <span className="text-muted-foreground whitespace-nowrap ">{item.label}:</span>
                    <span className="ml-1 font-medium text-foreground truncate">
                      {item.render ? item.render() : String(item.value)}
                    </span>
                  </div>
                ))}
              </div>

              {proposal.services && proposal.services.length > 0 && (
                <>
                  <p className="text-xs font-medium text-muted-foreground mb-3 mt-2 flex items-center">
                    <ListChecks className="w-4 h-4 mr-1.5 flex-shrink-0"/>Services:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proposal.services.map((service, index) => (
                      <Badge
                        key={index}
                        variant="outline" // Use outline and apply custom bg/text/border
                        className={`h-auto px-2.5 py-1.5 border transition-all duration-200 ease-in-out group flex items-center space-x-1.5 transform`}
                      >
                        {service.name.toLowerCase().includes("instagram") ? (
                          <FaInstagram className="w-3.5 h-3.5 flex-shrink-0" /> // Color will be inherited from parent Badge's text color
                        ) : service.name.toLowerCase().includes("facebook") ? (
                          <FaFacebook className="w-3.5 h-3.5 flex-shrink-0" /> // Color will be inherited
                        ) : service.logoUrl ? (
                          <Avatar className="w-4 h-4"> {/* Slightly larger avatar for better visibility */}
                            <AvatarImage src={service.logoUrl} alt={service.name} />
                            <AvatarFallback className="text-[0.6rem]">{service.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <PackageIcon className="w-3.5 h-3.5 flex-shrink-0" /> // Color will be inherited
                        )}
                        <span className="text-xs font-medium truncate">
                          {service.name}
                        </span>
                        <span className="text-xs font-bold"> {/* Amount color will be inherited */}
                          ${typeof service.amount === 'number' ? service.amount.toFixed(2) : parseFloat(service.amount as string).toFixed(2)}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56"> {/* Adjusted width */}
        <ContextMenuItem onSelect={handleViewDetails} className="cursor-pointer group">
          <Info className="mr-2 h-4 w-4 text-black group-hover:text-blue-600" />
          View Full Details
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={handleEdit} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit Proposal
        </ContextMenuItem>
        <ContextMenuItem onSelect={handleDuplicate} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem onSelect={handleShare} className="cursor-pointer">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </ContextMenuItem>
        <ContextMenuItem onSelect={handleAddCollaborator} className="cursor-pointer">
          <Users className="mr-2 h-4 w-4" />
          Add Collaborator
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={handleDelete}
          className="cursor-pointer text-destructive hover:!text-destructive focus:!text-destructive group"
        >
          <Trash className="mr-2 h-4 w-4 text-destructive group-hover:text-destructive" />
          Delete Proposal
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SentProposalView;
