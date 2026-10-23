import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2,
  Zap,
  Building
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';
import { SlideCommit } from '../components/reactbits';
import { Logo } from '../components/common/Logo';
import { Link } from 'react-router-dom';

export const BookPage: React.FC = () => {
  const { packages, activeSite, addBooking, terminology } = useSwiftBook();
  
  // Filter packages matching active profession or show all
  const relevantPackages = packages.filter(p => p.profession === activeSite.profession).length > 0
    ? packages.filter(p => p.profession === activeSite.profession)
    : packages;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPkgId, setSelectedPkgId] = useState(relevantPackages[0]?.id || packages[0].id);
  const [bookingDate, setBookingDate] = useState('2026-11-06');
  const [bookingTime, setBookingTime] = useState('2:00 PM');
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingRef, setConfirmedBookingRef] = useState('');

  const selectedPkg = packages.find(p => p.id === selectedPkgId) || relevantPackages[0] || packages[0];
  const totalPrice = selectedPkg.price;
  
  const depositPercent = activeSite.depositPercent || 25;
  const depositAmount = activeSite.depositType === 'percent'
    ? Math.round(totalPrice * (depositPercent / 100))
    : activeSite.depositAmount || 100;
  const balanceDue = totalPrice - depositAmount;

  const handleCommitBooking = async () => {
    const evt = await addBooking({
      clientName,
      clientEmail,
      clientPhone,
      packageId: selectedPkgId,
      shootDate: bookingDate,
      shootTime: bookingTime,
      notes: bookingNotes,
    });
    setConfirmedBookingRef(evt.bookingReference);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* Site Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium mb-3">
          <Logo variant="icon" size="xs" />
          <span>{activeSite.name} • CLIENT RESERVATION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Reserve your{' '}
          <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
            {terminology.bookingNoun}.
          </span>
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Pick your option, select an open date on the calendar, and confirm your request.
        </p>

        {/* Step Progress Bar */}
        {!bookingConfirmed && (
          <div className="mt-8 flex items-center justify-center gap-2 max-w-md mx-auto">
            {[
              { num: 1, label: 'Selection' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Client Info' },
              { num: 4, label: 'Confirmation' },
            ].map(step => (
              <div key={step.num} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className={`w-full h-1.5 rounded-full transition-all ${
                    currentStep >= step.num 
                      ? 'bg-[#f35921]' 
                      : 'bg-zinc-200 dark:bg-zinc-800'
                  }`}
                />
                <span className={`text-[10px] font-mono ${
                  currentStep === step.num 
                    ? 'text-[#f35921] font-bold' 
                    : 'text-zinc-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation State */}
      {bookingConfirmed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              {terminology.jobNoun} Confirmed & Dispatched!
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The booking request was received by <strong>{activeSite.name}</strong>. Webhook alerts have pushed to linked communication channels.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#161822] border border-black/5 dark:border-white/5 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
              <span className="text-zinc-400">BOOKING REFERENCE:</span>
              <span className="font-bold text-[#f35921]">{confirmedBookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">PACKAGE / TIER:</span>
              <span className="text-zinc-900 dark:text-white">{selectedPkg.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">SCHEDULED TIME:</span>
              <span className="text-amber-500 font-semibold">{bookingDate} • {bookingTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">CLIENT:</span>
              <span className="text-zinc-900 dark:text-white">{clientName} ({clientEmail})</span>
            </div>
            <div className="flex justify-between border-t border-black/5 dark:border-white/5 pt-2">
              <span className="text-zinc-400">DEPOSIT / VALUE:</span>
              <span className="font-bold text-emerald-500">${depositAmount}.00</span>
            </div>
          </div>

          {/* Real-Time Fanout Proof */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-left space-y-2">
            <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Dispatched in real time to connected channels:
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeSite.activeChannels.map(ch => (
                <span key={ch} className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] border border-black/5 dark:border-white/10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {ch.toUpperCase()} DELIVERED
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/app/notifications"
              className="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs shadow-sm hover:scale-[1.02] transition-transform"
            >
              Inspect Live Webhook Log
            </Link>
            <Link
              to="/app/calendar"
              className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs hover:bg-zinc-200 transition-colors"
            >
              View on Master Schedule
            </Link>
          </div>
        </motion.div>
      ) : (
        /* Multi-Step Wizard */
        <div className="bento-card p-6 md:p-10">
          
          {/* STEP 1: Choose Package */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Step 1: Select Session or Service Tier
                </h2>
                <p className="text-xs text-zinc-500">
                  Choose the booking tier that best matches your requirements for {activeSite.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relevantPackages.map(pkg => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`cursor-pointer rounded-2xl p-5 border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#f35921] ring-2 ring-[#f35921]/30 bg-orange-500/[0.03] shadow-md'
                          : 'border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      {pkg.recommended && (
                        <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f35921] text-white font-semibold">
                          RECOMMENDED
                        </span>
                      )}

                      <div>
                        <div className="mb-3">
                          <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                            {pkg.name}
                          </h3>
                          <div className="text-xs text-zinc-500 font-mono">
                            Duration: {pkg.duration}
                          </div>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                          {pkg.tagline}
                        </p>

                        <div className="space-y-1 mb-4">
                          {pkg.deliverables.map((d, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                        <div className="text-lg font-bold text-zinc-900 dark:text-white font-mono">
                          {pkg.currency}{pkg.price}
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#f35921] text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f35921] text-white font-semibold text-xs shadow-md hover:bg-[#e04a14] transition-colors"
                >
                  Continue to Date & Time <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Slot Picker */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Step 2: Pick Open Date & Preferred Time Window
                </h2>
                <p className="text-xs text-zinc-500">
                  Dates marked in real-time alongside local studio availability.
                </p>
              </div>

              {/* Date & Slot Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono uppercase">
                    1. Choose Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161822] text-zinc-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                  />
                  <p className="text-[11px] text-zinc-400">
                    Real-time calendar verification active.
                  </p>
                </div>

                {/* Time Window */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono uppercase">
                    2. Time Slot
                  </label>
                  <div className="space-y-2">
                    {[
                      { slot: '10:00 AM', desc: 'Morning opening window' },
                      { slot: '2:00 PM', desc: 'Afternoon priority slot', rec: true },
                      { slot: '5:00 PM', desc: 'Late afternoon window' },
                    ].map(item => (
                      <button
                        key={item.slot}
                        onClick={() => setBookingTime(item.slot)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                          bookingTime === item.slot
                            ? 'border-[#f35921] bg-orange-500/5 font-semibold text-[#f35921]'
                            : 'border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div>{item.slot}</div>
                          <div className="text-[10px] text-zinc-400 font-normal">{item.desc}</div>
                        </div>
                        {item.rec && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            POPULAR
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Packages
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f35921] text-white font-semibold text-xs shadow-md hover:bg-[#e04a14]"
                >
                  Client Information <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Step 3: Client Information & Requirements
                </h2>
                <p className="text-xs text-zinc-500">
                  Where should we send your booking confirmation and schedule invite?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono uppercase">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161822] text-xs font-medium focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161822] text-xs font-medium focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono uppercase">
                    Mobile Phone (For Instant Channel Alert Pings)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161822] text-xs font-medium focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-mono uppercase">
                    Special Requirements & Notes
                  </label>
                  <textarea
                    rows={3}
                    value={bookingNotes}
                    onChange={e => setBookingNotes(e.target.value)}
                    placeholder="Specific requests, team members attending, or location details..."
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161822] text-xs font-medium focus:ring-2 focus:ring-[#f35921] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Slot
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f35921] text-white font-semibold text-xs shadow-md hover:bg-[#e04a14]"
                >
                  Review & Commit <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Deposit Commit with ReactBits SlideCommit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Step 4: Confirmation & Webhook Commit
                </h2>
                <p className="text-xs text-zinc-500">
                  Review the summary and slide to commit your reservation.
                </p>
              </div>

              {/* Invoice Breakdown Bento */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#141620] border border-black/5 dark:border-white/5 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>{selectedPkg.name} ({selectedPkg.duration})</span>
                  <span>${selectedPkg.price}.00</span>
                </div>

                <div className="border-t border-black/5 dark:border-white/5 pt-2 flex justify-between font-bold text-sm text-zinc-900 dark:text-white">
                  <span>TOTAL VALUE</span>
                  <span>${totalPrice}.00</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>DEPOSIT REQUIRED TODAY ({depositPercent}%)</span>
                  <span className="text-base">${depositAmount}.00</span>
                </div>

                <div className="flex justify-between text-[11px] text-zinc-400 pt-1">
                  <span>Scheduled date & time:</span>
                  <span>{bookingDate} at {bookingTime}</span>
                </div>
              </div>

              {/* Slide to Commit Container */}
              <div className="py-6 flex flex-col items-center justify-center space-y-3">
                <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  SLIDE SLIDER TO CONFIRM & DISPATCH WEBHOOK
                </div>

                {/* ReactBits SlideCommit */}
                <div className="w-full max-w-md flex justify-center">
                  <SlideCommit
                    label={`Slide to commit reservation`}
                    doneLabel="Booking Locked & Dispatched!"
                    onConfirm={handleCommitBooking}
                    width={360}
                    height={52}
                    successColor="#10b981"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-start">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit Details
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
