import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Plus, 
  Send, 
  HelpCircle, 
  Check, 
  DollarSign,
  BookmarkCheck
} from 'lucide-react';
import { useSwiftBook } from '../context/SwiftBookContext';

export const FaqAgentPage: React.FC = () => {
  const { packages, faqs, addFaqItem, activeSite, terminology } = useSwiftBook();
  
  // Interactive Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: `Hello! I am the automated booking quoter for ${activeSite.name}. Ask me about our rates, packages, or booking policies.`,
      time: '12:00 PM',
    },
    {
      sender: 'user',
      text: 'What are your rates and package options?',
      time: '12:01 PM',
    },
    {
      sender: 'agent',
      text: `For ${activeSite.name}, our packages include: ${packages.filter(p => p.profession === activeSite.profession).map(p => `${p.name} ($${p.price})`).join(', ') || 'custom tier options'}.`,
      time: '12:01 PM',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // New FAQ Modal
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState<'pricing' | 'rescheduling' | 'turnaround' | 'location'>('pricing');

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;

    const query = userInput.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: query, time: timeStr }]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Thanks for asking! For ${activeSite.name}, our ${terminology.bookingNoun}s require a ${activeSite.depositType === 'percent' ? activeSite.depositPercent + '%' : '$' + activeSite.depositAmount} deposit to confirm.`;
      
      const lower = query.toLowerCase();
      if (lower.includes('rate') || lower.includes('price') || lower.includes('package') || lower.includes('cost')) {
        const pkgs = packages.filter(p => p.profession === activeSite.profession);
        if (pkgs.length > 0) {
          reply = `Current packages for ${activeSite.name}: ` + pkgs.map(p => `${p.name} ($${p.price}, ${p.duration})`).join('; ') + '.';
        } else {
          reply = `Our rates range from $350 for property viewings, $500 for consultations, to $1,800 for full-day event coordination.`;
        }
      } else if (lower.includes('deposit') || lower.includes('pay') || lower.includes('earnest')) {
        reply = `We require an upfront deposit (${activeSite.depositType === 'percent' ? activeSite.depositPercent + '%' : '$' + activeSite.depositAmount}) to lock in the reservation. The balance is handled upon delivery.`;
      } else if (lower.includes('reschedule') || lower.includes('cancel')) {
        reply = `Rescheduling is complimentary up to 48 hours prior to your scheduled ${terminology.bookingNoun} time.`;
      } else if (lower.includes('how fast') || lower.includes('confirm')) {
        reply = `Bookings are confirmed immediately upon deposit authorization. Confirmation details push to your email and our team channels within seconds.`;
      }

      setChatMessages(prev => [...prev, { sender: 'agent', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 700);
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    addFaqItem({
      question: faqQuestion,
      answer: faqAnswer,
      category: faqCategory,
    });

    setIsAddingFaq(false);
    setFaqQuestion('');
    setFaqAnswer('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono mb-1">
            <Bot className="w-3.5 h-3.5" /> AI FAQ & RATE QUOTER
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Automated Quoting Agent & Ratecard
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Replies to potential clients in under two seconds with your verified rates, policies and deliverables.
          </p>
        </div>

        <button
          onClick={() => setIsAddingFaq(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f35921] hover:bg-[#e04a14] text-white text-xs font-semibold shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add FAQ Answer
        </button>
      </div>

      {/* Main Grid: Interactive Chat Simulator (6 cols) + Ratecard & FAQs (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Chat Simulator (6 cols) */}
        <div className="lg:col-span-6 bento-card p-6 flex flex-col justify-between h-[600px]">
          <div>
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-zinc-900 dark:text-white">
                    Live Client Chat Sandbox
                  </h3>
                  <div className="text-[10px] text-emerald-500 font-mono">● Agent Active & Answering</div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-400">
                Avg Response: 1.4s
              </span>
            </div>

            {/* Chat Messages Log */}
            <div className="space-y-3 overflow-y-auto max-h-[420px] pr-2 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#f35921] text-white rounded-br-sm'
                      : 'bg-zinc-100 dark:bg-[#1a1d28] text-zinc-800 dark:text-zinc-200 rounded-bl-sm border border-black/5 dark:border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono mt-0.5 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-xs w-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  <span>typing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-black/5 dark:border-white/5 flex gap-2">
            <input
              type="text"
              placeholder="Ask: 'What are your rates?' or 'How does deposit work?'"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#161822] text-xs focus:ring-2 focus:ring-[#f35921] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#f35921] text-white font-semibold text-xs shadow-sm hover:bg-[#e04a14]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Ratecard & FAQs (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Ratecard packages */}
          <div className="bento-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Rate Card & Pricing Tiers
              </h3>
              <span className="text-[11px] font-mono text-[#f35921]">{packages.length} Tiers Configured</span>
            </div>

            <div className="space-y-2">
              {packages.map(p => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-[#161822] border border-black/5 dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white">{p.name}</div>
                    <div className="text-[11px] text-zinc-400 font-mono capitalize">Industry: {p.profession.replace('_', ' ')} • {p.duration}</div>
                  </div>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {p.currency}{p.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Knowledge Base */}
          <div className="bento-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-500" /> FAQ Knowledge Base
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">{faqs.length} entries</span>
            </div>

            <div className="space-y-3">
              {faqs.map(faq => (
                <div
                  key={faq.id}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#161822] border border-black/5 dark:border-white/5 space-y-1 text-xs"
                >
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    Q: {faq.question}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    A: {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Add FAQ Modal */}
      {isAddingFaq && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsAddingFaq(false)}
        >
          <div 
            className="bento-card max-w-md w-full p-6 space-y-4 bg-white dark:bg-[#151720]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
              <h2 className="font-bold text-sm text-zinc-900 dark:text-white">
                Add FAQ Knowledge Item
              </h2>
              <button 
                onClick={() => setIsAddingFaq(false)}
                className="text-zinc-400 hover:text-zinc-600 text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
                  Client Question
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How far in advance do we need to book?"
                  value={faqQuestion}
                  onChange={e => setFaqQuestion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181a24] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
                  Agent's Response
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. We recommend booking at least 2 weeks in advance to secure optimal dates..."
                  value={faqAnswer}
                  onChange={e => setFaqAnswer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181a24] text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingFaq(false)}
                  className="px-3 py-2 rounded-xl text-zinc-500 hover:text-zinc-800 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#f35921] text-white font-semibold text-xs"
                >
                  Save to Knowledge Base
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
