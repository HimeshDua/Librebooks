'use client';

import {ReactReader} from 'react-reader';
import {useEffect, useState, useRef, useCallback} from 'react';
import {
  Type,
  Maximize2,
  Loader2,
  Minimize2,
  Moon,
  Sun,
  Laptop,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
} from 'lucide-react';
import {useTheme} from 'next-themes';
import {Button} from './ui/button';
import {useRouter} from 'next/navigation';
import {useIsMobile} from '@/hooks/useIsMobile';
import {cn} from '@/lib/utils';
import {toast} from 'sonner';

type RenditionLike = {
  themes: {
    select: (theme: string) => void;
    fontSize: (size: string) => void;
  };
  next?: () => void;
  prev?: () => void;
  display?: (target?: string) => void;
};

type TocItem = {
  label: string;
  href: string;
};

export default function ReaderPage({slug}: {slug: string}) {
  const [bookData, setBookData] = useState<ArrayBuffer | null>(null);
  const [location, setLocation] = useState<string | number>(
    typeof window !== 'undefined' ? localStorage.getItem(`book-${slug}-loc`) || 0 : 0
  );
  const [fontSize, setFontSize] = useState<number>(100);
  const [loading, setLoading] = useState(true);
  const [loadingServer, setLoadingServer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);
  const {theme, setTheme} = useTheme();
  const renditionRef = useRef<RenditionLike | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        setLoadingServer(true);
        const res = await fetch(`/api/readbook/${slug}`);
        if (!res.ok) throw new Error(`Failed to fetch book: ${res.status}`);
        const buffer = await res.arrayBuffer();
        setLoadingServer(false);
        setBookData(buffer);
      } catch (err) {
        console.error('Error loading EPUB:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    handleMouseMove(); // Initial setup

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handleLocationChange = useCallback(
    (epubcfi: string) => {
      setLocation(epubcfi);
      localStorage.setItem(`book-${slug}-loc`, epubcfi);
    },
    [slug]
  );

  // Theme synchronization with reader
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.select(theme || 'dark');

      // Also update the container background
      const container = document.querySelector('#reader-container') as HTMLElement;
      if (container) {
        container.style.backgroundColor = theme === 'light' ? '#FFFACC' : '#1C1D21';
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'system' ? 'dark' : 'light';
    setTheme(nextTheme);
    setTimeout(() => {
      toast.info('Refresh the page after changing theme', {
        duration: 3,
      });
    }, 300);
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(160, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    renditionRef.current?.themes.fontSize(`${newSize}%`);
  };

  const resetFontSize = () => {
    setFontSize(100);
    renditionRef.current?.themes.fontSize('100%');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const handlePrev = () => {
    renditionRef.current?.prev?.();
  };

  const handleNext = () => {
    renditionRef.current?.next?.();
  };

  const handleBack = () => {
    router.back();
  };

  const toggleToc = () => {
    setShowToc(!showToc);
  };

  const handleTocClick = (href: string) => {
    renditionRef.current?.display?.(href);
    setShowToc(false);
    setLocation(href);
  };

  const isMobile = useIsMobile();

  if (loadingServer || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-lg font-medium">
            {loadingServer ? 'Downloading your book' : 'Loading your book'}...
          </span>
        </div>
        <p className="text-muted-foreground text-balance text-center">
          Please wait while we prepare your reading experience
        </p>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <div className="text-6xl">📚</div>
          <h1 className="text-2xl font-bold text-red-500">Failed to load book</h1>
          <p className="text-muted-foreground">The book could not be loaded. Please try again.</p>
          <Button onClick={handleBack} className="mt-4">
            <Home className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen bg-background text-foreground transition-all overflow-hidden">
      {/* Top Controls */}
      <div
        className={`
        absolute top-0 left-0 right-0 z-50 transition-all duration-300
        ${showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      >
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Library</span>
            </Button>

            {/* Menu/Chapters Button */}
            <Button
              variant="ghost"
              onClick={toggleToc}
              className="flex items-center gap-2 hover:bg-primary/10"
              title="Table of Contents"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Chapters</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <div className="text-sm font-medium hidden sm:block">LibreBooks Reader</div>
          </div>

          <div className="flex items-center gap-1">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1 mr-2 border-r border-border/50 pr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => adjustFontSize(-10)}
                title="Decrease font size"
                className="h-9 w-9"
              >
                <Type className="w-4 h-4" />
                <span className="sr-only">Decrease font size</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetFontSize}
                title="Reset font size"
                className="h-9 px-2 text-xs font-normal"
              >
                {fontSize}%
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => adjustFontSize(10)}
                title="Increase font size"
                className="h-9 w-9"
              >
                <Type className="w-4 h-4" />
                <span className="sr-only">Increase font size</span>
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : theme === 'system' ? (
                <Laptop className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullScreen}
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="h-9 w-9"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="sr-only">Toggle fullscreen</span>
            </Button>
          </div>
        </header>
      </div>

      {/* Table of Contents Sidebar */}
      <div
        className={`
        fixed left-0 top-0 bottom-0 z-50 w-80 bg-background/95 backdrop-blur-lg border-r border-border/50
        transform transition-transform duration-300 ease-in-out
        ${showToc ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Table of Contents</h2>
            <Button variant="ghost" size="sm" onClick={toggleToc}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="h-full overflow-y-auto p-4">
          {toc.length > 0 ? (
            <ul className="space-y-2">
              {toc.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleTocClick(item.href)}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>No chapters available</p>
            </div>
          )}
        </div>
      </div>

      {showToc && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={toggleToc} />
      )}

      <div
        id="reader-container"
        className="relative flex-1 overflow-hidden bg-[#FFFACC] dark:bg-[#1C1D21] transition-colors duration-300"
      >
        {/* Navigation Buttons - Visible on hover */}
        <div
          className={`
          absolute inset-0 z-40 pointer-events-none
          ${showControls ? 'opacity-100' : 'opacity-40 md:opacity-0'}
          transition-opacity duration-300
        `}
        >
          <Button
            onClick={handlePrev}
            className={cn(
              `absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto
               h-12 w-12 rounded-full bg-primary/80 hover:bg-primary
               backdrop-blur-sm transition-all duration-200
               sm:left-4 sm:h-14 sm:w-14`,
              isMobile && 'opacity-70' // Slightly transparent on mobile
            )}
            size="icon"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="sr-only">Previous page</span>
          </Button>

          <Button
            onClick={handleNext}
            className={cn(
              `absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto
               h-12 w-12 rounded-full bg-primary/80 hover:bg-primary
               backdrop-blur-sm transition-all duration-200
               sm:right-4 sm:h-14 sm:w-14`,
              isMobile && 'opacity-70'
            )}
            size="icon"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <div
          className={`
          absolute -bottom-4 left-0 right-0 z-50 transition-all duration-300
          ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}
        >
          <div className="px-4 py-3 bg-background/95! backdrop-blur-lg border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Reading Progress</span>
              <span>Font: {fontSize}%</span>
            </div>
            <div className="z-50 w-full bg-muted/50 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{width: typeof location === 'string' ? '0%' : `${location}%`}}
              />
            </div>
          </div>
        </div>

        {/* React Reader */}
        <ReactReader
          url={bookData}
          location={location}
          locationChanged={handleLocationChange}
          getRendition={rendition => {
            renditionRef.current = rendition;

            // Get table of contents
            rendition.book.loaded.navigation.then(tocData => {
              if (tocData?.toc) {
                const tocItems: TocItem[] = tocData.toc.map(item => ({
                  label: item.label,
                  href: item.href,
                }));
                setToc(tocItems);
              }
            });

            // Register themes
            rendition.themes.register('light', {
              body: {
                background: '#FFFACC',
                color: '#111111',
                height: '100%',
                lineHeight: '1.6',
                margin: '0',
                padding: '2rem',
              },
              'p, div, span': {
                lineHeight: 'inherit',
              },
              'a:hover, p:hover': {
                color: 'inherit',
              },
            });

            rendition.themes.register('dark', {
              body: {
                background: '#1C1D21',
                color: '#e5e5e5',
                height: '100%',
                lineHeight: '1.6',
                margin: '0',
                padding: '2rem',
              },
              'p, div, span': {
                lineHeight: 'inherit',
              },
              'a:hover, p:hover': {
                color: 'inherit',
              },
            });

            rendition.themes.select(theme || 'dark');
            rendition.themes.fontSize(`${fontSize}%`);

            // Style the container
            const reactReaderContainer = document.querySelector(
              '#reader-container > div'
            ) as HTMLElement;
            if (reactReaderContainer) {
              reactReaderContainer.style.height = '100%';
              reactReaderContainer.style.display = 'flex';
              reactReaderContainer.style.flexDirection = 'column';
            }
          }}
          // styles={{
          //   container: {
          //     height: '100%',
          //     position: 'relative',
          //   },
          //   readerArea: {
          //     height: '100%',
          //     backgroundColor: 'transparent',
          //   },
          // }}
        />
      </div>

      {/* Mobile Bottom Controls */}
      <div className="sm:hidden">
        <div
          className={`
          fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/50
          transition-all duration-300 p-3
          ${showControls ? 'translate-y-0' : 'translate-y-full'}
        `}
        >
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handlePrev} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Prev
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleToc} className="flex-1">
              <Menu className="w-4 h-4 mr-2" />
              Chapters
            </Button>

            <Button variant="ghost" size="sm" onClick={handleNext} className="flex-1">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
