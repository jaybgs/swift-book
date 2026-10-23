import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Wallet, 
  Image as ImageIcon, 
  TrendingUp, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Mail, 
  MessageSquare, 
  CreditCard, 
  MailX 
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';

export const DashboardOverview: React.FC = () => {
  const { activeSite } = useSwiftBook();

  return (
    <div className="space-y-6">
      
      {/* ============================================================ */}
      {/* 1. HEADER (Exactly Matching Screenshot 1) */}
      {/* ============================================================ */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Overview
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Photography dashboard · Photographer / Studio
          </p>
        </div>

        {/* Date Range Pill */}
        <div className="px-3.5 py-1 rounded-full bg-[#fef3ea] dark:bg-orange-500/10 border border-[#fde5d5] dark:border-orange-500/20 text-[#ea580c] dark:text-orange-400 text-xs font-semibold">
          Oct 19 — Oct 25
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. ROW 1: 4 STAT CARDS (Grouped 2x2 on Mobile to Save Height) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1: Shoots booked */}
        <div className="rounded-2xl p-3.5 sm:p-5 bg-[#fff7f2] dark:bg-[#1a1412] border border-[#fde3d2] dark:border-orange-500/20 flex flex-col justify-between min-h-[112px] sm:h-36">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Shoots booked
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white dark:bg-zinc-800 text-[#ea580c] flex items-center justify-center shadow-sm shrink-0">
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white font-mono">
              0
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">
              This week
            </div>
          </div>
        </div>

        {/* Card 2: Deposits collected */}
        <div className="rounded-2xl p-3.5 sm:p-5 bg-[#eefbf5] dark:bg-[#0f1814] border border-[#d0f4e3] dark:border-emerald-500/20 flex flex-col justify-between min-h-[112px] sm:h-36">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Deposits collected
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white dark:bg-zinc-800 text-[#10b981] flex items-center justify-center shadow-sm shrink-0">
              <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white font-mono">
              ₦0
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">
              This week
            </div>
          </div>
        </div>

        {/* Card 3: Packages to edit */}
        <div className="rounded-2xl p-3.5 sm:p-5 bg-[#f0f7fe] dark:bg-[#0f1620] border border-[#d2e7fc] dark:border-blue-500/20 flex flex-col justify-between min-h-[112px] sm:h-36">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Packages to edit
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white dark:bg-zinc-800 text-[#0099ff] flex items-center justify-center shadow-sm shrink-0">
              <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white font-mono">
              0
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">
              Awaiting delivery
            </div>
          </div>
        </div>

        {/* Card 4: Revenue */}
        <div className="rounded-2xl p-3.5 sm:p-5 bg-[#fffbf0] dark:bg-[#1a180f] border border-[#fef0cd] dark:border-amber-500/20 flex flex-col justify-between min-h-[112px] sm:h-36">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Revenue
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white dark:bg-zinc-800 text-[#ff9500] flex items-center justify-center shadow-sm shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white font-mono">
              ₦0
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1">
              Oct 19 — Oct 25
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. ROW 2: ENQUIRIES TODAY & UPCOMING SHOOTS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Card: Enquiries today (Solid Orange Card) */}
        <div className="lg:col-span-4 rounded-2xl p-6 bg-[#f46800] text-white flex flex-col justify-between shadow-sm min-h-[190px]">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-white/95">
              Enquiries today
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white font-mono my-2">
              0
            </div>
            <Link
              to="/app/enquiries"
              className="text-xs text-white/95 hover:underline flex items-center gap-1 font-medium"
            >
              Tap for this week's breakdown →
            </Link>
          </div>
        </div>

        {/* Right Card: Upcoming shoots */}
        <div className="lg:col-span-8 rounded-2xl p-6 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm flex flex-col justify-between min-h-[190px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#ea580c]" />
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Upcoming shoots
              </h3>
            </div>
            <Link
              to="/app/calendar"
              className="text-xs font-semibold text-[#ea580c] hover:underline flex items-center gap-1"
            >
              Calendar ↗
            </Link>
          </div>

          <div className="flex-1 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-6 text-xs text-zinc-400">
            No upcoming shoots this week.
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. ROW 3: APPROVAL QUEUE & RECENT CHAT SESSIONS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Left: Approval queue */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#ea580c]" />
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              Approval queue
            </h3>
          </div>

          <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 p-8 text-xs text-zinc-400">
            <MailX className="w-4 h-4 text-zinc-400" />
            <span>Nothing waiting for approval</span>
          </div>
        </div>

        {/* Right: Recent chat sessions */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#ea580c]" />
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              Recent chat sessions
            </h3>
          </div>

          <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-8 text-xs text-zinc-400">
            No client chats yet.
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. ROW 4: PAYMENTS BOTTOM CARD */}
      {/* ============================================================ */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#ea580c]" />
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              Payments
            </h3>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#fff8e8] dark:bg-amber-500/10 border border-[#feeec4] dark:border-amber-500/20 text-[#b45309] dark:text-amber-400 text-xs font-semibold">
            Unverified
          </span>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
          Add a site first to configure its payment gateway.
        </p>
      </div>

    </div>
  );
};
