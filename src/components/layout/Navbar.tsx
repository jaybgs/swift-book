import React from 'react';
import { Link } from 'react-router-dom';
import { useSwiftBook } from '../../context/SwiftBookContext';
import { SquishSwitch } from '../reactbits';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useSwiftBook();

  return (
    <header className="sticky top-4 z-50 px-4 w-full max-w-5xl mx-auto">
      <div className="glass-nav rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] px-5 py-2.5 flex items-center justify-between border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl bg-[#ffffff]/85 dark:bg-[#12141c]/85 transition-all">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link to="/" className="flex items-center group hover:opacity-90 active:scale-98 transition-all">
            <Logo variant="full" size="sm" />
          </Link>
        </div>

        {/* Center Nav: Compact, Balanced Floating Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#features" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#channels" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            Channels
          </a>
          <a href="#how-it-works" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            How it works
          </a>
          <a href="#testimonials" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Actions: Compact & Balanced */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center">
            <SquishSwitch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              width={38}
              height={20}
              trackOnColor="#f35921"
              trackColor="#cbd5e1"
            />
          </div>

          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </header>
  );
};
