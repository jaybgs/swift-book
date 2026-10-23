import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  LayoutGrid, 
  Globe, 
  Send, 
  Bell, 
  Calendar as CalendarIcon, 
  LogOut, 
  ArrowLeft,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import { useSwiftBook } from '../../context/SwiftBookContext';
import { Logo } from '../common/Logo';

// React Bits Staggered Menu variants (Fluid spring stagger with blur entrance)
const mobileDrawerVariants: Variants = {
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      damping: 32,
      stiffness: 300,
      staggerChildren: 0.035,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 260,
      delayChildren: 0.08,
      staggerChildren: 0.065,
    },
  },
};

const mobileMenuItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -24,
    filter: 'blur(8px)',
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
};

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.2 } },
};

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { activeSite } = useSwiftBook();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/app', icon: LayoutGrid },
    { label: 'Sites', path: '/app/sites', icon: Globe },
    { label: 'Channels', path: '/app/channels', icon: Send },
    { label: 'Notifications', path: '/app/notifications', icon: Bell },
    { label: 'Calendar', path: '/app/calendar', icon: CalendarIcon },
    { label: 'Enquiries', path: '/app/enquiries', icon: MessageSquare },
  ];

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  const currentNav = navItems.find(item => item.path === location.pathname);
  const currentLabel = currentNav ? currentNav.label : 'Dashboard';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fbfbf9] dark:bg-[#0b0c10] text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      
      {/* ============================================================ */}
      {/* 1. MOBILE TOP NAVIGATION BAR (Visible ONLY on mobile screens < md) */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-[#11131a]/95 border-b border-zinc-200/80 dark:border-white/[0.08] backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 -ml-1 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/app" className="flex items-center group hover:opacity-90 transition-opacity">
            <Logo variant="full" size="sm" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f35921] font-semibold border border-orange-500/20">
            {currentLabel}
          </span>
          <Link
            to="/"
            className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. COLLAPSIBLE MOBILE DRAWER (React Bits Staggered Menu Animation) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsMobileNavOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in sidebar drawer with React Bits Staggered Menu */}
            <motion.aside
              variants={mobileDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-[#11131a] border-r border-zinc-200/80 dark:border-white/[0.08] p-6 shadow-2xl flex flex-col justify-between md:hidden"
            >
              
              <div className="space-y-6">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between">
                  <Link to="/" onClick={() => setIsMobileNavOpen(false)} className="flex items-center group hover:opacity-90 transition-opacity">
                    <Logo variant="full" size="md" />
                  </Link>

                  <button
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Staggered Navigation Items */}
                <motion.nav className="space-y-1">
                  {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.path} variants={mobileMenuItemVariants}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileNavOpen(false)}
                          className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm transition-all ${
                            isActive
                              ? 'bg-[#121212] dark:bg-white text-white dark:text-black font-semibold shadow-sm'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] font-medium'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.4]' : 'text-zinc-400'}`} />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* Bottom Section */}
              <motion.div
                variants={mobileMenuItemVariants}
                className="pt-4 border-t border-zinc-200/70 dark:border-white/[0.08] space-y-3 px-1 text-xs"
              >
                <div className="text-zinc-500 dark:text-zinc-400 truncate font-normal">
                  jeffmails22@gmail.com
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => alert('Signed out')}
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </button>

                  <Link
                    to="/"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-[#f35921] transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Landing Page</span>
                  </Link>
                </div>
              </motion.div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 3. PERMANENT DESKTOP SIDEBAR (Visible on md and larger) */}
      {/* ============================================================ */}
      <aside className="hidden md:flex w-60 sm:w-64 shrink-0 bg-white dark:bg-[#11131a] border-r border-zinc-200/70 dark:border-white/[0.08] flex-col justify-between p-6 min-h-screen sticky top-0 h-screen">
        
        {/* Top: Logo & Navigation */}
        <div className="space-y-8">
          
          {/* Logo: SwiftBook */}
          <Link to="/" className="flex items-center px-1 group hover:opacity-90 transition-opacity">
            <Logo variant="full" size="md" />
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm transition-all ${
                    isActive
                      ? 'bg-[#121212] dark:bg-white text-white dark:text-black font-semibold shadow-sm'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.4]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Bottom of Sidebar (Matching Screenshot 1 & 2): User email + Sign out */}
        <div className="pt-4 border-t border-zinc-200/70 dark:border-white/[0.08] space-y-3 px-1 text-xs">
          <div className="text-zinc-500 dark:text-zinc-400 truncate font-normal">
            jeffmails22@gmail.com
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => alert('Signed out')}
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-[#f35921] transition-colors"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Landing</span>
            </Link>
          </div>
        </div>

      </aside>

      {/* ============================================================ */}
      {/* 4. MAIN CONTENT AREA (Full Width on mobile, filling canvas) */}
      {/* ============================================================ */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full min-w-0 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
