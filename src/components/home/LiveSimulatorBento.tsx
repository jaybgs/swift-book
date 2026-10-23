import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  Terminal, 
  Sparkles, 
  Bell, 
  Clock, 
  Calendar, 
  DollarSign,
  User,
  Zap,
  Mail,
  Building,
  PartyPopper,
  Briefcase
} from 'lucide-react';
import { useSwiftBook } from '../../context/SwiftBookContext';
import { StatusMark } from '../reactbits';

export const LiveSimulatorBento: React.FC = () => {
  const { activeSite, dispatchTestNotification, events, terminology } = useSwiftBook();
  const [selectedChannel, setSelectedChannel] = useState<'telegram' | 'whatsapp' | 'slack' | 'email'>('telegram');
  const [eventType, setEventType] = useState<'booking_confirmed' | 'deposit_received' | 'inquiry_received'>('booking_confirmed');
  const [isDispatching, setIsDispatching] = useState(false);
  const [lastDispatchedEvent, setLastDispatchedEvent] = useState(events[0]);

  const handleSimulate = () => {
    setIsDispatching(true);
    dispatchTestNotification(selectedChannel, eventType);
    
    setTimeout(() => {
      setIsDispatching(false);
      setLastDispatchedEvent(events[0]);
    }, 600);
  };

  return (
    <section id="live-simulator" className="py-12 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium mb-3">
          <Zap className="w-3.5 h-3.5" /> INTERACTIVE WEBHOOK SIMULATOR
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          See notifications arrive{' '}
          <span className="font-editorial text-[#f35921] font-normal text-[1.15em]">
            before your client blinks.
          </span>
        </h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Trigger a simulated client event and watch the live webhook route directly into your target communication channel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Bento: Controls & Dispatch Engine (5 cols) */}
        <div className="lg:col-span-5 bento-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
            <div>
              <h3 className="font-semibold text-base text-zinc-900 dark:text-white">
                Dispatch Playground
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Connected Site: <span className="font-semibold text-[#f35921]">{activeSite.name}</span> ({activeSite.profession.replace('_', ' ')})
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusMark status="done" size={20} />
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                Ingest Active
              </span>
            </div>
          </div>

          {/* Event Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider font-mono">
              Event Trigger
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'booking_confirmed', label: terminology.jobNoun + ' Confirmed' },
                { id: 'deposit_received', label: 'Deposit' },
                { id: 'inquiry_received', label: 'Inquiry' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setEventType(item.id as any)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-medium border text-center transition-all truncate ${
                    eventType === item.id
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-sm'
                      : 'border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target Channel Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider font-mono">
              Target Channel Preview
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'telegram', name: 'Telegram Bot', icon: Send, color: '#229ED9' },
                { type: 'whatsapp', name: 'WhatsApp API', icon: Smartphone, color: '#25D366' },
                { type: 'slack', name: 'Slack Webhook', icon: Laptop, color: '#4A154B' },
                { type: 'email', name: 'Email Dispatch', icon: Mail, color: '#f35921' },
              ].map(chan => {
                const Icon = chan.icon;
                const isSelected = selectedChannel === chan.type;
                return (
                  <button
                    key={chan.type}
                    onClick={() => setSelectedChannel(chan.type as any)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-orange-500/50 bg-orange-500/5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-orange-500/20'
                        : 'border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 text-[10px] font-bold"
                      style={{ backgroundColor: chan.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium truncate">{chan.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ingest Pipeline Flow visualizer */}
          <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-zinc-500">
              <span>ENDPOINT:</span>
              <span className="text-zinc-900 dark:text-zinc-200">/functions/ingestSiteEvent</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>AUTH:</span>
              <span className="text-zinc-900 dark:text-zinc-200">{activeSite.apiKey.slice(0, 14)}...</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>FANOUT:</span>
              <span className="text-emerald-500 font-semibold">Sub-20ms Multi-Channel</span>
            </div>
          </div>

          {/* Simulate Action Button */}
          <button
            onClick={handleSimulate}
            disabled={isDispatching}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#f35921] hover:bg-[#e04a14] active:scale-[0.99] text-white font-semibold text-sm shadow-[0_0_20px_rgba(243,89,33,0.3)] transition-all disabled:opacity-50"
          >
            {isDispatching ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Dispatching Webhook...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Send Simulated Webhook to {selectedChannel.toUpperCase()}
              </span>
            )}
          </button>
        </div>

        {/* Right Bento: Realistic Device Mockup Preview (7 cols) */}
        <div className="lg:col-span-7 bento-card p-6 md:p-8 overflow-hidden relative min-h-[460px] flex flex-col justify-between">
          <div>
            {/* Mock Device Header */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-mono text-zinc-400 ml-2">
                  preview::{selectedChannel}.channel
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                Latency: <span className="text-emerald-500 font-semibold">12ms</span>
              </div>
            </div>

            {/* Dynamic Realistic Channel UI Mockup */}
            <AnimatePresence mode="wait">
              {selectedChannel === 'telegram' && (
                <motion.div
                  key="telegram"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md mx-auto rounded-2xl bg-[#0f172a] text-white p-5 shadow-2xl border border-sky-500/20"
                >
                  <div className="flex items-center justify-between border-b border-sky-500/20 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#229ED9] flex items-center justify-center text-white text-xs font-bold">
                        <Send className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">SwiftBook Dispatch Bot</div>
                        <div className="text-[10px] text-sky-400">@swiftbook_alerts_bot</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">14:28</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="inline-block px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px] font-semibold">
                      ⚡ NEW {terminology.jobNoun.toUpperCase()} CONFIRMED
                    </div>
                    <div className="font-semibold text-sm text-slate-100">
                      {lastDispatchedEvent?.packageName || 'Executive Estate Property Walkthrough'}
                    </div>
                    <div className="text-slate-300 text-[11px] space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Client:</span>
                        <span className="font-medium text-white">{lastDispatchedEvent?.clientName || 'David K. Sterling'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Schedule:</span>
                        <span className="font-medium text-amber-300">{lastDispatchedEvent?.shootDate || '2026-11-04'} • {lastDispatchedEvent?.shootTime || '2:00 PM'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Value / Deposit:</span>
                        <span className="font-medium text-emerald-400 font-mono">${lastDispatchedEvent?.totalPrice || '350.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Reference:</span>
                        <span className="font-mono text-sky-400">{lastDispatchedEvent?.bookingReference || 'SB-LL-40192'}</span>
                      </div>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg bg-[#229ED9] hover:bg-[#1b8ec5] text-white text-[11px] font-semibold text-center">
                        View Schedule
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-medium">
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedChannel === 'slack' && (
                <motion.div
                  key="slack"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md mx-auto rounded-2xl bg-white dark:bg-[#181a24] text-zinc-900 dark:text-white p-5 shadow-2xl border-l-4 border-l-[#4A154B] border border-black/10 dark:border-white/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-[#4A154B] flex items-center justify-center text-white text-xs font-bold">
                      #
                    </div>
                    <span className="font-bold text-xs">business-bookings</span>
                    <span className="text-[10px] text-zinc-400 font-mono">APP • Just now</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Client Booking Received — {activeSite.name}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                      A new {terminology.bookingNoun} was booked by <strong className="text-zinc-900 dark:text-white">{lastDispatchedEvent?.clientName || 'David K. Sterling'}</strong>. Confirmation payload delivered.
                    </p>
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 text-[11px] font-mono">
                      <div>
                        <span className="text-zinc-400 block text-[10px]">PACKAGE / TIER</span>
                        <span className="font-medium truncate block">{lastDispatchedEvent?.packageName}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px]">TOTAL VALUE</span>
                        <span className="font-medium text-emerald-500">${lastDispatchedEvent?.totalPrice}.00</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedChannel === 'whatsapp' && (
                <motion.div
                  key="whatsapp"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md mx-auto rounded-2xl bg-[#0b141a] text-white p-5 shadow-2xl border border-emerald-500/20"
                >
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">SwiftBook Alerts</div>
                        <div className="text-[10px] text-emerald-400 font-mono">+1 (555) 392-8190</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">14:28 ✓✓</span>
                  </div>

                  <div className="bg-[#1f2c34] p-3.5 rounded-2xl text-xs space-y-2 border border-emerald-500/10">
                    <div className="font-bold text-emerald-400 text-xs">
                      🏢 {activeSite.name} — New {terminology.jobNoun}
                    </div>
                    <p className="text-slate-200 text-[11px] leading-relaxed">
                      Hello Team! A new reservation request arrived from <strong className="text-white">{lastDispatchedEvent?.clientName || 'David K. Sterling'}</strong> ({lastDispatchedEvent?.clientEmail}).
                    </p>
                    <div className="bg-[#111b21] p-2.5 rounded-xl text-[10px] font-mono space-y-1">
                      <div>🗓 <strong>Date:</strong> {lastDispatchedEvent?.shootDate} ({lastDispatchedEvent?.shootTime})</div>
                      <div>💳 <strong>Total:</strong> ${lastDispatchedEvent?.totalPrice}</div>
                      <div>🏷 <strong>Ref:</strong> {lastDispatchedEvent?.bookingReference}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedChannel === 'email' && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md mx-auto rounded-2xl bg-white dark:bg-[#181a24] text-zinc-900 dark:text-white p-5 shadow-2xl border border-black/10 dark:border-white/10"
                >
                  <div className="border-b border-black/5 dark:border-white/5 pb-3 mb-3 text-xs">
                    <div className="flex justify-between text-zinc-400 text-[10px] font-mono">
                      <span>FROM: alerts@swiftbook.app</span>
                      <span>Just now</span>
                    </div>
                    <div className="font-bold text-sm text-zinc-900 dark:text-white mt-1">
                      {terminology.jobNoun} Confirmed: {lastDispatchedEvent?.packageName}
                    </div>
                  </div>

                  <div className="text-xs space-y-3">
                    <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">
                      Your {terminology.bookingNoun} with {activeSite.name} is locked in. The date has been reserved on the master schedule.
                    </p>
                    <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 text-[11px] font-mono space-y-1">
                      <div className="text-[#f35921] font-bold">CALENDAR INVITATION (.ICS) INCLUDED</div>
                      <div>Client: {lastDispatchedEvent?.clientName}</div>
                      <div>Date: {lastDispatchedEvent?.shootDate}</div>
                      <div>Time Slot: {lastDispatchedEvent?.shootTime}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Live Feed Status */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Site Key: {activeSite.apiKey.slice(0, 10)}•••</span>
            <span className="text-emerald-500 font-semibold">Status: 200 OK</span>
          </div>
        </div>

      </div>
    </section>
  );
};
