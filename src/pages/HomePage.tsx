import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Copy, 
  Check, 
  Calendar as CalendarIcon, 
  Bot, 
  Star, 
  Key, 
  ExternalLink,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';
import { StatusMark, ShapeBlur } from '../components/reactbits';
import { Logo } from '../components/common/Logo';
import { MultiChannelFanout } from '../components/home/MultiChannelFanout';
import { ProblemsWeSolve } from '../components/home/ProblemsWeSolve';

export const HomePage: React.FC = () => {
  const { activeSite, currency } = useSwiftBook();
  const [copiedKey, setCopiedKey] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(activeSite.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const faqItems = [
    {
      q: 'How does SwiftBook deliver bookings and inquiries in real-time?',
      a: 'SwiftBook connects to your site through a high-speed ingest webhook. The millisecond a client submits a booking form or deposits earnest funds, our ingest engine formats and fans out the event card across Telegram, WhatsApp, Slack, and Email simultaneously in under 20ms.',
    },
    {
      q: 'How does deposit collection and verification work?',
      a: 'You can configure percentage splits (e.g. 25% or 50%) or fixed flat deposits per site. SwiftBook verifies payment webhook signatures before slots are marked as confirmed on your master schedule, ensuring zero unpaid date holds.',
    },
    {
      q: 'Can I connect multiple websites or business branches?',
      a: 'Yes! Each website gets its own unique API key and isolated webhook URL. You can manage multiple photography studios, real estate agencies, event venues, or consulting sites from a single unified SwiftBook dashboard.',
    },
    {
      q: 'What is the Model Context Protocol (MCP) server at /api/mcp?',
      a: 'The SwiftBook MCP endpoint exposes native booking tools to AI agents in Claude Desktop, Cursor, and custom bots. Authorized agents can query available calendar slots, quote rate cards, and record client bookings autonomously.',
    },
    {
      q: 'Which channels are supported for team notification dispatch?',
      a: 'SwiftBook natively supports Telegram bots, WhatsApp Business API, Slack incoming webhooks, and team mailers. You can toggle any channel on or off with 1 click.',
    },
    {
      q: 'Is there any coding required to install SwiftBook?',
      a: 'No coding required. Just copy your unique site API key and webhook endpoint, and paste it into Webflow, WordPress, Framer, Squarespace, or your custom booking backend.',
    },
  ];

  const customerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
  ];

  return (
    <div className="space-y-14 md:space-y-20 pb-20 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Exactly Matching SupaBird's Layout & Rhythm) */}
      {/* ============================================================ */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-5xl mx-auto text-center">
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-[#ffece6] via-[#dbebff]/40 to-[#fffed4]/30 blur-[130px] -z-10 pointer-events-none dark:opacity-20" />

        {/* SupaBird Floating Badge with Bird Icon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-8 shadow-sm backdrop-blur-sm"
        >
          <Logo variant="icon" size="xs" />
          <span className="font-semibold text-[#f35921]">SWIFTBOOK</span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span>Zero Missed Confirmations</span>
        </motion.div>

        {/* SupaBird Giant Heading with Stylish Orange Serif Accent & Natural Luminous Blur Halo */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.04] max-w-4xl mx-auto"
        >
          Deliver Your Bookings{' '}
          <span className="relative inline-block font-editorial text-[#f35921] font-normal tracking-normal text-[1.14em]">
            {/* Ambient Blurred Radial Glow Halo - fluid and borderless */}
            <span
              aria-hidden="true"
              className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-[#f35921]/40 via-[#ff7c42]/50 to-[#ff9e3b]/40 blur-2xl rounded-full -z-10 select-none pointer-events-none animate-pulse"
            />
            {/* Soft Blurred Aura directly behind the letters */}
            <span
              aria-hidden="true"
              className="absolute inset-0 text-[#f35921] blur-[6px] opacity-85 select-none pointer-events-none"
            >
              2x Faster.
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 text-[#ff682b] blur-[14px] opacity-65 select-none pointer-events-none"
            >
              2x Faster.
            </span>
            {/* Crisp Glowing Text */}
            <span className="relative text-[#f35921] [text-shadow:0_0_24px_rgba(243,89,33,0.65),0_0_48px_rgba(243,89,33,0.3)]">
              2x Faster.
            </span>
          </span>
        </motion.h1>

        {/* Subtitle from SwiftBook Base44 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          SwiftBook listens to every site you connect and sends confirmed bookings, deposits and inquiries straight to the channels your team already uses.
        </motion.p>

        {/* SupaBird Black Pill CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3"
        >
          <Link
            to="/app"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Instant setup • 1,000 webhook pings included</span>
          </div>
        </motion.div>

        {/* SupaBird Social Proof: Avatars + Stars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400"
        >
          <div className="flex -space-x-2">
            {customerAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="user avatar"
                className="w-8 h-8 rounded-full border-2 border-white dark:border-[#12141c] object-cover"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              trusted by fast-moving teams & creators
            </span>
          </div>
        </motion.div>

      </section>

      {/* ============================================================ */}
      {/* 2. THE 4 BENTO CARDS (Matching SupaBird's 4 Graphic Feature Bento) */}
      {/* ============================================================ */}
      <section id="features" className="max-w-7xl mx-auto px-6 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-xs font-mono font-medium mb-2.5 text-zinc-600 dark:text-zinc-400">
            <span>✦ FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Built for fast-moving businesses that need{' '}
            <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
              clarity.
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Everything you need to automate booking notifications, route deposits, and keep your calendar synchronized.
          </p>
        </div>

        {/* 4 SupaBird-Style Snug Graphic Bento Cards with Blur Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* CARD 1: Real-time delivery (Peach / Coral tint #ffece6) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] p-6 sm:p-7 bg-[#ffece6]/60 dark:bg-[#1a1413] border border-orange-500/10 flex flex-col justify-start space-y-3.5 relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* React Bits Shape Blur Edge Accent */}
            <ShapeBlur position="top-right" color="#f35921" size="md" opacity={0.35} />

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-[#f35921] font-mono text-xs font-semibold mb-2 shadow-sm">
                Real-time delivery
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1">
                Never miss a booking
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-md">
                The moment a booking is confirmed or a deposit lands, SwiftBook pushes the details to every channel you linked.
              </p>
            </div>

            {/* Graphic UI inside Card 1 (Snug, directly below text) */}
            <div className="rounded-2xl bg-white dark:bg-[#201918] p-4 border border-orange-500/10 shadow-[0_4px_20px_rgba(243,89,33,0.04)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-[#f35921] flex items-center justify-center font-bold">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white">New Booking Received</div>
                    <div className="text-[10px] text-zinc-400 font-mono">Dispatched to 3 channels</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#f35921] bg-orange-500/10 px-2 py-0.5 rounded-full">
                  12ms
                </span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-black/30 font-mono text-[11px] text-zinc-600 dark:text-zinc-400 flex justify-between">
                <span>Client: David Sterling</span>
                <span className="text-emerald-500 font-semibold">{currency.symbol}{currency.code === 'NGN' ? '150,000' : '350.00'} Deposit</span>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: One key per site (Sky Blue tint #dbebff) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] p-6 sm:p-7 bg-[#dbebff]/60 dark:bg-[#121824] border border-blue-500/10 flex flex-col justify-start space-y-3.5 relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* React Bits Shape Blur Edge Accent */}
            <ShapeBlur position="bottom-left" color="#0099ff" size="sm" opacity={0.3} />

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold mb-2 shadow-sm">
                One key per site
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1">
                Connect in two minutes
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-md">
                Generate an API key for each site, drop it into your webhook, and start receiving events before lunch.
              </p>
            </div>

            {/* Graphic UI inside Card 2 (Snug, directly below text) */}
            <div className="rounded-2xl bg-white dark:bg-[#161f2e] p-4 border border-blue-500/10 shadow-[0_4px_20px_rgba(0,153,255,0.04)] space-y-2.5 font-mono">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>SITE INGEST TOKEN</span>
                <button
                  onClick={handleCopyKey}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-black/30 text-xs text-zinc-900 dark:text-white flex items-center justify-between">
                <span className="text-[11px] truncate">sk_live_ll_4e77c8231d990bc1</span>
                <StatusMark status="done" size={14} />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>Status: Connected</span>
                <span className="text-emerald-500">200 Ready</span>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Master calendar (Warm Cream tint #eddfd0) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] p-6 sm:p-7 bg-[#eddfd0]/60 dark:bg-[#1a1714] border border-amber-500/10 flex flex-col justify-start space-y-3.5 relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-semibold mb-2 shadow-sm">
                Master calendar
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1">
                See every booked date
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-md">
                Confirmed sessions and blocked dates land on your calendar the instant they happen across all your sites.
              </p>
            </div>

            {/* Graphic UI inside Card 3 (Snug, directly below text) */}
            <div className="rounded-2xl bg-white dark:bg-[#201d19] p-4 border border-amber-500/10 shadow-[0_4px_20px_rgba(230,168,23,0.04)] space-y-2">
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-zinc-400 mb-0.5 font-semibold">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                  <div
                    key={d}
                    className={`py-1.5 rounded-lg text-xs font-bold ${
                      d === 4 || d === 6
                        ? 'bg-[#f35921] text-white shadow-sm'
                        : d === 1
                        ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 line-through'
                        : 'bg-zinc-100 dark:bg-black/30 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 pt-1.5 border-t border-black/5 dark:border-white/5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f35921]" /> Booked</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" /> Off Limits</span>
              </div>
            </div>
          </motion.div>

          {/* CARD 4: FAQ agent (Butter Yellow tint #fffed4) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] p-6 sm:p-7 bg-[#fffed4]/60 dark:bg-[#1a1a12] border border-yellow-500/10 flex flex-col justify-start space-y-3.5 relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* React Bits Shape Blur Edge Accent */}
            <ShapeBlur position="top-right" color="#eab308" size="sm" opacity={0.25} />

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-yellow-800 dark:text-yellow-400 font-mono text-xs font-semibold mb-2 shadow-sm">
                FAQ agent
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1">
                Answer clients instantly
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-md">
                Your agent replies with your rates, packages and policies the second a client asks — before you even see it.
              </p>
            </div>

            {/* Graphic UI inside Card 4 (Snug, directly below text) */}
            <div className="rounded-2xl bg-white dark:bg-[#202017] p-4 border border-yellow-500/10 shadow-[0_4px_20px_rgba(255,200,0,0.04)] space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-black/30 text-zinc-700 dark:text-zinc-300 italic text-[11px]">
                “What packages do you offer and what is the deposit?”
              </div>
              <div className="p-2.5 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/20 text-zinc-900 dark:text-white text-[11px] leading-relaxed border border-yellow-500/20">
                <strong>AI Agent:</strong> We offer tiers starting at {currency.symbol}{currency.code === 'NGN' ? '150,000' : '350'}. Sessions require a 25% deposit to lock in your date. Sneak peeks deliver in 24 hours.
              </div>
            </div>
          </motion.div>

        </div>

      </section>

      {/* ============================================================ */}
      {/* 3. MULTI-CHANNEL FANOUT (Placed Above Problems We Solve, Image 1 Style) */}
      {/* ============================================================ */}
      <MultiChannelFanout />

      {/* ============================================================ */}
      {/* 4. THE PROBLEMS WE SOLVE (Matching SupaBird Image 2: Avatars + Quotes + Curved Arrows + Reactive Cards) */}
      {/* ============================================================ */}
      <ProblemsWeSolve />

      {/* ============================================================ */}
      {/* 5. VERIFIED TESTIMONIALS (From SwiftBook Base44 Bundle) */}
      {/* ============================================================ */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-xs font-mono font-medium mb-3 text-zinc-600 dark:text-zinc-400">
            <span>✦ VERIFIED FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Studios and businesses love{' '}
            <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
              SwiftBook.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Daniel K.',
              handle: '@danielshoots',
              quote: 'Honest logs mean I trust every “sent.” No more guessing if Slack actually got the notification.',
              color: '#229ED9',
            },
            {
              name: 'Tola A.',
              handle: '@tolafilms',
              quote: 'One API key per site and we were connected before lunch. Our second site was connected before dinner.',
              color: '#f35921',
            },
            {
              name: 'Grace M.',
              handle: '@graceframes',
              quote: 'Deposits, confirmations, inquiries — all routed to the channels we already live in. Game changer.',
              color: '#4A154B',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-[28px] p-8 bg-white dark:bg-[#12141c] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6 relative overflow-hidden ${
                idx > 0 ? 'hidden md:flex' : 'flex'
              }`}
            >
              {idx === 0 && (
                <ShapeBlur position="bottom-right" color="#229ED9" size="sm" opacity={0.25} />
              )}

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                “{item.quote}”
              </p>

              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-950 dark:text-white">{item.name}</span>
                <span className="font-mono text-zinc-400">{item.handle}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. BOTTOM CTA HERO (Matching SupaBird's High-Converting Finish) */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[36px] p-10 md:p-16 bg-gradient-to-b from-[#ffffff] to-[#f4f4ee] dark:from-[#151722] dark:to-[#0f1118] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-6 relative overflow-hidden"
        >
          {/* React Bits Shape Blur Edge Accents */}
          <ShapeBlur position="top-left" color="#f35921" size="lg" opacity={0.3} />
          <ShapeBlur position="bottom-right" color="#ff7c42" size="md" opacity={0.25} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium">
            <Logo variant="icon" size="xs" />
            <span>START TODAY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Ready to stop missing{' '}
            <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
              confirmations?
            </span>
          </h2>

          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Generate an API key for each site and send confirmed bookings and deposits straight to the channels your team watches.
          </p>

          <div className="pt-4">
            <Link
              to="/app"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 7. FREQUENTLY ASKED QUESTIONS (Below CTA) */}
      {/* ============================================================ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 space-y-8 pt-4">
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Everything you need to{' '}
            <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
              know.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Got questions? We've got answers. You can also chat with our AI agent anytime via the chat button in the corner.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-white dark:bg-[#12141c] overflow-hidden transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-zinc-900 dark:text-white cursor-pointer select-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#f35921]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-black/[0.04] dark:border-white/[0.04] mt-1 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
