import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IndustryType, StudioSite, BookingEvent, ChannelConfig, BlockedDate, FaqItem } from '../types';

export interface RegionCurrency {
  code: 'NGN' | 'USD' | 'GBP' | 'EUR';
  symbol: string;
  region: string;
  multiplier: number;
}

export function detectRegionCurrency(): RegionCurrency {
  if (typeof window === 'undefined') {
    return { code: 'NGN', symbol: '₦', region: 'Nigeria (WAT)', multiplier: 1500 };
  }
  const saved = localStorage.getItem('swiftbook_currency');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const langs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
    
    // Auto-detect Nigeria (Lagos, Africa, or NG language/locale)
    if (tz.includes('lagos') || tz.includes('nigeria') || langs.includes('ng') || tz.includes('africa')) {
      return { code: 'NGN', symbol: '₦', region: 'Nigeria (WAT)', multiplier: 1500 };
    }
    if (tz.includes('london') || langs.includes('gb')) {
      return { code: 'GBP', symbol: '£', region: 'United Kingdom', multiplier: 0.8 };
    }
    if (tz.includes('europe') || tz.includes('paris') || tz.includes('berlin')) {
      return { code: 'EUR', symbol: '€', region: 'Europe', multiplier: 0.92 };
    }
  } catch (err) {}
  
  // Default to NGN as requested by user
  return { code: 'NGN', symbol: '₦', region: 'Nigeria (WAT)', multiplier: 1500 };
}

export interface ProfessionTerminology {
  title: string;
  bookingsLabel: string;
  depositsLabel: string;
  enquiriesLabel: string;
  jobNoun: string;
  bookingNoun: string;
  showDeposits: boolean;
}

export function getProfessionTerminology(profession: IndustryType | 'videographer' | 'other' | string): ProfessionTerminology {
  switch (profession) {
    case 'real_estate':
      return {
        title: 'Real Estate Dashboard',
        bookingsLabel: 'Viewings Booked',
        depositsLabel: 'Earnest Money',
        enquiriesLabel: 'Property Inquiries',
        jobNoun: 'Viewing',
        bookingNoun: 'viewing',
        showDeposits: false,
      };
    case 'event_planner':
      return {
        title: 'Events Dashboard',
        bookingsLabel: 'Events Booked',
        depositsLabel: 'Deposits Collected',
        enquiriesLabel: 'Event Inquiries',
        jobNoun: 'Event',
        bookingNoun: 'event',
        showDeposits: true,
      };
    case 'photography':
    case 'videographer':
      return {
        title: 'Production & Creative Dashboard',
        bookingsLabel: 'Sessions Booked',
        depositsLabel: 'Deposits Collected',
        enquiriesLabel: 'Client Inquiries',
        jobNoun: 'Session',
        bookingNoun: 'booking',
        showDeposits: true,
      };
    case 'creator':
    case 'other':
    default:
      return {
        title: 'Booking Dashboard',
        bookingsLabel: 'Bookings Confirmed',
        depositsLabel: 'Deposits Collected',
        enquiriesLabel: 'Inquiries',
        jobNoun: 'Appointment',
        bookingNoun: 'appointment',
        showDeposits: true,
      };
  }
}

const INITIAL_SITES: StudioSite[] = [
  {
    id: 'site_primary',
    name: 'Primary Studio',
    profession: 'photography',
    url: 'mybrandstudio.com',
    timezone: 'Africa/Lagos (WAT)',
    apiKey: 'sk_live_sb_4e77c8231d990bc1',
    depositType: 'percent',
    depositPercent: 25,
    depositAmount: 150,
    active: true,
    ratecardEnabled: true,
    activeChannels: ['telegram', 'slack', 'email'],
    createdAt: '2026-03-01T10:00:00Z',
  },
];

export interface UniversalBookingPackage {
  id: string;
  name: string;
  profession: IndustryType;
  tagline: string;
  price: number;
  currency: string;
  duration: string;
  deliverables: string[];
  recommended?: boolean;
  idealFor: string;
}

export const UNIVERSAL_PACKAGES: UniversalBookingPackage[] = [
  {
    id: 'pkg_property_tour',
    name: 'Executive Estate Property Walkthrough',
    profession: 'real_estate',
    tagline: 'Private VIP property viewing and earnest packet inspection.',
    price: 350,
    currency: '$',
    duration: '45 mins',
    idealFor: 'Accredited buyers, luxury penthouses & commercial listings.',
    deliverables: ['Full architectural floorplan packet', 'Disclosures & earnest deposit brief', 'Private broker escort', 'Same-day viewing confirmation'],
  },
  {
    id: 'pkg_gala_planning',
    name: 'Corporate Gala & Brand Launch Planning',
    profession: 'event_planner',
    tagline: 'Turnkey venue planning, caterer sync, and guest management.',
    price: 1800,
    currency: '$',
    duration: 'Full Day Event',
    recommended: true,
    idealFor: 'Product launches, annual charity galas, and investor dinners.',
    deliverables: ['Timeline run-of-show orchestration', 'Vendor contract management', 'On-site lead coordinator', '24/7 guest communications'],
  },
  {
    id: 'pkg_creative_campaign',
    name: 'Commercial Campaign Production',
    profession: 'photography',
    tagline: 'High-impact commercial media production for brands & products.',
    price: 950,
    currency: '$',
    duration: '3 hours',
    idealFor: 'Direct-to-consumer brands, media agencies, apparel launches.',
    deliverables: ['75 color-graded commercial assets', 'Full global licensing buyout', 'Lighting rig & location permit sync', 'Sneak peeks in 24 hours'],
  },
  {
    id: 'pkg_advisory_intensive',
    name: 'Strategic Advisory & Scale Consultation',
    profession: 'creator',
    tagline: '1-on-1 strategy deep-dive on growth, revenue, and product.',
    price: 500,
    currency: '$',
    duration: '90 mins',
    idealFor: 'Founders, executive leaders, venture partners.',
    deliverables: ['Pre-call dossier review', 'Recorded transcript & action items', 'Follow-up accountability roadmap'],
  },
];

const INITIAL_CHANNELS: ChannelConfig[] = [
  {
    type: 'telegram',
    name: 'Telegram Bot Alerts',
    handleOrWebhook: '@swiftbook_alerts_bot',
    connected: true,
    pingsCount: 0,
    lastPing: 'No dispatches yet',
    description: 'Instant push alerts with client name, reserved time slot, and deposit confirmation.',
    color: '#229ED9',
  },
  {
    type: 'whatsapp',
    name: 'WhatsApp Business API',
    handleOrWebhook: '+1 (555) 392-8190',
    connected: true,
    pingsCount: 0,
    lastPing: 'No dispatches yet',
    description: 'Two-way client message ping allowing direct 1-tap client call or reply.',
    color: '#25D366',
  },
  {
    type: 'slack',
    name: 'Slack Ingest Webhook',
    handleOrWebhook: 'https://hooks.slack.com/services/T04G/B08E/#business-bookings',
    connected: true,
    pingsCount: 0,
    lastPing: 'No dispatches yet',
    description: 'Structured rich card posted to #business-bookings with deposit breakdown & notes.',
    color: '#4A154B',
  },
  {
    type: 'email',
    name: 'Team Master Dispatch Mailer',
    handleOrWebhook: 'inbox@swiftbook.app',
    connected: true,
    pingsCount: 0,
    lastPing: 'No dispatches yet',
    description: 'HTML receipt sent to client and calendar .ics invite delivered to business owner.',
    color: '#f35921',
  },
];

const INITIAL_EVENTS: BookingEvent[] = [];

const INITIAL_BLOCKED: BlockedDate[] = [];

const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq_1',
    question: 'How are bookings dispatched to our communication channels?',
    answer: 'The second a client submits a booking request or pays a deposit on your site, SwiftBook pushes a formatted alert to your Telegram, WhatsApp, Slack, or Email within milliseconds.',
    category: 'turnaround',
  },
  {
    id: 'faq_2',
    question: 'How do deposits and booking commitments work?',
    answer: 'You can configure fixed deposit amounts or percentage splits (e.g. 25% or 50%). SwiftBook verifies deposit authorization before dates are officially confirmed on your master schedule.',
    category: 'pricing',
  },
  {
    id: 'faq_3',
    question: 'Can I connect multiple websites or different business branches?',
    answer: 'Yes! Each site receives its own isolated API key and webhook endpoint. You can manage Real Estate viewings, Event bookings, and Consulting appointments from a single unified hub.',
    category: 'location',
  },
  {
    id: 'faq_4',
    question: 'Does SwiftBook support AI booking agents via MCP?',
    answer: 'Yes. SwiftBook provides an MCP server endpoint at /api/mcp so AI tools and agents can inspect available slots, check rate cards, and book client appointments autonomously.',
    category: 'turnaround',
  },
];

interface SwiftBookContextType {
  sites: StudioSite[];
  activeSite: StudioSite;
  activeSiteId: string;
  setActiveSiteId: (id: string) => void;
  terminology: ProfessionTerminology;
  packages: UniversalBookingPackage[];
  channels: ChannelConfig[];
  events: BookingEvent[];
  blockedDates: BlockedDate[];
  faqs: FaqItem[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currency: RegionCurrency;
  setCurrency: (c: RegionCurrency) => void;
  cycleCurrency: () => void;
  addSite: (site: Omit<StudioSite, 'id' | 'apiKey' | 'createdAt'>) => void;
  updateSite: (id: string, partial: Partial<StudioSite>) => void;
  deleteSite: (id: string) => void;
  toggleSiteActive: (id: string) => void;
  addBooking: (booking: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    packageId: string;
    shootDate: string;
    shootTime: string;
    notes?: string;
  }) => Promise<BookingEvent>;
  dispatchTestNotification: (channelType: 'telegram' | 'whatsapp' | 'slack' | 'email', eventType?: 'booking_confirmed' | 'deposit_received' | 'inquiry_received') => void;
  toggleChannelConnected: (type: 'telegram' | 'whatsapp' | 'slack' | 'email') => void;
  addBlockedDate: (date: string, reason: string) => void;
  removeBlockedDate: (id: string) => void;
  addFaqItem: (item: Omit<FaqItem, 'id'>) => void;
}

const SwiftBookContext = createContext<SwiftBookContextType | null>(null);

export const SwiftBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('swiftbook_theme') as 'light' | 'dark') || 'light';
  });

  const [sites, setSites] = useState<StudioSite[]>(() => {
    const saved = localStorage.getItem('swiftbook_sites');
    return saved ? JSON.parse(saved) : INITIAL_SITES;
  });

  const [activeSiteId, setActiveSiteId] = useState<string>(() => {
    return localStorage.getItem('swiftbook_active_site') || 'site_primary';
  });

  const [channels, setChannels] = useState<ChannelConfig[]>(() => {
    const saved = localStorage.getItem('swiftbook_channels');
    return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
  });

  const [events, setEvents] = useState<BookingEvent[]>(() => {
    const saved = localStorage.getItem('swiftbook_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>(() => {
    const saved = localStorage.getItem('swiftbook_blocked');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKED;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem('swiftbook_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [currency, setCurrencyState] = useState<RegionCurrency>(() => detectRegionCurrency());

  const setCurrency = (c: RegionCurrency) => {
    setCurrencyState(c);
    localStorage.setItem('swiftbook_currency', JSON.stringify(c));
  };

  const cycleCurrency = () => {
    setCurrencyState(prev => {
      let next: RegionCurrency;
      if (prev.code === 'NGN') {
        next = { code: 'USD', symbol: '$', region: 'United States', multiplier: 1 };
      } else if (prev.code === 'USD') {
        next = { code: 'GBP', symbol: '£', region: 'United Kingdom', multiplier: 0.8 };
      } else if (prev.code === 'GBP') {
        next = { code: 'EUR', symbol: '€', region: 'Europe', multiplier: 0.92 };
      } else {
        next = { code: 'NGN', symbol: '₦', region: 'Nigeria (WAT)', multiplier: 1500 };
      }
      localStorage.setItem('swiftbook_currency', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem('swiftbook_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('swiftbook_sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('swiftbook_channels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('swiftbook_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('swiftbook_blocked', JSON.stringify(blockedDates));
  }, [blockedDates]);

  useEffect(() => {
    localStorage.setItem('swiftbook_faqs', JSON.stringify(faqs));
  }, [faqs]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const activeSite = sites.find(s => s.id === activeSiteId) || sites[0];
  const terminology = getProfessionTerminology(activeSite.profession);

  const addSite = (newSiteData: Omit<StudioSite, 'id' | 'apiKey' | 'createdAt'>) => {
    const newSite: StudioSite = {
      ...newSiteData,
      id: `site_${Date.now()}`,
      apiKey: `sk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
    };
    setSites(prev => [newSite, ...prev]);
    setActiveSiteId(newSite.id);
  };

  const updateSite = (id: string, partial: Partial<StudioSite>) => {
    setSites(prev => prev.map(s => (s.id === id ? { ...s, ...partial } : s)));
  };

  const deleteSite = (id: string) => {
    setSites(prev => prev.filter(s => s.id !== id));
    if (activeSiteId === id) {
      setActiveSiteId(sites.find(s => s.id !== id)?.id || '');
    }
  };

  const toggleSiteActive = (id: string) => {
    setSites(prev => prev.map(s => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  const addBooking = async (booking: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    packageId: string;
    shootDate: string;
    shootTime: string;
    notes?: string;
  }): Promise<BookingEvent> => {
    const pkg = UNIVERSAL_PACKAGES.find(p => p.id === booking.packageId) || UNIVERSAL_PACKAGES[0];
    const totalPrice = pkg.price;
    
    // Deposit calculation
    let depositPaid = 0;
    if (activeSite.depositType === 'percent') {
      depositPaid = Math.round(totalPrice * ((activeSite.depositPercent || 25) / 100));
    } else {
      depositPaid = activeSite.depositAmount || 100;
    }

    const ref = `SB-${Math.floor(10000 + Math.random() * 90000)}`;

    const newEvent: BookingEvent = {
      id: `evt_${Date.now()}`,
      siteId: activeSite.id,
      siteName: activeSite.name,
      eventType: 'booking_confirmed',
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      packageName: pkg.name,
      shootDate: booking.shootDate,
      shootTime: booking.shootTime,
      totalPrice,
      depositPaid,
      channelsDispatched: activeSite.activeChannels,
      status: 'delivered',
      timestamp: 'Just now',
      bookingReference: ref,
      notes: booking.notes,
    };

    setEvents(prev => [newEvent, ...prev]);

    // Update ping counts
    setChannels(prev =>
      prev.map(c =>
        activeSite.activeChannels.includes(c.type)
          ? { ...c, pingsCount: c.pingsCount + 1, lastPing: 'Just now' }
          : c
      )
    );

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f35921', '#ff9500', '#0099ff', '#10b981'],
    });

    return newEvent;
  };

  const dispatchTestNotification = (
    channelType: 'telegram' | 'whatsapp' | 'slack' | 'email',
    eventType: 'booking_confirmed' | 'deposit_received' | 'inquiry_received' = 'booking_confirmed'
  ) => {
    const mockNames = ['David Sterling', 'Elena Rostova', 'Marcus Vance', 'Chloe Zhao', 'Alexander Ward'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const pkg = UNIVERSAL_PACKAGES.find(p => p.profession === activeSite.profession) || UNIVERSAL_PACKAGES[0];
    
    const testEvt: BookingEvent = {
      id: `evt_${Date.now()}`,
      siteId: activeSite.id,
      siteName: activeSite.name,
      eventType,
      clientName: randomName,
      clientEmail: `${randomName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      packageName: pkg.name,
      shootDate: '2026-11-18',
      shootTime: '2:30 PM',
      totalPrice: pkg.price,
      depositPaid: Math.round(pkg.price * 0.25),
      channelsDispatched: [channelType],
      status: 'delivered',
      timestamp: 'Just now',
      bookingReference: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: `Simulated webhook dispatched to ${channelType.toUpperCase()} for ${activeSite.name}.`,
    };

    setEvents(prev => [testEvt, ...prev]);

    setChannels(prev =>
      prev.map(c =>
        c.type === channelType
          ? { ...c, pingsCount: c.pingsCount + 1, lastPing: 'Just now' }
          : c
      )
    );

    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#0099ff', '#f35921'],
    });
  };

  const toggleChannelConnected = (type: 'telegram' | 'whatsapp' | 'slack' | 'email') => {
    setChannels(prev =>
      prev.map(c => (c.type === type ? { ...c, connected: !c.connected } : c))
    );
  };

  const addBlockedDate = (date: string, reason: string) => {
    const newBlk: BlockedDate = {
      id: `blk_${Date.now()}`,
      siteId: activeSite.id,
      date,
      reason,
    };
    setBlockedDates(prev => [...prev, newBlk]);
  };

  const removeBlockedDate = (id: string) => {
    setBlockedDates(prev => prev.filter(b => b.id !== id));
  };

  const addFaqItem = (item: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...item,
      id: `faq_${Date.now()}`,
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  return (
    <SwiftBookContext.Provider
      value={{
        sites,
        activeSite,
        activeSiteId,
        setActiveSiteId,
        terminology,
        packages: UNIVERSAL_PACKAGES,
        channels,
        events,
        blockedDates,
        faqs,
        theme,
        toggleTheme,
        currency,
        setCurrency,
        cycleCurrency,
        addSite,
        updateSite,
        deleteSite,
        toggleSiteActive,
        addBooking,
        dispatchTestNotification,
        toggleChannelConnected,
        addBlockedDate,
        removeBlockedDate,
        addFaqItem,
      }}
    >
      {children}
    </SwiftBookContext.Provider>
  );
};

export const useSwiftBook = () => {
  const ctx = useContext(SwiftBookContext);
  if (!ctx) throw new Error('useSwiftBook must be used within SwiftBookProvider');
  return ctx;
};
