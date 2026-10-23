import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X, 
  Sparkles, 
  CornerDownLeft, 
  ExternalLink, 
  Check, 
  Copy,
  Zap,
  HelpCircle,
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useSwiftBook } from '../../context/SwiftBookContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface AgentChatWidgetProps {
  /**
   * 'platform': SwiftBook landing page assistant with platform FAQs
   * 'client': Client business / studio booking agent (reused in MCP embed for photographers/studios)
   */
  mode?: 'platform' | 'client';
  siteName?: string;
  agentName?: string;
  showFaqChips?: boolean;
}

// Custom Speech Bubble Icon matching user screenshot media_1792791038041_87def89e.png
const SpeechBubbleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="bubbleGloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="60%" stopColor="#EDEDED" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#D4D4D8" stopOpacity="0.9" />
      </linearGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Slightly tilted rounded chat bubble with speech tail on bottom-center-left */}
    <path
      d="M4.5 7.5 C 4.5 5.5, 6.2 4, 8.5 4 L 21.5 4 C 23.8 4, 25.5 5.5, 25.5 7.5 L 25.5 17 C 25.5 19, 23.8 20.5, 21.5 20.5 L 14.5 20.5 L 9.5 24.5 C 8.8 25.1, 7.8 24.6, 7.8 23.7 L 7.8 20.5 L 8.5 20.5 C 6.2 20.5, 4.5 19, 4.5 17 Z"
      fill="url(#bubbleGloss)"
      filter="url(#softShadow)"
    />
  </svg>
);

export const AgentChatWidget: React.FC<AgentChatWidgetProps> = ({
  mode = 'platform',
  siteName = 'SwiftBook',
  agentName = 'SwiftBook AI',
  showFaqChips = true,
}) => {
  const { currency, activeSite } = useSwiftBook();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Platform FAQ prompts (Applicable strictly on SwiftBook landing site)
  const platformFaqChips = [
    { label: '⚡ How fast are booking alerts?', key: 'speed' },
    { label: '💰 How do deposits work?', key: 'deposits' },
    { label: '🤖 How do I use the MCP endpoint?', key: 'mcp' },
    { label: '🔌 Which channels are supported?', key: 'channels' },
    { label: '🛠️ How do I install on my site?', key: 'install' },
  ];

  // Initial welcome message
  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome',
      sender: 'agent',
      text: mode === 'platform'
        ? `Hey there! 👋 I'm your SwiftBook AI assistant. Ask me anything about multi-channel notification routing, deposit verification, or connecting your sites to the MCP endpoint.`
        : `Welcome to ${siteName}! 👋 I'm your automated booking assistant. I can help check available dates, quote package rates, or answer studio policies.`,
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // AI Response Generator
  const generateAgentResponse = (userText: string): { reply: string; actionUrl?: string; actionLabel?: string } => {
    const text = userText.toLowerCase();

    if (mode === 'platform') {
      if (text.includes('fast') || text.includes('speed') || text.includes('latency') || text.includes('how fast')) {
        return {
          reply: `⚡ SwiftBook dispatches events in under 20ms (average 12ms). The moment a client reserves an appointment or authorizes a deposit on your site, rich cards land in Telegram, WhatsApp, Slack, and Email simultaneously.`,
          actionUrl: '/app/notifications',
          actionLabel: 'Inspect Delivery Logs →',
        };
      }
      if (text.includes('deposit') || text.includes('rate') || text.includes('pricing') || text.includes('money')) {
        return {
          reply: `💰 You can set fixed flat deposits or custom percentage splits (e.g. 25% or 50%) per site. SwiftBook verifies payment webhook signatures before slots are permanently locked on your master schedule.`,
          actionUrl: '/app/sites',
          actionLabel: 'Configure Deposit Rules →',
        };
      }
      if (text.includes('mcp') || text.includes('claude') || text.includes('cursor') || text.includes('ai') || text.includes('agent')) {
        return {
          reply: `🤖 The SwiftBook MCP Server runs live at https://swift-book.base44.app/api/mcp. You can add it directly to Claude Desktop, Cursor, or Zed so your AI can query open dates, quote rates, and confirm client bookings autonomously.`,
          actionUrl: 'https://swift-book.base44.app/api/mcp',
          actionLabel: 'Copy MCP Server URL 📋',
        };
      }
      if (text.includes('channel') || text.includes('telegram') || text.includes('whatsapp') || text.includes('slack') || text.includes('email')) {
        return {
          reply: `🔌 SwiftBook natively supports Telegram Bots (@goldenhour_bookings_bot), WhatsApp Business API, Slack Incoming Webhooks, and Team Mailers with direct 1-tap client replies.`,
          actionUrl: '/app/channels',
          actionLabel: 'View Active Channels →',
        };
      }
      if (text.includes('install') || text.includes('connect') || text.includes('setup') || text.includes('api key')) {
        return {
          reply: `🛠️ Zero code required! Simply generate an API key in your SwiftBook dashboard, paste the webhook URL into Webflow, WordPress, Framer, Squarespace, or your custom booking backend, and you're ready before lunch.`,
          actionUrl: '/app/sites',
          actionLabel: 'Generate Site API Key →',
        };
      }
      // General Fallback
      return {
        reply: `Thanks for asking! SwiftBook bridges incoming webhooks from your site directly to Telegram, WhatsApp, Slack & Email in <20ms, while keeping your calendar and deposits synchronized. You can also connect AI agents via /api/mcp.`,
        actionUrl: '/app',
        actionLabel: 'Open Dashboard Overview →',
      };
    } else {
      // Client business mode (e.g. photographer's site)
      if (text.includes('package') || text.includes('rate') || text.includes('price') || text.includes('cost')) {
        return {
          reply: `We offer custom packages starting at ${currency.symbol}${currency.code === 'NGN' ? '150,000' : '350'}. Sessions require a 25% deposit to lock in your date. High-res sneak peeks deliver within 24 hours.`,
          actionUrl: '/book',
          actionLabel: 'View Packages & Reserve →',
        };
      }
      if (text.includes('date') || text.includes('slot') || text.includes('available') || text.includes('calendar')) {
        return {
          reply: `Our calendar is updated live via SwiftBook. Weekend golden-hour slots fill up fast! Let me know what date you have in mind or check our open schedule.`,
          actionUrl: '/book',
          actionLabel: 'Check Available Dates →',
        };
      }
      return {
        reply: `I'd love to help with your session! You can pick an available date on our calendar or reserve your booking package with instant confirmation.`,
        actionUrl: '/book',
        actionLabel: 'Start Reservation →',
      };
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputValue).trim();
    if (!content) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: content,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Realistic typing delay (450ms - 800ms)
    setTimeout(() => {
      const response = generateAgentResponse(content);
      const agentMessage: ChatMessage = {
        id: `agt_${Date.now()}`,
        sender: 'agent',
        text: response.reply,
        timestamp: 'Just now',
        actionUrl: response.actionUrl,
        actionLabel: response.actionLabel,
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopyMcp = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. FLOATING CHAT LAUNCHER BUTTON (Matching User Uploaded Image) */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? 'Close chat' : 'Open agent chat'}
          className="relative w-14 h-14 rounded-full bg-[#1c1c1e] text-white dark:bg-white dark:text-zinc-950 shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer transition-all border border-black/10 dark:border-white/20 group"
        >
          {/* Subtle pulsating live glow */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full animate-ping opacity-60" />

          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.2] transition-transform duration-200" />
          ) : (
            <div className="flex items-center justify-center group-hover:scale-105 transition-transform">
              <SpeechBubbleIcon className="w-7 h-7" />
            </div>
          )}
        </motion.button>
      </div>

      {/* ============================================================ */}
      {/* 2. CHAT POPUP WINDOW */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[380px] sm:w-[410px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] rounded-[32px] bg-white dark:bg-[#12141c] border border-black/[0.08] dark:border-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-[#161824]/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Logo variant="icon" size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#12141c]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-950 dark:text-white leading-tight">
                    <span>{agentName}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-orange-500/10 text-[#f35921] font-semibold">
                      AI AGENT
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Sub-20ms Ingest Engine • Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              
              {/* FAQ Chips (Only on SwiftBook Landing Site as Requested) */}
              {showFaqChips && mode === 'platform' && (
                <div className="p-3 rounded-2xl bg-[#faf9f5] dark:bg-[#181a26] border border-black/[0.05] dark:border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                    <Sparkles className="w-3.5 h-3.5 text-[#f35921]" />
                    <span>Frequently Asked Questions:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {platformFaqChips.map(chip => (
                      <button
                        key={chip.key}
                        onClick={() => handleSendMessage(chip.label)}
                        className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.08] hover:border-[#f35921] dark:hover:border-[#f35921] hover:text-[#f35921] text-zinc-700 dark:text-zinc-300 text-[11px] font-medium transition-all shadow-sm active:scale-95 text-left"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message List */}
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#18181b] text-white dark:bg-white dark:text-black rounded-tr-sm shadow-sm'
                          : 'bg-[#f4f3ed] dark:bg-[#1a1c28] text-zinc-800 dark:text-zinc-200 rounded-tl-sm border border-black/[0.04] dark:border-white/[0.04]'
                      }`}
                    >
                      <p className="whitespace-pre-line text-[12px]">{msg.text}</p>
                    </div>

                    {/* Agent Call to Action Button */}
                    {msg.actionUrl && (
                      <div className="pt-0.5">
                        {msg.actionUrl.includes('/api/mcp') ? (
                          <button
                            onClick={() => handleCopyMcp(msg.actionUrl!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-500/10 text-[#f35921] hover:bg-orange-500/20 text-[11px] font-semibold transition-all active:scale-95 border border-orange-500/20"
                          >
                            {copiedMcp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedMcp ? 'Copied to Clipboard!' : msg.actionLabel}</span>
                          </button>
                        ) : (
                          <a
                            href={msg.actionUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-500/10 text-[#f35921] hover:bg-orange-500/20 text-[11px] font-semibold transition-all active:scale-95 border border-orange-500/20"
                          >
                            <span>{msg.actionLabel}</span>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="text-[9px] font-mono text-zinc-400 px-1">
                      {msg.timestamp}
                    </div>

                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-[#f4f3ed] dark:bg-[#1a1c28] text-zinc-500 rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f35921] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f35921] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f35921] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] font-mono ml-1 text-zinc-400">Agent typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-[#161824]/50">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={
                    mode === 'platform'
                      ? 'Ask about setup, webhooks, MCP...'
                      : 'Ask about rates, availability, policies...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-black/30 border border-zinc-200 dark:border-white/10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#f35921] transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="text-[10px] text-zinc-400 text-center font-mono mt-2">
                Powered by SwiftBook Sub-20ms Engine
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default AgentChatWidget;
