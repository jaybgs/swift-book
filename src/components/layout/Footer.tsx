import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-[#0c0e14]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo variant="full" size="md" />
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Honest booking delivery for businesses that can't afford a missed confirmation. Dispatched to Telegram, WhatsApp, Slack & Email in milliseconds.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase font-mono">
              Product Hub
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li><Link to="/app" className="hover:text-[#f35921] transition-colors">Booking Analytics Dashboard</Link></li>
              <li><Link to="/book" className="hover:text-[#f35921] transition-colors">Client Booking Form Preview</Link></li>
            </ul>
          </div>

          {/* Developer & MCP */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase font-mono">
              Developers & AI
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="https://swift-book.base44.app/api/mcp"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f35921] transition-colors inline-flex items-center gap-1"
                >
                  <span>SwiftBook MCP Server (/api/mcp)</span>
                  <span className="text-[10px] text-[#f35921] font-mono font-bold">↗</span>
                </a>
              </li>
              <li><Link to="/about" className="hover:text-[#f35921] transition-colors">System Architecture</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM SUB-FOOTER BAR (Matching Image 1: Copyright | Pantheon | Gmail, X, Discord | Terms, Privacy) */}
      {/* ============================================================ */}
      <div className="border-t border-black/[0.07] dark:border-white/[0.08] py-5 px-6 bg-black/[0.015] dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-1.5 font-normal tracking-tight">
            <span>© 2026 SwiftBook. All Rights Reserved.</span>
          </div>

          {/* Center: Design By Pantheon */}
          <div className="font-medium text-zinc-600 dark:text-zinc-300">
            <span>Design By Pantheon</span>
          </div>

          {/* Right: Gmail, X, Discord, Separator, Terms, Privacy */}
          <div className="flex items-center gap-4">
            
            {/* Social Icons: Gmail, X, Discord */}
            <div className="flex items-center gap-3">
              {/* Gmail */}
              <a
                href="mailto:support@swiftbook.io"
                target="_blank"
                rel="noreferrer"
                title="Gmail Support (support@swiftbook.io)"
                className="text-zinc-500 hover:text-[#ea4335] dark:text-zinc-400 dark:hover:text-[#ea4335] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                title="SwiftBook on X"
                className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                title="SwiftBook Discord Community"
                className="text-zinc-500 hover:text-[#5865F2] dark:text-zinc-400 dark:hover:text-[#5865F2] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>

            {/* Separator Pipe */}
            <span className="text-zinc-300 dark:text-zinc-700">|</span>

            {/* Terms & Privacy Links */}
            <div className="flex items-center gap-3">
              <Link to="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Privacy
              </Link>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};
