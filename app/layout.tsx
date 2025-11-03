import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import './tiptap.scss';
import PageShell from '@/components/layout/pageShell';

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
  userScalable: false
}

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'LibreBooks',
  description: 'FreeBooks Library – Read, explore, and manage your favorite books online.',
  applicationName: 'LibreBooks',
  manifest: '/site.webmanifest',
  // icons: {
  //   icon: [
  //     { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  //     { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
  //     { url: '/favicon.svg', type: 'image/svg+xml' },
  //   ],
  //   shortcut: '/favicon.ico',
  //   apple: [
  //     { url: '/apple-touch-icon.png', sizes: '180x180' },
  //   ],
  // },
  themeColor: '#0f172a',

  icons: {
    icon: [
      { url: "/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
      { url: "/android/android-launchericon-512-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: "/ios/180.png" },
      { url: "/ios/152.png" },
      { url: "/ios/167.png" }
    ],
  },
  appleWebApp: {
    capable: true,
    title: "LibreBooks",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/ios/2048x2732.png",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/ios/2732x2048.png",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/ios/1668x2388.png",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/ios/2388x1668.png",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/ios/1536x2048.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/ios/2048x1536.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/ios/1242x2688.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/ios/2688x1242.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/ios/1125x2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/ios/2436x1125.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/ios/828x1792.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/ios/1792x828.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/ios/750x1334.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/ios/1334x750.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageShell>{children}</PageShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
