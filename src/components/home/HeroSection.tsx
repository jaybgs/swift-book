import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { useSwiftBook } from '../../context/SwiftBookContext';

export const HeroSection: React.FC = () => {
  const { channels } = useSwiftBook();

  const scrollToSimulator = () => {
    const el = document.getElementById('live-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-16 md:pt-24 pb-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#f35921]/15 to-[#0099ff]/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* SupaBird Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#f35921] animate-ping" />
          <span className="font-semibold text-[#f35921]">✦ SWIFTBOOK 2.0</span>
          <span className="text-zinc-400">|</span>
          <span>Zero Missed Confirmations</span>
        </motion.div>

        {/* SupaBird Kinetic Heading with Italic Serif Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] max-w-4xl mx-auto"
        >
          Honest booking delivery for businesses that can't afford a{' '}
          <span className="font-editorial text-[#f35921] font-normal tracking-normal text-[1.12em]">
            missed confirmation.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          SwiftBook listens to every site you connect. Confirmed bookings, earnest deposits, scheduled viewings, and inquiries land straight in Telegram, WhatsApp, Slack, and Email the moment they happen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#f35921] hover:bg-[#e04a14] text-white font-semibold text-sm shadow-[0_0_25px_rgba(243,89,33,0.35)] hover:shadow-[0_0_35px_rgba(243,89,33,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Layers className="w-4 h-4" />
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={scrollToSimulator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#13151c] text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-black/10 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-[#1a1d26] transition-all shadow-sm"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Test Live Ingest Simulator
          </button>
        </motion.div>

        {/* Delivery Channels Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] max-w-3xl mx-auto"
        >
          <div className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono mb-4">
            Delivered directly to the channels your team already lives in
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {channels.map(channel => (
              <div
                key={channel.type}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 dark:bg-[#12141a]/80 border border-black/[0.05] dark:border-white/[0.06] shadow-sm backdrop-blur-sm text-left"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 text-xs font-bold"
                  style={{ backgroundColor: channel.color }}
                >
                  {channel.type[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate capitalize">
                    {channel.type}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {channel.pingsCount} delivered
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
