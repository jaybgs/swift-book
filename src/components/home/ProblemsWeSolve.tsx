import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  CheckCircle2, 
  CheckCheck
} from 'lucide-react';
import { useSwiftBook } from '../../context/SwiftBookContext';

// Bold Sweeping Terracotta Arrow (Bigger, thicker, physically entering the right-hand box on desktop)
const BigEnteringArrow = () => (
  <svg
    viewBox="0 0 170 85"
    fill="none"
    className="w-36 sm:w-48 md:w-56 h-auto text-[#df6843] dark:text-[#f35921] select-none pointer-events-none drop-shadow-sm -mr-8 sm:-mr-12 lg:-mr-16 translate-x-4 sm:translate-x-6 z-20 shrink-0"
  >
    <path
      d="M10 14 C 28 58, 85 82, 162 48"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M142 40 L 165 48 L 152 68"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Mobile Downward Entering Arrow (Curving downwards directly pointing into the box below on mobile view)
const MobileDownwardEnteringArrow = () => (
  <svg
    viewBox="0 0 90 120"
    fill="none"
    className="w-16 sm:w-20 h-auto text-[#df6843] dark:text-[#f35921] select-none pointer-events-none drop-shadow-sm mx-auto shrink-0"
  >
    <path
      d="M14 10 C 60 22, 70 70, 44 110"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M28 98 L 44 112 L 58 100"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ProblemsWeSolve: React.FC = () => {
  const { currency } = useSwiftBook();

  // Problem 1: Stacked Booking Cards State (Active Card Index)
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Problem 2: Interactive Calendar Slot State
  const [calendarSlots, setCalendarSlots] = useState<{ [key: string]: string | null }>({
    'mon-12': null,
    'mon-15': 'Studio Portrait • Confirmed',
    'mon-18': null,
    'tue-12': null,
    'tue-15': null,
    'tue-18': 'Commercial Shoot • Verified',
  });

  // Problem 3: 1-Tap Client Reply State
  const [replyStatus, setReplyStatus] = useState<string | null>(null);

  const bookingCards = [
    {
      id: 0,
      clientName: 'David K. Sterling',
      handle: '@david_sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      service: 'Executive Session • Friday 2:00 PM',
      quote: 'Fired up for Friday. 25% deposit paid via Paystack and verified instantly.',
      deposit: `${currency.symbol}${currency.code === 'NGN' ? '150,000' : '350.00'} Locked`,
      channels: ['Telegram', 'Slack'],
    },
    {
      id: 1,
      clientName: 'Elena Vance',
      handle: '@elena_frames',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      service: 'Fashion Editorial • Saturday 11:00 AM',
      quote: 'Need 5 retouched looks before next Monday. Studio lighting reserved.',
      deposit: `${currency.symbol}${currency.code === 'NGN' ? '80,000' : '200.00'} Locked`,
      channels: ['WhatsApp', 'Email'],
    },
    {
      id: 2,
      clientName: 'Marcus Okafor',
      handle: '@marcus_vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      service: 'Commercial Walkthrough • Sunday 3:30 PM',
      quote: 'Full team arriving with drone & audio gear. Booking reference SB-9402.',
      deposit: `${currency.symbol}${currency.code === 'NGN' ? '220,000' : '550.00'} Locked`,
      channels: ['Slack', 'Telegram'],
    },
  ];

  const handleToggleSlot = (key: string, defaultName: string) => {
    setCalendarSlots(prev => ({
      ...prev,
      [key]: prev[key] ? null : defaultName,
    }));
  };

  const handleSendQuickReply = (text: string) => {
    setReplyStatus(`Replied: "${text}"`);
    setTimeout(() => {
      setReplyStatus(null);
    }, 2400);
  };

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-6 space-y-14 md:space-y-20">
      
      {/* Section Header with Blur Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium">
          <span>✦ THE PROBLEMS WE SOLVE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
          Honest delivery for teams that can't afford a{' '}
          <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
            missed client.
          </span>
        </h2>
      </motion.div>

      {/* ============================================================ */}
      {/* PROBLEM 1: "I never know which bookings are actually confirmed" */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8 items-center"
      >
        
        {/* Left Side: Avatar + Big Quote + Sweeping Arrow Entering Right Box */}
        <div className="lg:col-span-5 relative space-y-3 pr-0 lg:pr-2">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fdeee7] dark:bg-[#251a16] border border-[#fbd3c3] flex items-center justify-center text-2xl shadow-sm shrink-0 mt-1">
              👨‍💼
            </div>
            {/* BIG Bold Quote */}
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-zinc-950 dark:text-white leading-[1.08] tracking-tight">
              “I never know which bookings are actually confirmed”
            </h3>
          </div>

          {/* Desktop Entering Arrow (Horizontal entering right box) */}
          <div className="hidden lg:flex justify-end pt-1">
            <BigEnteringArrow />
          </div>

          {/* Mobile Downward Entering Arrow (Curving down entering solution box below) */}
          <div className="flex lg:hidden justify-center -mb-7 sm:-mb-8 translate-y-3 sm:translate-y-4 z-20 relative pointer-events-none">
            <MobileDownwardEnteringArrow />
          </div>
        </div>

        {/* Right Side: Reduced Height Solution Box */}
        <div className="lg:col-span-7 rounded-[28px] p-5 sm:p-7 bg-[#f9f8f4] dark:bg-[#13151f] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 relative z-0">
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
            SwiftBook confirms, deposits and inquiries the moment they happen — delivered to the channels your team already watches.
          </p>

          {/* Compact 3 Fanned / Stacked Booking Cards */}
          <div className="relative h-44 sm:h-48 flex items-center justify-center">
            {bookingCards.map((card, idx) => {
              const isSelected = activeCardIndex === idx;
              const rotation = idx === 0 ? -4 : idx === 1 ? 0 : 4;
              const xOffset = idx === 0 ? -10 : idx === 1 ? 0 : 10;

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActiveCardIndex(idx)}
                  animate={{
                    scale: isSelected ? 1.01 : 0.95,
                    rotate: isSelected ? 0 : rotation,
                    x: isSelected ? 0 : xOffset,
                    zIndex: isSelected ? 20 : 10 - idx,
                    opacity: isSelected ? 1 : 0.8,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className="absolute w-full max-w-md rounded-2xl p-4 bg-white dark:bg-[#181a26] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_6px_20px_rgba(0,0,0,0.05)] cursor-pointer select-none space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={card.avatar}
                        alt={card.clientName}
                        className="w-8 h-8 rounded-full object-cover border border-black/10"
                      />
                      <div>
                        <div className="flex items-center gap-1 font-bold text-xs text-zinc-950 dark:text-white">
                          <span>{card.clientName}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#229ED9] fill-[#229ED9]/10" />
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          {card.handle}
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-semibold">
                      {card.deposit}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug">
                    {card.quote}
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-black/[0.05] dark:border-white/[0.05] text-[10px] font-medium text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500">Channels:</span>
                      {card.channels.map(c => (
                        <span key={c} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                          {c}
                        </span>
                      ))}
                    </div>

                    <span className="text-[#f35921] font-semibold">
                      {isSelected ? '✓ Confirmed' : 'Tap to focus'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>

      {/* ============================================================ */}
      {/* PROBLEM 2: "I can't keep my calendar straight across different sites" */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8 items-center"
      >
        
        {/* Left Side: Avatar + Big Quote + Sweeping Arrow Entering Right Box */}
        <div className="lg:col-span-5 relative space-y-3 pr-0 lg:pr-2">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fdeee7] dark:bg-[#251a16] border border-[#fbd3c3] flex items-center justify-center text-2xl shadow-sm shrink-0 mt-1">
              👩‍💻
            </div>
            {/* BIG Bold Quote */}
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-zinc-950 dark:text-white leading-[1.08] tracking-tight">
              “I can’t keep my calendar straight across different sites”
            </h3>
          </div>

          {/* Desktop Entering Arrow (Horizontal entering right box) */}
          <div className="hidden lg:flex justify-end pt-1">
            <BigEnteringArrow />
          </div>

          {/* Mobile Downward Entering Arrow (Curving down entering solution box below) */}
          <div className="flex lg:hidden justify-center -mb-7 sm:-mb-8 translate-y-3 sm:translate-y-4 z-20 relative pointer-events-none">
            <MobileDownwardEnteringArrow />
          </div>
        </div>

        {/* Right Side: Reduced Height Calendar Box */}
        <div className="lg:col-span-7 rounded-[28px] p-5 sm:p-7 bg-[#f9f8f4] dark:bg-[#13151f] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 relative z-0">
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
            Your calendar pulls confirmed sessions and blocked dates from every site, so you always know what is booked and what is off limits.
          </p>

          {/* Compact Calendar Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Column 1: 13 MON */}
            <div className="rounded-2xl p-3.5 bg-white dark:bg-[#181a26] border border-black/[0.06] dark:border-white/[0.06] shadow-sm space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#6366f1] text-white flex items-center justify-center text-xs font-bold">
                    13
                  </span>
                  <span className="font-bold text-xs text-zinc-900 dark:text-white">
                    MON
                  </span>
                </div>

                <button
                  onClick={() => handleToggleSlot('mon-12', 'Executive Shoot (Added)')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6366f1] hover:underline"
                >
                  <span>Add</span>
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'mon-12', time: '12:30', defaultLabel: 'Studio Session' },
                  { key: 'mon-15', time: '15:30', defaultLabel: 'Retouching Hold' },
                  { key: 'mon-18', time: '18:30', defaultLabel: 'Golden Hour Slot' },
                ].map(slot => {
                  const isBooked = !!calendarSlots[slot.key];
                  return (
                    <button
                      key={slot.key}
                      onClick={() => handleToggleSlot(slot.key, slot.defaultLabel)}
                      className={`w-full py-1.5 px-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isBooked
                          ? 'bg-[#6366f1]/10 border-[#6366f1]/30 text-[#4f46e5] dark:text-[#a5b4fc] font-semibold'
                          : 'bg-zinc-50 dark:bg-black/20 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-400'
                      }`}
                    >
                      <span className="font-mono text-[10px]">{slot.time}</span>
                      <span className="truncate max-w-[130px] text-[11px]">
                        {isBooked ? calendarSlots[slot.key] : '+ Available Slot'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: 14 TUE */}
            <div className="rounded-2xl p-3.5 bg-white dark:bg-[#181a26] border border-black/[0.06] dark:border-white/[0.06] shadow-sm space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#8b5cf6] text-white flex items-center justify-center text-xs font-bold">
                    14
                  </span>
                  <span className="font-bold text-xs text-zinc-900 dark:text-white">
                    TUE
                  </span>
                </div>

                <button
                  onClick={() => handleToggleSlot('tue-12', 'Brand Lookbook (Added)')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8b5cf6] hover:underline"
                >
                  <span>Add</span>
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'tue-12', time: '12:00', defaultLabel: 'Lookbook Drop' },
                  { key: 'tue-15', time: '15:00', defaultLabel: 'Client Viewing' },
                  { key: 'tue-18', time: '18:00', defaultLabel: 'Commercial Shoot' },
                ].map(slot => {
                  const isBooked = !!calendarSlots[slot.key];
                  return (
                    <button
                      key={slot.key}
                      onClick={() => handleToggleSlot(slot.key, slot.defaultLabel)}
                      className={`w-full py-1.5 px-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isBooked
                          ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/30 text-[#7c3aed] dark:text-[#c4b5fd] font-semibold'
                          : 'bg-zinc-50 dark:bg-black/20 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-400'
                      }`}
                    >
                      <span className="font-mono text-[10px]">{slot.time}</span>
                      <span className="truncate max-w-[130px] text-[11px]">
                        {isBooked ? calendarSlots[slot.key] : '+ Available Slot'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </motion.div>

      {/* ============================================================ */}
      {/* PROBLEM 3: "My team keeps missing critical client inquiries" */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8 items-center"
      >
        
        {/* Left Side: Avatar + Big Quote + Sweeping Arrow Entering Right Box */}
        <div className="lg:col-span-5 relative space-y-3 pr-0 lg:pr-2">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fdeee7] dark:bg-[#251a16] border border-[#fbd3c3] flex items-center justify-center text-2xl shadow-sm shrink-0 mt-1">
              🧑‍💼
            </div>
            {/* BIG Bold Quote */}
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-zinc-950 dark:text-white leading-[1.08] tracking-tight">
              “My team keeps missing critical client inquiries”
            </h3>
          </div>

          {/* Desktop Entering Arrow (Horizontal entering right box) */}
          <div className="hidden lg:flex justify-end pt-1">
            <BigEnteringArrow />
          </div>

          {/* Mobile Downward Entering Arrow (Curving down entering solution box below) */}
          <div className="flex lg:hidden justify-center -mb-7 sm:-mb-8 translate-y-3 sm:translate-y-4 z-20 relative pointer-events-none">
            <MobileDownwardEnteringArrow />
          </div>
        </div>

        {/* Right Side: Reduced Height 1-Tap Reply Box */}
        <div className="lg:col-span-7 rounded-[28px] p-5 sm:p-7 bg-[#f9f8f4] dark:bg-[#13151f] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-3.5 relative z-0">
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
            Telegram, Slack and WhatsApp ping the team the moment a client asks — with direct one-tap responses.
          </p>

          {/* Compact 1-Tap Widget */}
          <div className="rounded-2xl p-4 bg-white dark:bg-[#181a26] border border-black/[0.06] dark:border-white/[0.06] shadow-sm space-y-3">
            
            {/* Incoming Inquiry Bubble */}
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-black/20 border border-black/[0.04] space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>Inquiry from Sarah Jenkins</span>
                <span className="text-emerald-600 font-semibold">● Live Telegram Ping</span>
              </div>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 italic font-medium">
                “Hey team! Can we book Saturday at 4 PM for 5 people? Need deposit details.”
              </p>
            </div>

            {/* 1-Tap Response Buttons */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-zinc-400">
                Direct 1-Tap Response:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '⚡ Yes, 4 PM is open!',
                  '💬 Reply via WhatsApp',
                  '🔒 Lock Slot & Request Deposit',
                ].map(actionText => (
                  <button
                    key={actionText}
                    onClick={() => handleSendQuickReply(actionText)}
                    className="px-3 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-[11px] font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
                  >
                    {actionText}
                  </button>
                ))}
              </div>
            </div>

            {/* Toast Response */}
            <AnimatePresence>
              {replyStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium flex items-center gap-2"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{replyStatus} — Delivered in 0.8s!</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </motion.div>

    </section>
  );
};
