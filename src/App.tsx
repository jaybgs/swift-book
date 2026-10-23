import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import { SwiftBookProvider } from './context/SwiftBookContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AgentChatWidget } from './components/chat';

// Public Pages
import { HomePage } from './pages/HomePage';
import { BookPage } from './pages/BookPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Dashboard Pages
import { DashboardOverview } from './pages/DashboardOverview';
import { SitesPage } from './pages/SitesPage';
import { ChannelsPage } from './pages/ChannelsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { CalendarPage } from './pages/CalendarPage';
import { FaqAgentPage } from './pages/FaqAgentPage';
import { EnquiriesPage } from './pages/EnquiriesPage';

// Public Layout Component with SupaBird Floating Navbar, Footer & Agent Chat Widget
const PublicLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col justify-between selection:bg-[#f35921] selection:text-white bg-[#fbfbf9] dark:bg-[#0b0c10] text-zinc-900 dark:text-zinc-100 relative">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    {/* Floating AI Agent Chat Widget matching user uploaded spec */}
    <AgentChatWidget mode="platform" showFaqChips={true} />
  </div>
);

export const App: React.FC = () => {
  // SupaBird Smooth Scroll via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <SwiftBookProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Public Landing & Informational Pages (SupaBird Aesthetic) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Route>

          {/* 2. Authenticated Dashboard (Pixel-Perfect to Screenshot 1 & 2) */}
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="sites" element={<SitesPage />} />
            <Route path="channels" element={<ChannelsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="faq" element={<FaqAgentPage />} />
            <Route path="enquiries" element={<EnquiriesPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SwiftBookProvider>
  );
};
