import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BarChart3, 
  Send, 
  Smartphone, 
  Laptop, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Calendar as CalendarIcon,
  Filter,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';

interface EnquiryItem {
  id: string;
  day: string; // 'Monday' | 'Tuesday' etc.
  date: string; // 'Oct 19', etc.
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  channel: 'telegram' | 'whatsapp' | 'slack' | 'email';
  sessionRequested: string;
  message: string;
  status: 'deposit_locked' | 'ai_quoted' | 'pending_reply' | 'confirmed';
  depositAmount?: string;
  latency: string;
}

export const EnquiriesPage: React.FC = () => {
  const { currency } = useSwiftBook();
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>('all');

  // Enquiries throughout the week day-by-day (Clean production state)
  const enquiriesData: { [key: string]: { dayName: string; dateStr: string; count: number; enquiries: EnquiryItem[] } } = {
    mon: { dayName: 'Monday', dateStr: 'Oct 19, 2026', count: 0, enquiries: [] },
    tue: { dayName: 'Tuesday', dateStr: 'Oct 20, 2026', count: 0, enquiries: [] },
    wed: { dayName: 'Wednesday', dateStr: 'Oct 21, 2026', count: 0, enquiries: [] },
    thu: { dayName: 'Thursday', dateStr: 'Oct 22, 2026', count: 0, enquiries: [] },
    fri: { dayName: 'Friday', dateStr: 'Oct 23, 2026 (Today)', count: 0, enquiries: [] },
    sat: { dayName: 'Saturday', dateStr: 'Oct 24, 2026', count: 0, enquiries: [] },
    sun: { dayName: 'Sunday', dateStr: 'Oct 25, 2026', count: 0, enquiries: [] },
  };

  const daysList = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const maxDayCount = Math.max(1, ...daysList.map(k => enquiriesData[k].count));
  const totalEnquiries = daysList.reduce((acc, k) => acc + enquiriesData[k].count, 0);
  const totalLockedDeposits = daysList.reduce((acc, k) => {
    return acc + enquiriesData[k].enquiries.filter(e => e.status === 'deposit_locked').length;
  }, 0);

  // Filtered days based on day pill filter
  const displayedDays = selectedDayFilter === 'all' 
    ? daysList 
    : [selectedDayFilter];

  const channelColors = {
    telegram: { name: 'Telegram', color: '#229ED9', icon: Send },
    whatsapp: { name: 'WhatsApp', color: '#25D366', icon: Smartphone },
    slack: { name: 'Slack', color: '#4A154B', icon: Laptop },
    email: { name: 'Email', color: '#ea580c', icon: Mail },
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Back Button & Header */}
      <div className="space-y-3">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Weekly Enquiries Breakdown
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Day-by-day inbound booking inquiries, channel origin, response latency, and deposit conversions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-orange-500/10 text-[#f35921] font-mono text-xs font-semibold flex items-center gap-1.5 border border-orange-500/20">
              <CalendarIcon className="w-3.5 h-3.5" />
              Week of Oct 19 — Oct 25, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Enquiries */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
            <span>Total Enquiries</span>
            <MessageSquare className="w-4 h-4 text-[#f35921]" />
          </div>
          <div className="text-3xl font-bold text-zinc-950 dark:text-white font-mono">
            {totalEnquiries}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
            +32% vs last week
          </div>
        </div>

        {/* KPI 2: Peak Day */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
            <span>Peak Enquiry Day</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-zinc-950 dark:text-white">
            Thursday
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            5 enquiries logged (Oct 22)
          </div>
        </div>

        {/* KPI 3: Deposit Conversions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
            <span>Deposits Locked</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {totalLockedDeposits} <span className="text-sm font-normal text-zinc-400">/ {totalEnquiries}</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-mono">
            36.8% conversion rate
          </div>
        </div>

        {/* KPI 4: Ingest Engine Latency */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
            <span>Avg Fanout Latency</span>
            <Zap className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-bold text-zinc-950 dark:text-white font-mono">
            12.8ms
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            Across 4 linked channels
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. THE INTERACTIVE WEEKLY BAR CHART */}
      {/* ============================================================ */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-white/5 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#f35921]" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Daily Enquiries Volume (Mon — Sun)
              </h2>
            </div>
            <p className="text-xs text-zinc-500">
              Click any day bar to filter and inspect detailed messages for that date.
            </p>
          </div>

          {/* Reset / All days button */}
          {selectedDayFilter !== 'all' && (
            <button
              onClick={() => setSelectedDayFilter('all')}
              className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Reset to All Days ✕
            </button>
          )}
        </div>

        {/* Visual Bar Chart Component */}
        <div className="pt-6 pb-2">
          <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-64 sm:h-72 border-b border-zinc-200/80 dark:border-zinc-800 pb-2 px-2">
            
            {daysList.map(key => {
              const dayObj = enquiriesData[key];
              const heightPercent = Math.max((dayObj.count / maxDayCount) * 100, 15);
              const isSelected = selectedDayFilter === key;
              const isToday = key === 'fri';

              return (
                <div
                  key={key}
                  onClick={() => setSelectedDayFilter(selectedDayFilter === key ? 'all' : key)}
                  className="flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                >
                  {/* Tooltip / Count on top of bar */}
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold transition-transform group-hover:-translate-y-1 ${
                      isSelected
                        ? 'text-[#f35921]'
                        : isToday
                        ? 'text-zinc-950 dark:text-white'
                        : 'text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200'
                    }`}
                  >
                    {dayObj.count}
                  </span>

                  {/* Vertical Bar Container */}
                  <div className="w-full max-w-[48px] h-full flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-2xl transition-all duration-300 relative overflow-hidden group-hover:brightness-110 shadow-sm ${
                        isSelected
                          ? 'bg-gradient-to-t from-[#f35921] to-[#ff7d47] ring-4 ring-orange-500/25 shadow-lg'
                          : isToday
                          ? 'bg-gradient-to-t from-zinc-900 via-zinc-800 to-[#f35921] dark:from-white dark:via-zinc-200 dark:to-[#f35921]'
                          : 'bg-zinc-200 dark:bg-zinc-800/80 hover:bg-[#f35921]/60'
                      }`}
                    >
                      {/* Subtle stripe pattern inside bar */}
                      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 opacity-50" />
                    </div>
                  </div>

                  {/* Day Label Underneath */}
                  <div className="text-center mt-2">
                    <div
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isSelected
                          ? 'text-[#f35921]'
                          : isToday
                          ? 'text-zinc-950 dark:text-white font-bold'
                          : 'text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {dayObj.dayName.slice(0, 3)}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                      {dayObj.dateStr.split(',')[0].replace(' (Today)', '')}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Channel Origin Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Channels active:</span>
            {Object.entries(channelColors).map(([k, c]) => {
              const Icon = c.icon;
              return (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-zinc-600 dark:text-zinc-400">{c.name}</span>
                </div>
              );
            })}
          </div>

          <div className="text-zinc-400 font-mono text-[11px]">
            Showing {selectedDayFilter === 'all' ? 'All 7 Days' : enquiriesData[selectedDayFilter]?.dayName}
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. DAY-BY-DAY COMPREHENSIVE BREAKDOWN LIST */}
      {/* ============================================================ */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Detailed Enquiries Feed ({selectedDayFilter === 'all' ? 'Entire Week' : enquiriesData[selectedDayFilter]?.dayName})
          </h2>

          {/* Filter by Channel */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5 overflow-x-auto text-xs">
            <span className="px-2 text-zinc-400 font-mono flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {['all', 'telegram', 'whatsapp', 'slack', 'email'].map(chan => (
              <button
                key={chan}
                onClick={() => setSelectedChannelFilter(chan)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
                  selectedChannelFilter === chan
                    ? 'bg-white dark:bg-[#1e202c] text-zinc-950 dark:text-white shadow-sm font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {chan}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Grouped by Day */}
        <div className="space-y-6">
          {totalEnquiries === 0 ? (
            <div className="rounded-3xl p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12141c] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#f35921] flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                No inquiries recorded this week
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                When prospective clients inquire via Telegram, WhatsApp, Slack, or Email, their messages and 1-tap quick reply options will stream here in real time.
              </p>
            </div>
          ) : (
            displayedDays.map(dayKey => {
            const dayData = enquiriesData[dayKey];
            const filteredEnquiries = dayData.enquiries.filter(
              e => selectedChannelFilter === 'all' || e.channel === selectedChannelFilter
            );

            if (filteredEnquiries.length === 0) return null;

            return (
              <div key={dayKey} className="space-y-3">
                
                {/* Date Header Strip */}
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 font-bold text-xs text-zinc-900 dark:text-white">
                    {dayData.dayName} • {dayData.dateStr}
                  </div>
                  <div className="h-px bg-zinc-200 dark:bg-white/10 flex-1" />
                  <div className="text-xs font-mono text-zinc-400">
                    {filteredEnquiries.length} {filteredEnquiries.length === 1 ? 'enquiry' : 'enquiries'}
                  </div>
                </div>

                {/* Enquiries Cards */}
                <div className="grid grid-cols-1 gap-3">
                  {filteredEnquiries.map(enq => {
                    const chanMeta = channelColors[enq.channel];
                    const ChanIcon = chanMeta.icon;

                    return (
                      <div
                        key={enq.id}
                        className="rounded-2xl p-5 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all space-y-3"
                      >
                        {/* Card Top Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            {/* Avatar Initials */}
                            <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">
                              {enq.clientName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-zinc-900 dark:text-white">
                                {enq.clientName}
                              </div>
                              <div className="text-xs text-zinc-500 font-mono">
                                {enq.clientEmail} • {enq.clientPhone}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                            {/* Channel Badge */}
                            <span 
                              className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0"
                              style={{ backgroundColor: `${chanMeta.color}18`, color: chanMeta.color }}
                            >
                              <ChanIcon className="w-3 h-3" />
                              <span>{chanMeta.name}</span>
                            </span>

                            {/* Status Badge */}
                            {enq.status === 'deposit_locked' && (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {enq.depositAmount} Locked
                              </span>
                            )}
                            {enq.status === 'ai_quoted' && (
                              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1 shrink-0">
                                <Sparkles className="w-3 h-3" />
                                Quoted by AI Agent
                              </span>
                            )}
                            {enq.status === 'confirmed' && (
                              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] sm:text-xs font-mono font-semibold shrink-0">
                                Confirmed
                              </span>
                            )}
                            {enq.status === 'pending_reply' && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] sm:text-xs font-mono font-semibold shrink-0">
                                Awaiting Reply
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Session Requested Pill */}
                        <div className="text-xs font-semibold text-[#f35921] flex items-center gap-1.5">
                          <span>Session Requested:</span>
                          <span className="text-zinc-800 dark:text-zinc-200 font-bold">{enq.sessionRequested}</span>
                        </div>

                        {/* Inquiry Body */}
                        <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#161822] text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans border border-zinc-200/50 dark:border-white/5">
                          “{enq.message}”
                        </div>

                        {/* Footer Row: Timestamp + Ingest Latency + Quick Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-zinc-400 font-mono">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {enq.time}
                            </span>
                            <span>•</span>
                            <span className="text-emerald-500">
                              Dispatched in {enq.latency}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${enq.clientPhone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-zinc-800 dark:text-zinc-200 font-semibold transition-colors flex items-center gap-1"
                            >
                              <Smartphone className="w-3 h-3 text-[#25D366]" />
                              <span>1-Tap WhatsApp</span>
                            </a>
                            <Link
                              to="/app/calendar"
                              className="px-3 py-1 rounded-lg bg-[#f35921]/10 text-[#f35921] hover:bg-[#f35921]/20 font-semibold transition-colors flex items-center gap-1"
                            >
                              <CalendarIcon className="w-3 h-3" />
                              <span>Schedule on Calendar</span>
                            </Link>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          }))}
        </div>

      </div>

    </div>
  );
};
