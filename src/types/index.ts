export type UserRole = "GUEST" | "MEMBER" | "VOLUNTEER" | "ORGANIZER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  membershipStatus: "NONE" | "PENDING" | "ACTIVE" | "EXPIRED";
  createdAt: string;
}

export type EventCategory = "ROAD_TRIP" | "SOCIAL" | "CORPORATE" | "COMMUNITY" | "CHARITY";

export interface OuthoodEvent {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  summary: string;
  description: string;
  coverImage: string;
  location: string;
  startDate: string;
  endDate?: string;
  priceKes?: number;
  capacity: number;
  registered: number;
  featured?: boolean;
}

export type CampaignStatus = "ACTIVE" | "COMPLETED" | "UPCOMING";

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  goalKes: number;
  raisedKes: number;
  status: CampaignStatus;
  beneficiary: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: { name: string; avatarUrl: string; role: string };
  readingTimeMinutes: number;
  publishedAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "EVENTS" | "ROAD_TRIPS" | "CHARITY" | "COMMUNITY";
  image: string;
  location: string;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface ImpactStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "GUIDE" | "TEMPLATE";
  fileSizeKb: number;
  category: string;
}
