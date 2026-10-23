import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-10">
      
      {/* Back button & Brand Logo */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <Link to="/">
          <Logo variant="full" size="sm" />
        </Link>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
          <Lock className="w-3.5 h-3.5" />
          <span>DATA PRIVACY & SECURITY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 font-mono">
          Last updated: October 2026 • SwiftBook Platform
        </p>
      </div>

      <div className="prose dark:prose-invert prose-zinc max-w-none text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Data Ingestion & Purpose</h2>
          <p>
            SwiftBook processes client names, contact details, appointment slots, and deposit receipts strictly for the purpose of forwarding booking confirmations to your designated channels (Telegram, WhatsApp, Slack, Email) and syncing with your master calendar.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Zero Resale Policy</h2>
          <p>
            We never sell, rent, or monetize your booking data or client information to third-party advertisers or brokers. Your data remains strictly your business property.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Encryption & Storage</h2>
          <p>
            All webhook communications use TLS 1.3 encryption in transit. Site ingest tokens and integration webhook secrets are stored with AES-256 encryption at rest.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">4. AI & MCP Processing</h2>
          <p>
            When utilizing the SwiftBook MCP server (<code className="text-[#f35921] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">/api/mcp</code>) via Claude or Cursor, event data is passed exclusively to your configured AI client session without external training.
          </p>
        </section>
      </div>

    </div>
  );
};
