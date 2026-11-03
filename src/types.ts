export type Region = 'US' | 'UK';

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceUS: number;
  priceUK: number;
  unit: string;
  checklist: string[];
  image: string;
  alt: string;
  colSpan?: string;
}

export interface CleanerTeamMember {
  id: string;
  name: string;
  role: string;
  tenure: string;
  location: string;
  region: Region;
  funFact: string;
  image: string;
  alt: string;
}

export interface CustomerReview {
  id: string;
  quote: string;
  author: string;
  neighborhood: string;
  city: string;
  region: Region;
  duration: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  priceUS: { recurring: number; onetime: number };
  priceUK: { recurring: number; onetime: number };
  cadence: string;
  isPopular?: boolean;
  features: { name: string; included: boolean }[];
  idealFor: string;
}

export interface BeforeAfterSet {
  id: string;
  title: string;
  subtitle: string;
  room: string;
  beforeImage: string;
  afterImage: string;
  story: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
