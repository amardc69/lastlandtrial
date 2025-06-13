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

export interface LeftSideProps {
  user: UserProfile;
  fallbacks: Fallbacks;
}

export interface ServicesShowcaseProps {
  user: {
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
}

export interface ProposalConfirmationProps {
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