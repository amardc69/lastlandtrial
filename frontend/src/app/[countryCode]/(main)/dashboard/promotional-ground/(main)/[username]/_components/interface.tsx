import { IconType } from "react-icons";

export interface SocialMediaLink {
  platform: string;
  icon: IconType;
  colorClass: string;
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  price: string;
  avatar: string;
  duration: string;
}

export interface UserProfile {
  username: string;
  isVerified: boolean;
  platforms?: string[] | null;
  collaboratedWith?: string[] | null;
  category?: string[] | null;
  followers?: string | null;
  following?: string | null;
  bio?: string | null;
  avatarurl?: string | null;
  name?: string | null;
}

export interface Fallbacks {
  name: string;
  avatar: string;
  bio: string;
}

export interface ProfileSectionProps {
  user: UserProfile;
  fallbacks: Fallbacks;
}

export interface ServicesShowcaseProps {
  user: {
    username: string;
    platforms?: string[];
  };
}

export interface IntegrationDetails {
  timeOfIntegration: string;
  integrationSituation: string;
  promotionContentProvided: string;
  startDate: string;
  endDate: string;
  additionalInfo: string;
  quantity: number;
}

export interface ServiceCardProps {
  cardKey: string;
  platform: string;
  content: {
    basePrice: number;
    type: string;
    description: string;
  };
  platformLogo?: React.ReactNode;
  integrationDetails: IntegrationDetails;
  onIntegrationDetailChange: (
    cardKey: string,
    field: keyof IntegrationDetails,
    value: string | number
  ) => void;
}

export interface Content {
  type: string;
  basePrice: number;
  disabled?: boolean;
  code: string;
}

export interface ProposalConfirmationProps {
  username: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCards: Map<string, { platform: string; content: Content }>;
  integrationDetails: Map<string, IntegrationDetails>;
  totalPrice: number;
  handleSendProposal: () => void;
}

export interface ProposalSuccessToastProps {
    selectedCards: Map<string, { platform: string; content: Content }>;
    finalTotal: number;
    toastId: number | string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PGUser {
  id: string;
  userId: string;
  email: string;
  name: string;
  username: string;
  avatarUrl: string;
  deckUrl: string | null;
  bio: string;
  followers: string;
  following: string;
  chatId: string;
  category: string[];
  collaboratedWith: any[]; // Use a more specific type if available, e.g., Collaborator[]
  platforms: string[];
  isVerified: boolean;
  userType: 'INFLUENCER' | 'BRAND' | 'AGENCY'; // Or just string if it can be other values
  instagramLink: string | null;
  twitterLink: string | null;
  linkedinLink: string | null;
  pinterestLink: string | null;
  facebookLink: string | null;
  youtubeLink: string | null;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  user: User;
  projects: any[]; // Use a more specific type if available, e.g., Project[]
}

// The payload for a single proposal sent to the backend
export interface PGProposal {
  title: string;
  description: string;
  platform: string;
  contentType: string;
  executionType: 'SCHEDULED';
  proposedStartDate: string;
  proposedEndDate: string;
  compensationType: "FIXED_FEE";
  compensationAmount: number;
  compensationCurrency: "INR";
  status: string;
  quantity: number;
}

// The complete payload sent in the POST request
export interface MutationPayload {
  proposals: PGProposal[];
  receiverId: string;
  senderId: string;
}

// The variables passed to the TanStack Query mutation function
export interface MutationVariables {
  endpoint: string;
  payload: MutationPayload;
  context: {
    proposalCount: number;
  };
}