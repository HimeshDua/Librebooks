'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Footer from '../nav/footer';
import Header from '../nav/header';
import { UserProvider } from '../nav/context/UserContext';

function PageShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [showLayout, setShowLayout] = useState(true);
  // console.log(theme);
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setShowLayout(!isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toasterTheme =
    theme === 'light' || theme === 'dark' || theme === 'system' ? theme : undefined;

  return (
    <main>
      <UserProvider>
        {showLayout && <Header />}
        {children}
        <Toaster className='z-50' richColors theme={toasterTheme} />
        {showLayout && <Footer />}
      </UserProvider>
    </main>
  );
}

export default PageShell;
