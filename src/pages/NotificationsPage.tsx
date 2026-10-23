import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';
import { StatusMark } from '../components/reactbits';

export const NotificationsPage: React.FC = () => {
  const { events, activeSite } = useSwiftBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const filteredEvents = events.filter(evt => {
    const matchesSearch = 
      evt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.packageName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedEventType === 'all' || evt.eventType === selectedEventType;

    return matchesSearch && matchesType;
  });

  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Notifications
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Immutable log of all booking requests, deposits, and multi-channel dispatches.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search client, email or ref..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161822] text-xs focus:ring-2 focus:ring-[#f35921] focus:outline-none"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-xl border border-black/[0.04] dark:border-white/[0.06] w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'booking_confirmed', label: 'Bookings' },
            { id: 'deposit_received', label: 'Deposits' },
            { id: 'inquiry_received', label: 'Inquiries' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedEventType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedEventType === f.id
                  ? 'bg-white dark:bg-[#1e202c] text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* Event Stream List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl p-12 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              No notification events yet
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Incoming booking requests, deposits, and client inquiries will appear here in real time as they arrive via your site webhook.
            </p>
          </div>
        ) : (
          filteredEvents.map(evt => (
            <div
              key={evt.id}
              className="rounded-2xl p-5 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                    {evt.clientName}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono truncate max-w-[220px]">
                    ({evt.clientEmail})
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase shrink-0 ${
                    evt.eventType === 'booking_confirmed' 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : evt.eventType === 'deposit_received'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  }`}>
                    {evt.eventType.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-zinc-500">
                  {evt.packageName} • {evt.shootDate} {evt.shootTime} • ₦{evt.totalPrice?.toLocaleString() || '0'}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs pt-1 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-white/5">
                <button
                  onClick={() => handleCopyRef(evt.bookingReference)}
                  className="font-mono text-zinc-400 hover:text-zinc-700 flex items-center gap-1"
                >
                  <span>{evt.bookingReference}</span>
                  {copiedRef === evt.bookingReference ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  {evt.channelsDispatched.map(ch => (
                    <span
                      key={ch}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono capitalize"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
