import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Bot, 
  Calendar as CalendarIcon, 
  CreditCard, 
  Copy, 
  Check, 
  Clock, 
  Sparkles,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSwiftBook } from '../../context/SwiftBookContext';
import { StatusMark } from '../reactbits';

export const BentoFeatures: React.FC = () => {
  const { activeSite, faqs, terminology } = useSwiftBook();
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(activeSite.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-xs font-mono font-medium mb-3 text-zinc-600 dark:text-zinc-400">
          <span>✦ THE ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Engineered for businesses where every minute is{' '}
          <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
            valuable.
          </span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Four powerful primitives that turn scattered booking inquiries into locked dates and collected deposits.
        </p>
      </div>

      {/* SupaBird Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento 1: One Key Per Site (7 cols) */}
        <div className="md:col-span-7 bento-card p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-[#f35921] flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                01 // Instant Ingest
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              One API Key Per Connected Site
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              Generate an ingest token for each of your sites, drop it in your booking form or webhook, and start receiving real-time events in under two minutes.
            </p>

            {/* Interactive API Key Box */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-50 dark:bg-[#161822] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>SITE API KEY (BEARER TOKEN)</span>
                <button
                  onClick={handleCopyKey}
                  className="flex items-center gap-1 text-[#f35921] hover:underline font-semibold"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey ? 'COPIED!' : 'COPY KEY'}
                </button>
              </div>

              <div className="py-2 overflow-x-auto">
                <div className="font-mono text-xs text-zinc-900 dark:text-zinc-100 bg-black/5 dark:bg-white/5 px-3 py-2 rounded-xl flex items-center justify-between">
                  <span>{activeSite.apiKey}</span>
                  <StatusMark status="done" size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Supports: Next.js, Webflow, WordPress, Custom APIs</span>
            <Link to="/app/sites" className="flex items-center gap-1 text-[#f35921] font-semibold hover:underline">
              Manage Keys <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento 2: AI FAQ Agent (5 cols) */}
        <div className="md:col-span-5 bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                02 // Auto-Quoter
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              AI Ratecard & FAQ Agent
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Replies to client inquiries with your verified rates, availability and packages within seconds — before you even see the email.
            </p>

            {/* Interactive FAQ Snippet */}
            <div className="mt-6 space-y-2">
              <div className="p-3.5 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-xs">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Client Asks:
                </div>
                <div className="text-zinc-800 dark:text-zinc-200 italic mb-2">
                  "{faqs[activeFaqIndex]?.question}"
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1a1d28] border border-blue-500/10 text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed">
                  <strong>Agent:</strong> {faqs[activeFaqIndex]?.answer}
                </div>
              </div>

              <div className="flex gap-1 justify-center pt-1">
                {faqs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFaqIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeFaqIndex === i ? 'bg-blue-500 w-5' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Average response: 1.4s</span>
            <Link to="/app/faq" className="flex items-center gap-1 text-blue-500 font-semibold hover:underline">
              Test Agent <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento 3: Deposit Splitting & Commit (5 cols) */}
        <div className="md:col-span-5 bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                03 // Cash Flow
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Zero Unconfirmed Holds
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Require a custom deposit or earnest payment (fixed or percentage) before locking calendar dates.
            </p>

            {/* Deposit visualizer */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                <span>{activeSite.name}</span>
                <span className="text-emerald-500 font-mono">
                  {activeSite.depositType === 'percent' ? `${activeSite.depositPercent}% REQUIRED` : `$${activeSite.depositAmount} FIXED`}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-1/3" />
                <div className="bg-zinc-300 dark:bg-zinc-700 h-full w-2/3 opacity-40" />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Authorized at Booking</span>
                <span>Balance Collected upon Delivery</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Stripe, Paystack, Bank Wire, Webhooks</span>
            <Link to="/app/sites" className="flex items-center gap-1 text-emerald-500 font-semibold hover:underline">
              Configure Deposits <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento 4: Master Schedule & Blackout Calendar (7 cols) */}
        <div className="md:col-span-7 bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                04 // Master Schedule
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Master Booking & Blackout Calendar
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
              Confirmed sessions and blackout dates (holidays, internal maintenance, travel) sync seamlessly across all your connected sites.
            </p>

            {/* Calendar Mini Grid */}
            <div className="mt-6 grid grid-cols-7 gap-1.5 text-center text-xs font-mono">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="text-[10px] text-zinc-400 py-1 font-semibold">{d}</div>
              ))}
              {[...Array(14)].map((_, i) => {
                const day = i + 1;
                const isBooked = day === 4 || day === 6 || day === 11;
                const isBlocked = day === 1 || day === 7 || day === 12;
                return (
                  <div
                    key={i}
                    className={`py-2 rounded-xl text-xs flex flex-col items-center justify-center transition-all ${
                      isBooked
                        ? 'bg-[#f35921] text-white font-bold shadow-sm'
                        : isBlocked
                        ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 line-through'
                        : 'bg-zinc-50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5'
                    }`}
                  >
                    <span>{day}</span>
                    {isBooked && <span className="text-[9px] font-sans font-normal opacity-90">Booked</span>}
                    {isBlocked && <span className="text-[8px] font-sans">Off</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Instant blackout blocking across all sites</span>
            <Link to="/app/calendar" className="flex items-center gap-1 text-amber-500 font-semibold hover:underline">
              Open Master Calendar <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
