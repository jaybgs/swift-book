import React from 'react';
import { ShieldCheck, Terminal, Cpu, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-10">
      
      <div>
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#f35921] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="mb-4">
          <Logo variant="full" size="lg" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          About SwiftBook
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          The honest booking delivery and multi-channel notification engine for fast-moving businesses.
        </p>
      </div>

      <div className="bento-card p-8 space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Why SwiftBook was built
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          For fast-moving businesses — whether managing luxury real estate viewings, corporate event planning, production shoots, or executive consultations — missed inquiries and unconfirmed bookings mean thousands of dollars in lost revenue. Standard email notifications frequently land in spam, and teams are out in the field or in meetings rather than monitoring dashboards.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          SwiftBook bridges this gap with a sub-20ms ingest bridge. The moment a client reserves an appointment or authorizes a deposit on any connected website, SwiftBook pushes rich notification cards straight into Telegram, WhatsApp, Slack, and Team Inboxes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bento-card p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#f35921] flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">Sub-20ms Webhook Fanout</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Events posted to <code className="font-mono text-zinc-900 dark:text-white">/functions/ingestSiteEvent</code> are instantly verified, mapped to site deposit policies, and broadcast across all connected communication channels simultaneously.
          </p>
        </div>

        <div className="bento-card p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">Native MCP Server (/api/mcp)</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Exposes booking packages, open calendar dates, and deposit rules to autonomous AI agents through the Model Context Protocol, enabling effortless conversational booking.
          </p>
        </div>
      </div>

    </div>
  );
};
