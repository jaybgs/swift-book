export type IndustryType = 'photography' | 'real_estate' | 'event_planner' | 'creator';

export interface StudioSite {
  id: string;
  name: string;
  profession: IndustryType;
  url: string;
  timezone: string;
  apiKey: string;
  depositType: 'percent' | 'fixed';
  depositPercent?: number;
  depositAmount?: number;
  active: boolean;
  ratecardEnabled: boolean;
  activeChannels: ('telegram' | 'whatsapp' | 'slack' | 'email')[];
  createdAt: string;
}

export interface ShootPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  duration: string;
  deliverables: string[];
  recommended?: boolean;
  idealFor: string;
  image: string;
}

export interface ShootAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BookingEvent {
  id: string;
  siteId: string;
  siteName: string;
  eventType: 'booking_confirmed' | 'deposit_received' | 'inquiry_received' | 'date_blocked';
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  packageName: string;
  shootDate: string;
  shootTime: string;
  totalPrice: number;
  depositPaid: number;
  channelsDispatched: ('telegram' | 'whatsapp' | 'slack' | 'email')[];
  status: 'delivered' | 'pending' | 'failed';
  timestamp: string;
  bookingReference: string;
  notes?: string;
  addons?: string[];
}

export interface ChannelConfig {
  type: 'telegram' | 'whatsapp' | 'slack' | 'email';
  name: string;
  handleOrWebhook: string;
  connected: boolean;
  pingsCount: number;
  lastPing?: string;
  description: string;
  color: string;
}

export interface BlockedDate {
  id: string;
  siteId: string;
  date: string;
  reason: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'rescheduling' | 'turnaround' | 'location';
}
