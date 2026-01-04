import type {Metadata, Viewport} from 'next';
import {Geist} from 'next/font/google';
import {ThemeProvider} from 'next-themes';
import './globals.css';
import './tiptap.scss';
import './readermode.css';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/nav/header';
import Footer from '@/components/nav/footer';
import {Toaster} from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  verification: {google: 'ZqN_pVPqcbynnIC9mI9y7Zk3IDzxfkwuP9hapELyTuU'},
  title: 'LibreBooks',
  description: 'FreeBooks Library – Read, explore, and manage your favorite books online.',
  applicationName: 'LibreBooks',
  authors: [{name: 'Himesh Dua', url: 'https://librebooks.vercel.app'}],
  creator: 'Himesh Dua',
  appleWebApp: {
    capable: true,
    title: 'LibreBooks',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {url: '/ios/16.png', media: '(max-resolution: 16x16)'},
      {url: '/ios/20.png', media: '(max-resolution: 20x20)'},
      {url: '/ios/29.png', media: '(max-resolution: 29x29)'},
      {url: '/ios/32.png', media: '(max-resolution: 32x32)'},
      {url: '/ios/40.png', media: '(max-resolution: 40x40)'},
      {url: '/ios/50.png', media: '(max-resolution: 50x50)'},
      {url: '/ios/57.png', media: '(max-resolution: 57x57)'},
      {url: '/ios/58.png', media: '(max-resolution: 58x58)'},
      {url: '/ios/60.png', media: '(max-resolution: 60x60)'},
      {url: '/ios/64.png', media: '(max-resolution: 64x64)'},
      {url: '/ios/72.png', media: '(max-resolution: 72x72)'},
      {url: '/ios/76.png', media: '(max-resolution: 76x76)'},
      {url: '/ios/80.png', media: '(max-resolution: 80x80)'},
      {url: '/ios/87.png', media: '(max-resolution: 87x87)'},
      {url: '/ios/100.png', media: '(max-resolution: 100x100)'},
      {url: '/ios/114.png', media: '(max-resolution: 114x114)'},
      {url: '/ios/120.png', media: '(max-resolution: 120x120)'},
      {url: '/ios/128.png', media: '(max-resolution: 128x128)'},
      {url: '/ios/144.png', media: '(max-resolution: 144x144)'},
      {url: '/ios/152.png', media: '(max-resolution: 152x152)'},
      {url: '/ios/167.png', media: '(max-resolution: 167x167)'},
      {url: '/ios/180.png', media: '(max-resolution: 180x180)'},
      {url: '/ios/192.png', media: '(max-resolution: 192x192)'},
      {url: '/ios/256.png', media: '(max-resolution: 256x256)'},
      {url: '/ios/512.png', media: '(max-resolution: 512x512)'},
      {url: '/ios/1024.png', media: '(max-resolution: 1024x1024)'},
    ],
  },
  manifest: '/manifest.ts',
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased reader max-w-screen min-h-[94vh]`}>
        <script src="https://accounts.google.com/gsi/client" async></script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* <Header /> */}
          <NextTopLoader />
          {children}
          <Toaster
            className="z-50"
            mobileOffset={20}
            expand
            closeButton
            containerAriaLabel="Message Box"
            position="bottom-center"
            richColors
            // theme={toasterTheme}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
