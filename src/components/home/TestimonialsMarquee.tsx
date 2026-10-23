import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah L.',
    handle: '@sarahluxe',
    role: 'Managing Broker, Luxe Living Realty',
    quote: 'Honest logs mean I trust every “sent.” Viewings and earnest deposits route straight to our Slack and WhatsApp without anyone checking five dashboards.',
    stars: 5,
    tag: 'Real Estate Ingest',
    color: '#229ED9',
  },
  {
    name: 'Tola A.',
    handle: '@tolafilms',
    role: 'Director, Meridian Creative',
    quote: 'One API key per site and we were connected before lunch. Our second business branch was hooked in before dinner.',
    stars: 5,
    tag: 'Multi-Site Ingest',
    color: '#f35921',
  },
  {
    name: 'Grace M.',
    handle: '@graceevents',
    role: 'Lead Coordinator, Verve Social & Galas',
    quote: 'Deposits, confirmations, event inquiries — all routed to the channels our coordinators and vendors already live in. Game changer.',
    stars: 5,
    tag: 'Zero Missed Deposits',
    color: '#4A154B',
  },
  {
    name: 'Femi B.',
    handle: '@femistudio',
    role: 'Operations Director, Lagos & London',
    quote: 'The daily summary card tells me what revenue and client bookings landed today across all sites without opening clunky legacy apps.',
    stars: 5,
    tag: 'Daily Briefings',
    color: '#25D366',
  },
  {
    name: 'Nina R.',
    handle: '@ninaconsult',
    role: 'Partner, Horizon Advisory',
    quote: 'Booked client consultations show up on the master calendar instantly. Clients get answers from the AI agent before I even open my email.',
    stars: 5,
    tag: 'AI FAQ Quoter',
    color: '#e6a817',
  },
];

export const TestimonialsMarquee: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-xs font-mono font-medium mb-3 text-zinc-600 dark:text-zinc-400">
          <span>✦ TRUSTED TEAMS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Loved by fast-moving{' '}
          <span className="font-editorial text-[#f35921] font-normal text-[1.12em]">
            businesses.
          </span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Used by real estate agencies, event coordinators, creative media studios, and consultants worldwide.
        </p>
      </div>

      {/* Grid of Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.slice(0, 3).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bento-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${item.color}18`, color: item.color }}
                >
                  {item.tag}
                </span>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed italic">
                “{item.quote}”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">{item.name}</div>
                <div className="text-[11px] text-zinc-400">{item.role}</div>
              </div>
              <span className="text-xs font-mono text-zinc-400">{item.handle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {TESTIMONIALS.slice(3, 5).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="bento-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${item.color}18`, color: item.color }}
                >
                  {item.tag}
                </span>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed italic">
                “{item.quote}”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">{item.name}</div>
                <div className="text-[11px] text-zinc-400">{item.role}</div>
              </div>
              <span className="text-xs font-mono text-zinc-400">{item.handle}</span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
