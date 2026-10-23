import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Smartphone, 
  Laptop, 
  Mail, 
  Zap, 
  Check, 
  Copy, 
  ExternalLink,
  Calendar as CalendarIcon,
  Sparkles,
  CheckCheck
} from 'lucide-react';
import { SquishSwitch } from '../reactbits';

export const MultiChannelFanout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'telegram' | 'whatsapp' | 'slack' | 'email'>('telegram');
  const [channelToggles, setChannelToggles] = useState({
    telegram: true,
    whatsapp: true,
    slack: true,
    email: true,
  });

  const [pingStates, setPingStates] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [mcpCopied, setMcpCopied] = useState(false);

  const MCP_ENDPOINT = 'https://swift-book.base44.app/api/mcp';

  const handleCopyMcp = () => {
    navigator.clipboard.writeText(MCP_ENDPOINT);
    setMcpCopied(true);
    setTimeout(() => setMcpCopied(false), 2200);
  };

  const triggerPing = (channel: string) => {
    setPingStates(prev => ({ ...prev, [channel]: true }));
    setTimeout(() => {
      setPingStates(prev => ({ ...prev, [channel]: false }));
    }, 1200);
  };

  const copyWebhook = (key: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const channels = [
    {
      id: 'telegram',
      initial: 'T',
      name: 'Telegram Bot Alert',
      pill: '@goldenhour_bookings_bot',
      description: 'Instant push alerts with client name, shoot slot, and deposit confirmation.',
      color: '#229ED9',
      bgColor: '#eef8fc',
      webhookUrl: 'https://api.telegram.org/bot720491/sendMessage',
      samplePayload: {
        title: 'New Booking Confirmed 📸',
        client: 'David K. Sterling',
        slot: 'Nov 04 • 2:00 PM',
        deposit: '₦150,000 Locked (25%)',
        status: 'Delivered in 12ms',
      },
    },
    {
      id: 'whatsapp',
      initial: 'W',
      name: 'WhatsApp Business API',
      pill: '+1 (555) 392-8190',
      description: 'Two-way client message ping allowing direct 1-tap client call or reply.',
      color: '#25D366',
      bgColor: '#effbf3',
      webhookUrl: 'https://graph.facebook.com/v18.0/messages',
      samplePayload: {
        title: 'Client Chat Ping 💬',
        client: 'Elena Vance (+1 555-891-2041)',
        message: '“Hey! Just locked the ₦80,000 deposit for our photoshoot.”',
        replyReady: '1-tap reply ready',
      },
    },
    {
      id: 'slack',
      initial: 'S',
      name: 'Slack Ingest Webhook',
      pill: '#studio-bookings',
      description: 'Structured rich card posted to #studio-bookings with deposit breakdown & notes.',
      color: '#4A154B',
      bgColor: '#fbf4fb',
      webhookUrl: 'https://hooks.slack.com/services/T04G/B08E/#studio-bookings',
      samplePayload: {
        channel: '#studio-bookings',
        event: 'Deposit Verified: ₦220,000 (Paystack)',
        client: 'Amara Creatives Ltd',
        notes: 'Full studio lighting required.',
      },
    },
    {
      id: 'email',
      initial: 'E',
      name: 'Studio Master Email',
      pill: 'bookings@goldenhour.studio',
      description: 'HTML receipt sent to client and calendar .ics invite delivered to studio owner.',
      color: '#ea580c',
      bgColor: '#fff7f2',
      webhookUrl: 'smtp://master.goldenhour.studio',
      samplePayload: {
        subject: 'Confirmed: Golden Hour Session #SB-9821',
        attachment: 'invite_nov_04.ics (Attached)',
        recipient: 'bookings@goldenhour.studio',
      },
    },
  ];

  return (
    <section id="channels" className="max-w-7xl mx-auto px-6 py-6">
      
      {/* Header Matching SupaBird Typography with Blur Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center space-y-3 mb-8"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium">
          <span>✦ MULTI-CHANNEL FANOUT</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
          Telegram, WhatsApp, Slack and Email.{' '}
          <span className="font-editorial text-[#f35921] font-normal text-[1.12em] block sm:inline">
            Link them in two minutes.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Link the ones your team already lives in — no new apps to install or tabs to leave open.
        </p>
      </motion.div>

      {/* ============================================================ */}
      {/* PROMINENT HIGH-IMPACT MCP SERVER EMBED ACTION BANNER */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mx-auto mb-10 px-2"
      >
        <div className="relative rounded-3xl p-6 sm:p-7 bg-[#12141c] text-white border border-orange-500/30 shadow-[0_12px_40px_rgba(243,89,33,0.18)] overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#f35921]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#ff8800]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Explanatory Copy & URL */}
            <div className="space-y-2 max-w-xl text-left">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f35921]/20 text-[#ff804a] text-xs font-mono font-semibold border border-[#f35921]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#f35921] animate-spin" style={{ animationDuration: '4s' }} />
                  NATIVE MODEL CONTEXT PROTOCOL (MCP)
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE • 200 READY
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                Connect SwiftBook to Claude, Cursor & AI Agents
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                This is your live <strong className="text-white">SwiftBook MCP Server</strong> endpoint. AI tools and agents use this to inspect booked slots, lock deposits, and dispatch alerts autonomously.
              </p>

              {/* Code Box Displaying the MCP URL */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 w-full sm:w-auto overflow-x-auto">
                <span className="text-[#f35921] font-bold select-none">MCP URL:</span>
                <code className="text-amber-300 select-all font-semibold">
                  https://swift-book.base44.app/api/mcp
                </code>
              </div>
            </div>

            {/* Right: BIG INTERACTIVE COPY BUTTON */}
            <div className="w-full md:w-auto shrink-0 flex flex-col items-center sm:items-end gap-2">
              <motion.button
                onClick={handleCopyMcp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f35921] to-[#ff733b] hover:from-[#e04f1a] hover:to-[#f35921] text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(243,89,33,0.45)] transition-all cursor-pointer group"
              >
                {mcpCopied ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>MCP Copied to Clipboard! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <span>+ Copy MCP Endpoint ✨</span>
                  </>
                )}
              </motion.button>
              <span className="text-[11px] font-mono text-zinc-400">
                1-tap copy for Claude Desktop / Cursor
              </span>
            </div>

          </div>
        </div>
      </motion.div>

      {/* 4 Interactive Feature Cards with Blur Scroll Animation (Desktop Only, hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {channels.map((chan, idx) => {
          const isEnabled = channelToggles[chan.id as keyof typeof channelToggles];
          const isPinging = pingStates[chan.id];
          const isCopied = copiedKey === chan.id;

          return (
            <motion.div
              key={chan.id}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-[32px] p-6 bg-white dark:bg-[#12141c] border border-black/[0.07] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div>
                {/* Top Row: Pill Tag + Switch */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 truncate max-w-[170px]">
                    {chan.pill}
                  </span>

                  <SquishSwitch
                    checked={isEnabled}
                    onChange={() =>
                      setChannelToggles(prev => ({
                        ...prev,
                        [chan.id]: !prev[chan.id as keyof typeof channelToggles],
                      }))
                    }
                    width={40}
                    height={22}
                    trackOnColor={chan.color}
                    trackColor="#cbd5e1"
                  />
                </div>

                {/* Rich Reactive Mockup inside the Card (Image 1 Style) */}
                <div
                  className="rounded-2xl p-4 border border-black/[0.05] dark:border-white/[0.05] space-y-2.5 text-xs transition-colors mb-5"
                  style={{ backgroundColor: chan.bgColor }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm"
                        style={{ backgroundColor: chan.color }}
                      >
                        {chan.initial}
                      </div>
                      <span className="font-semibold text-zinc-900 text-xs">
                        {chan.name.split(' ')[0]}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-400">
                      {isPinging ? 'Pinging...' : 'Just now'}
                    </span>
                  </div>

                  {/* Channel-Specific Interactive Preview */}
                  {chan.id === 'telegram' && (
                    <div className="p-2.5 rounded-xl bg-white/90 dark:bg-black/30 border border-black/[0.04] space-y-1">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center justify-between">
                        <span>{chan.samplePayload.title}</span>
                        <span className="text-[9px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                          PUSH
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-700 dark:text-zinc-300">
                        {chan.samplePayload.client} • {chan.samplePayload.slot}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-600 font-semibold">
                        {chan.samplePayload.deposit}
                      </div>
                    </div>
                  )}

                  {chan.id === 'whatsapp' && (
                    <div className="p-2.5 rounded-xl bg-white/90 dark:bg-black/30 border border-black/[0.04] space-y-1">
                      <div className="text-[10px] font-mono text-zinc-400 font-semibold">
                        {chan.samplePayload.client}
                      </div>
                      <div className="text-[11px] text-zinc-700 dark:text-zinc-300 italic">
                        {chan.samplePayload.message}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold pt-0.5">
                        <CheckCheck className="w-3 h-3 text-[#229ED9]" />
                        <span>Client confirmed</span>
                      </div>
                    </div>
                  )}

                  {chan.id === 'slack' && (
                    <div className="p-2.5 rounded-xl bg-white/90 dark:bg-black/30 border-l-4 border-l-[#4A154B] border-black/[0.04] space-y-1">
                      <div className="font-mono text-[10px] text-zinc-500 font-semibold">
                        {chan.samplePayload.channel}
                      </div>
                      <div className="text-[11px] font-bold text-zinc-900 dark:text-white">
                        {chan.samplePayload.event}
                      </div>
                      <div className="text-[10px] text-zinc-600 dark:text-zinc-400">
                        {chan.samplePayload.notes}
                      </div>
                    </div>
                  )}

                  {chan.id === 'email' && (
                    <div className="p-2.5 rounded-xl bg-white/90 dark:bg-black/30 border border-black/[0.04] space-y-1.5">
                      <div className="font-semibold text-[11px] text-zinc-900 dark:text-white truncate">
                        {chan.samplePayload.subject}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-100 text-[#ea580c] text-[10px] font-mono font-medium">
                        <CalendarIcon className="w-2.5 h-2.5" />
                        <span>{chan.samplePayload.attachment}</span>
                      </div>
                    </div>
                  )}

                  {/* Reactive Action Button inside preview */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => triggerPing(chan.id)}
                      disabled={!isEnabled || isPinging}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-semibold hover:opacity-90 active:scale-95 transition-transform disabled:opacity-40"
                    >
                      <Zap className={`w-3 h-3 ${isPinging ? 'animate-bounce text-[#f35921]' : ''}`} />
                      <span>{isPinging ? 'Sent!' : 'Send Ping'}</span>
                    </button>

                    <button
                      onClick={() => copyWebhook(chan.id, chan.webhookUrl)}
                      className="text-[10px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Webhook</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Serif Title Matching Image 1 */}
                <h3 className="text-xl font-bold font-serif text-zinc-950 dark:text-white tracking-tight">
                  {chan.name}
                </h3>
              </div>

              {/* Description from Base44 */}
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-black/[0.05] dark:border-white/[0.06] pt-4">
                {chan.description}
              </p>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
