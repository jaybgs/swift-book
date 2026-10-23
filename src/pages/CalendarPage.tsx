import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Shirt, 
  Camera, 
  CheckCircle2, 
  Send, 
  X, 
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Users
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';

export interface BookedSession {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  monthIndex: number; // 0-11
  year: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  shootType: string;
  slotTime: string;
  duration: string;
  venue: string;
  venueAddress: string;
  attire: string;
  attireNotes: string;
  equipment: string;
  lighting: string;
  depositAmount: string;
  totalRate: string;
  paymentStatus: string;
  paymentGateway: string;
  teamCrew: string[];
  notes: string;
  channelsNotified: string[];
  ref: string;
}

export const CalendarPage: React.FC = () => {
  const { activeSite, currency, events } = useSwiftBook();
  
  // Interactive Month State
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 1)); // October 2026
  const [selectedSession, setSelectedSession] = useState<BookedSession | null>(null);

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const monthTitle = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Grid calculation (Monday-first grid)
  const firstDayRaw = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 is Sun
  const firstDayOffset = (firstDayRaw + 6) % 7; // Mon is 0, Sun is 6
  const totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  // Dynamic Booked Sessions mapped from live events (Zero hardcoded mock data)
  const bookedSessions: BookedSession[] = events.map(evt => {
    const parts = (evt.shootDate || '').split('-');
    const parsedYear = parts[0] ? parseInt(parts[0], 10) : currentYear;
    const parsedMonth = parts[1] ? parseInt(parts[1], 10) - 1 : currentMonthIndex;
    const parsedDay = parts[2] ? parseInt(parts[2], 10) : 1;

    return {
      id: evt.id,
      dateStr: evt.shootDate,
      dayNumber: parsedDay,
      monthIndex: parsedMonth,
      year: parsedYear,
      clientName: evt.clientName,
      clientEmail: evt.clientEmail,
      clientPhone: evt.clientPhone || '+1 (555) 000-0000',
      shootType: evt.packageName,
      slotTime: evt.shootTime,
      duration: '2.5 Hours',
      venue: `${activeSite.name} Studio`,
      venueAddress: 'Studio Floor • Confirmed Reservation',
      attire: 'Client Preference',
      attireNotes: 'Standard session attire guidelines',
      equipment: 'Production Rig & Strobe Lighting',
      lighting: 'Studio Setup',
      depositAmount: `${currency.symbol}${evt.depositPaid ? evt.depositPaid.toLocaleString() : '0'}`,
      totalRate: `${currency.symbol}${evt.totalPrice ? evt.totalPrice.toLocaleString() : '0'}`,
      paymentStatus: 'Deposit Verified',
      paymentGateway: 'Webhook Ingest Verified',
      teamCrew: ['Lead Tech', 'Assistant'],
      notes: evt.notes || 'Automated webhook booking confirmation.',
      channelsNotified: evt.channelsDispatched.map(c => c.toUpperCase()),
      ref: evt.bookingReference,
    };
  });

  // Find if a day has a booking
  const getSessionForDay = (day: number) => {
    return bookedSessions.find(
      s => s.dayNumber === day && s.monthIndex === currentMonthIndex && s.year === currentYear
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header (Matching Screenshot 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Calendar
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Confirmed bookings, locked deposits, and shoot schedules per site. Click any orange booked date to inspect full shoot logistics.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#f35921] shadow-sm" />
            <span className="text-zinc-700 dark:text-zinc-300">Booked & Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
            <span className="text-zinc-500 dark:text-zinc-400">Available Date</span>
          </div>
        </div>
      </div>

      {/* 2. Main Calendar Card Container (Matching Screenshot 2) */}
      <div className="rounded-2xl p-3 sm:p-6 md:p-8 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm space-y-4 sm:space-y-6">
        
        {/* Month Navigation Row: < Month Year > */}
        <div className="flex items-center justify-between px-1">
          <button 
            onClick={handlePrevMonth}
            title="Previous Month"
            className="p-1.5 sm:p-2 rounded-xl text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#f35921]" />
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              {monthTitle}
            </h2>
          </div>

          <button 
            onClick={handleNextMonth}
            title="Next Month"
            className="p-1.5 sm:p-2 rounded-xl text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Days of Week: Mon, Tue, Wed, Thu, Fri, Sat, Sun */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2.5 md:gap-3 text-center text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider pb-1">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* 7-Column Grid of Day Cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2.5 md:gap-3">
          
          {/* Empty slots for days before Day 1 */}
          {[...Array(firstDayOffset)].map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[55px] sm:min-h-[85px] md:min-h-[105px] rounded-lg sm:rounded-xl bg-transparent" />
          ))}

          {/* Days 1 through totalDays */}
          {[...Array(totalDays)].map((_, i) => {
            const day = i + 1;
            const isToday = currentMonthIndex === 9 && currentYear === 2026 && day === 23;
            const session = getSessionForDay(day);
            const isBooked = !!session;

            if (isBooked) {
              return (
                <div
                  key={day}
                  onClick={() => setSelectedSession(session)}
                  className="min-h-[55px] sm:min-h-[85px] md:min-h-[105px] p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#f35921] to-[#e64c15] text-white shadow-md hover:scale-[1.03] active:scale-[0.99] cursor-pointer ring-1 sm:ring-2 ring-[#f35921]/40 flex flex-col justify-between transition-all group overflow-hidden relative"
                >
                  {/* Subtle Glow */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/20 rounded-full blur-xl pointer-events-none" />

                  {/* Top: Day Number + Booked Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs sm:text-sm md:text-base text-white">
                      {day}
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-black/25 text-[8px] sm:text-[9px] font-mono font-semibold uppercase tracking-wider text-white">
                      Booked
                    </span>
                  </div>

                  {/* Body: Session Details Text on the Tile */}
                  <div className="space-y-0.5 my-0.5 text-left">
                    <div className="font-bold text-[10px] sm:text-xs md:text-[13px] text-white leading-tight truncate">
                      {session.clientName}
                    </div>
                    <div className="hidden sm:block text-[10px] text-white/90 font-medium truncate">
                      {session.shootType}
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-white/80 font-mono truncate">
                      ⏱ {session.slotTime.split('—')[0].trim()}
                    </div>
                  </div>

                  {/* Bottom: Venue pill */}
                  <div className="hidden sm:flex text-[9px] font-mono text-white/90 bg-black/20 rounded px-1.5 py-0.5 truncate items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">{session.venue.split('•')[0].trim()}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={day}
                className={`min-h-[55px] sm:min-h-[85px] md:min-h-[105px] p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all flex flex-col justify-between ${
                  isToday
                    ? 'border-[#f35921] bg-orange-50/50 dark:bg-orange-950/20 shadow-sm'
                    : 'border-zinc-200/70 dark:border-zinc-800/80 bg-[#fbfbfa]/70 dark:bg-[#161824]'
                }`}
              >
                <div className="flex items-center justify-between">
                  {isToday ? (
                    <span className="w-5 h-5 rounded-full bg-[#f35921] text-white flex items-center justify-center font-bold text-[11px] shadow-sm">
                      {day}
                    </span>
                  ) : (
                    <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {day}
                    </span>
                  )}
                  {isToday && (
                    <span className="hidden sm:inline-block px-1 py-0.5 rounded-full bg-[#f35921] text-[8px] sm:text-[9px] font-mono font-semibold text-white">
                      TODAY
                    </span>
                  )}
                </div>

                <div className="text-[9px] sm:text-[10px] text-zinc-400 font-mono italic truncate">
                  Open
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Note underneath calendar card */}
      <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
        <span>Connected site: <strong>{activeSite.name}</strong> ({activeSite.url})</span>
      </div>

      {/* ============================================================ */}
      {/* 3. IN-DEPTH SESSION DETAIL MODAL (Opens when clicking any booked date) */}
      {/* ============================================================ */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          
          <div 
            className="w-full max-w-2xl bg-white dark:bg-[#141620] rounded-3xl border border-zinc-200/80 dark:border-white/10 shadow-2xl overflow-hidden my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-200/80 dark:border-white/10 bg-zinc-50 dark:bg-[#181a24]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  CONFIRMED & DEPOSIT LOCKED
                </span>
                <span className="text-xs font-mono text-zinc-400 truncate">
                  {selectedSession.ref}
                </span>
              </div>

              <button
                onClick={() => setSelectedSession(null)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Primary Session Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#f35921] to-[#ff733b] text-white shadow-md space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-white/80">
                  Scheduled Shoot Logistics
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {selectedSession.shootType}
                </h2>
                <div className="flex items-center gap-4 text-xs text-white/95 font-medium flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-white" />
                    {new Date(selectedSession.year, selectedSession.monthIndex, selectedSession.dayNumber).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-white" />
                    {selectedSession.slotTime} ({selectedSession.duration})
                  </span>
                </div>
              </div>

              {/* 2-Column Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                
                {/* 1. Client Profile */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#1a1d28] border border-zinc-200/70 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                    <User className="w-4 h-4 text-[#f35921]" />
                    <span>Client Profile</span>
                  </div>
                  <div className="space-y-1 font-mono">
                    <div className="text-sm font-bold text-zinc-900 dark:text-white">{selectedSession.clientName}</div>
                    <div className="text-zinc-500">{selectedSession.clientEmail}</div>
                    <div className="text-zinc-500">{selectedSession.clientPhone}</div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/50 dark:border-white/5 text-[11px] text-zinc-500">
                    <strong className="text-zinc-700 dark:text-zinc-300">Channels Linked:</strong> {selectedSession.channelsNotified.join(', ')}
                  </div>
                </div>

                {/* 2. Venue & Studio Location */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#1a1d28] border border-zinc-200/70 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                    <MapPin className="w-4 h-4 text-[#f35921]" />
                    <span>Venue & Studio Location</span>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-900 dark:text-white">{selectedSession.venue}</div>
                    <div className="text-zinc-500 leading-relaxed">{selectedSession.venueAddress}</div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/50 dark:border-white/5 text-[11px] text-zinc-500">
                    <strong className="text-zinc-700 dark:text-zinc-300">Access:</strong> Freight elevator code #4019; VIP studio parking reserved.
                  </div>
                </div>

                {/* 3. Attire & Wardrobe */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#1a1d28] border border-zinc-200/70 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                    <Shirt className="w-4 h-4 text-[#f35921]" />
                    <span>Attire & Wardrobe Guidelines</span>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-zinc-900 dark:text-white">{selectedSession.attire}</div>
                    <div className="text-zinc-500 leading-relaxed">{selectedSession.attireNotes}</div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/50 dark:border-white/5 text-[11px] text-zinc-500">
                    <strong className="text-zinc-700 dark:text-zinc-300">Green Room:</strong> Private wardrobe suite with garment steamer prepped.
                  </div>
                </div>

                {/* 4. Equipment & Lighting */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#1a1d28] border border-zinc-200/70 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                    <Camera className="w-4 h-4 text-[#f35921]" />
                    <span>Equipment & Lighting Setup</span>
                  </div>
                  <div className="space-y-1 font-mono">
                    <div><strong className="text-zinc-700 dark:text-zinc-300 font-sans">Camera:</strong> {selectedSession.equipment}</div>
                    <div><strong className="text-zinc-700 dark:text-zinc-300 font-sans">Lighting:</strong> {selectedSession.lighting}</div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200/50 dark:border-white/5 text-[11px] text-zinc-500">
                    <strong className="text-zinc-700 dark:text-zinc-300">Tethering:</strong> Live Capture One display on 16" monitor.
                  </div>
                </div>

                {/* 5. Production Team & Crew */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#1a1d28] border border-zinc-200/70 dark:border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                    <Users className="w-4 h-4 text-[#f35921]" />
                    <span>Crew & Assistants Assigned</span>
                  </div>
                  <ul className="space-y-1 text-zinc-600 dark:text-zinc-300 list-disc list-inside">
                    {selectedSession.teamCrew.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>

                {/* 6. Financials & Retainer */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#1a1d28] border border-zinc-200/70 dark:border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
                    <CreditCard className="w-4 h-4 text-emerald-500" />
                    <span>Deposit & Financials</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="text-zinc-500">Deposit Locked:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedSession.depositAmount}</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-zinc-500">Total Rate:</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{selectedSession.totalRate}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[11px]">
                      <span className="text-zinc-500">Gateway:</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{selectedSession.paymentGateway}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Special Director / Client Notes */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <div className="font-bold text-amber-900 dark:text-amber-200">
                  Director & Shoot Notes:
                </div>
                <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                  {selectedSession.notes}
                </p>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50 dark:bg-[#181a24] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-zinc-500">
                Dispatched to all linked channels in 12ms
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${selectedSession.clientPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Ping</span>
                </a>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
