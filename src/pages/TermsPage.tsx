import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const TermsPage: React.FC = () => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-[#f35921] text-xs font-mono font-medium">
          <FileText className="w-3.5 h-3.5" />
          <span>LEGAL AGREEMENT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500 font-mono">
          Last updated: October 2026 • SwiftBook Platform
        </p>
      </div>

      <div className="prose dark:prose-invert prose-zinc max-w-none text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Service Scope & Webhook Delivery</h2>
          <p>
            SwiftBook provides a unified booking notification, calendar synchronization, and MCP (Model Context Protocol) dispatch engine. By connecting your websites, payment processors, and messaging channels (Telegram, WhatsApp, Slack, Email), you authorize SwiftBook to ingest and fan out incoming booking events.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Ingest API Keys & Account Security</h2>
          <p>
            You are responsible for safeguarding your site ingest tokens and API keys. SwiftBook processes events within ~12ms latency SLA and verifies signature integrity for all incoming webhook payloads.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Model Context Protocol (MCP) Integration</h2>
          <p>
            The SwiftBook MCP endpoint (<code className="text-[#f35921] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">/api/mcp</code>) allows authorized AI clients (Claude Desktop, Cursor, Zed, Windsurf) to query availability and dispatch notifications. Use of the MCP endpoint requires valid OAuth or Bearer authentication.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">4. Fair Use & Availability</h2>
          <p>
            SwiftBook targets 99.9% uptime for multi-channel fanout. Rate limits apply to unauthorized spam payloads to protect channel delivery quotas.
          </p>
        </section>
      </div>

    </div>
  );
};
