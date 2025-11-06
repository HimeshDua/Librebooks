'use client';

import {useTheme} from 'next-themes';
import React from 'react';
import {Toaster} from 'sonner';
import Footer from '../nav/footer';
import Header from '../nav/header';
import {UserProvider} from '../nav/context/UserContext';

function PageShell({children}: {children: React.ReactNode}) {
  const {theme} = useTheme();
  // console.log(theme);
  const toasterTheme =
    theme === 'light' || theme === 'dark' || theme === 'system' ? theme : undefined;

  return (
    <main>
      <UserProvider>
        <Header />
        {children}
        <Toaster richColors theme={toasterTheme} />
        <Footer />
      </UserProvider>
    </main>
  );
}

export default PageShell;
