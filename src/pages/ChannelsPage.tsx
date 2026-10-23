import React, { useState } from 'react';
import { 
  Send, 
  Smartphone, 
  Laptop, 
  Mail, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';
import { SquishSwitch, StatusMark } from '../components/reactbits';

export const ChannelsPage: React.FC = () => {
  const { channels, toggleChannelConnected, dispatchTestNotification, activeSite } = useSwiftBook();
  const [testingChannel, setTestingChannel] = useState<string | null>(null);

  const handleTestPing = (type: any) => {
    setTestingChannel(type);
    dispatchTestNotification(type, 'booking_confirmed');
    setTimeout(() => setTestingChannel(null), 800);
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'telegram': return Send;
      case 'whatsapp': return Smartphone;
      case 'slack': return Laptop;
      case 'email': return Mail;
      default: return Send;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Channels
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Connect the communication apps your team monitors daily.
          </p>
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Active Site: <strong className="text-zinc-900 dark:text-white">{activeSite.name}</strong>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channels.map(channel => {
          const Icon = getChannelIcon(channel.type);
          const isTesting = testingChannel === channel.type;
          return (
            <div
              key={channel.type}
              className="rounded-2xl p-6 bg-white dark:bg-[#12141c] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-6"
            >
              <div>
                {/* Channel Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: channel.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                        {channel.name}
                        {channel.connected && (
                          <StatusMark status="done" size={14} />
                        )}
                      </h2>
                      <div className="text-xs font-mono text-zinc-400 truncate max-w-[200px]">
                        {channel.handleOrWebhook}
                      </div>
                    </div>
                  </div>

                  <SquishSwitch
                    checked={channel.connected}
                    onChange={() => toggleChannelConnected(channel.type)}
                    width={40}
                    height={22}
                    trackOnColor={channel.color}
                    trackColor="#cbd5e1"
                  />
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  {channel.description}
                </p>

                {/* Status Bento Box */}
                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#161822] border border-zinc-200/60 dark:border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">STATUS:</span>
                    <span className={channel.connected ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-400'}>
                      {channel.connected ? 'LIVE & LISTENING' : 'MUTED / PAUSED'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">DISPATCHES:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{channel.pingsCount} events</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">LAST PING:</span>
                    <span className="text-zinc-600 dark:text-zinc-300">{channel.lastPing || 'Never'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => handleTestPing(channel.type)}
                  disabled={isTesting || !channel.connected}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all disabled:opacity-40"
                >
                  <Zap className={`w-3.5 h-3.5 ${isTesting ? 'animate-bounce text-[#f35921]' : 'text-amber-500'}`} />
                  {isTesting ? 'Dispatching...' : 'Send Test Ping'}
                </button>

                <span className="text-[11px] font-mono text-zinc-400">
                  Latency: ~12ms
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
