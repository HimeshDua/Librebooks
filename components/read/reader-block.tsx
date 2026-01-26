'use client';

import {useEffect, useState, useRef, useCallback} from 'react';
import {ThemeToggleButton} from '../book/toggleThemeButton';
import {useIsMobile} from '@/hooks/useIsMobile';
import {useRouter} from 'next/navigation';
import {ReactReader, type RenditionOptionsFix} from 'react-reader';
import {useTheme} from 'next-themes';
import {Button} from '../ui/button';
import {get, set} from 'idb-keyval';
import {cn} from '@/lib/utils';
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Home,
  Maximize2,
  Menu,
  Minimize2,
  MousePointer,
  Reload,
  Trash,
  Type,
} from '@hugeicons/core-free-icons';
import {HugeiconsIcon} from '@hugeicons/react';
import ReaderSkeleton from '../skeletons/reader';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {Card} from '../ui/card';

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

type ReaderPageProps = {
  slug: string;
};

export default function ReaderComponent({slug}: ReaderPageProps) {
  const [bookData, setBookData] = useState<ArrayBuffer | null>();
  const [location, setLocation] = useState<string | number>(
    typeof window !== 'undefined' ? localStorage.getItem(`book-${slug}-loc`) || 0 : 0
  );

  const [selections, setSelections] = useState<any[]>([]);
  const [rendition, setRendition] = useState<any | undefined>(undefined);
  const [color, setColor] = useState('oklch(0.59 0.22 1)');

  const [renderKey, setRenderKey] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(100);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);
  const {theme} = useTheme();
  const renditionRef = useRef<RenditionLike | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const cachedBook = await get(`book-${slug}`);
        if (cachedBook) {
          console.log('Loaded from IndexedDB');
          setBookData(cachedBook);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/readbook/${slug}`);
        if (!res.ok) throw new Error(`Failed to fetch book: ${res.status}`);
        const buffer = await res.arrayBuffer();

        await set(`book-${slug}`, buffer);
        console.log('Saved to IndexedDB');

        setBookData(buffer);
      } catch (err) {
        console.error('Error loading EPUB:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  useEffect(() => {
    if (rendition) {
      function setRenderSelection(cfiRange: string, contents: any) {
        if (rendition) {
          setSelections(list =>
            list.concat({
              text: rendition.getRange(cfiRange).toString(),
              cfiRange,
            })
          );
          rendition.annotations.add(
            'highlight',
            cfiRange,
            {},
            (e: MouseEvent) => console.log('click on selection', cfiRange, e),
            'my-class',
            {fill: color}
          );
          const selection = contents.window.getSelection();
          selection?.removeAllRanges();
        }
      }
      rendition.on('selected', setRenderSelection);
      return () => {
        rendition?.off('selected', setRenderSelection);
      };
    }
  }, [setSelections, rendition]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

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

    handleMouseMove();

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

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.select(theme || 'dark');

      setColor(theme == 'dark' ? 'oklch(0.66 0.21 354)' : 'oklch(0.59 0.22 1)');

      const container = document.querySelector('#reader-container') as HTMLElement;
      if (container) {
        container.style.backgroundColor = theme === 'light' ? '#FFFACC' : '#1C1D21';
      }
    }
  }, [theme]);

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

  if (loading) {
    return <ReaderSkeleton />;
  }

  if (!bookData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <div className="text-6xl">📚</div>
          <h1 className="text-2xl font-bold text-red-500">Failed to load book</h1>
          <p className="text-muted-foreground">The book could not be loaded. Please try again.</p>
          <Button onClick={handleBack} className="mt-4">
            <HugeiconsIcon icon={Home} className="size-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen pb-8 bg-background text-foreground transition-all overflow-hidden">
      {!isMobile && (
        <div className="fixed bottom-20 right-4 z-50">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-lg relative hover:scale-105 transition-transform duration-200"
                  title={
                    selections.length > 0
                      ? `View ${selections.length} highlight${selections.length !== 1 ? 's' : ''}`
                      : 'No highlights yet'
                  }
                >
                  <HugeiconsIcon icon={Bookmark} className="size-5" />
                  {selections.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {selections.length}
                    </span>
                  )}
                </Button>
              }
            />
            <PopoverContent className="w-80" align="end" side="top" dir="tl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium leading-none">Highlights</h4>
                  {selections.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {selections.length} item{selections.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {selections.length > 0 ? (
                    <ul className="space-y-4">
                      {selections.map(({text, cfiRange}, i) => (
                        <li
                          key={i}
                          className="p-3 bg-muted/50 rounded-lg group hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-muted-foreground">Highlight {i + 1}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                rendition?.display(cfiRange);
                              }}
                              className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <HugeiconsIcon icon={ArrowRight} className="size-3 mr-1" />
                              Go to
                            </Button>
                          </div>
                          <p className="text-sm line-clamp-3 italic mb-3">{text}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(text);
                                // You could add a toast notification here
                              }}
                              className="h-6 px-2 text-xs flex-1"
                            >
                              <HugeiconsIcon icon={Copy} className="size-3 mr-1" />
                              Copy
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                rendition?.annotations.remove(cfiRange, 'highlight');
                                setSelections(selections.filter((item, j) => j !== i));
                              }}
                              className="h-6 px-2 text-xs flex-1"
                            >
                              <HugeiconsIcon icon={Trash} className="size-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-8 text-center space-y-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                        <HugeiconsIcon
                          icon={Bookmark}
                          className="size-8 text-muted-foreground/60"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">No highlights yet</h5>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                          Select any text while reading to save it here for later reference
                        </p>
                      </div>
                      <div className="pt-2">
                        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                          <HugeiconsIcon icon={MousePointer} className="size-3" />
                          <span>Click & drag to select text</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selections.length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Highlights are saved locally</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const confirm = window.confirm(
                            `Are you sure you want to remove all ${selections.length} highlight${selections.length !== 1 ? 's' : ''}?`
                          );
                          if (confirm) {
                            selections.forEach(({cfiRange}) => {
                              rendition?.annotations.remove(cfiRange, 'highlight');
                            });
                            setSelections([]);
                          }
                        }}
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                        disabled={selections.length === 0}
                      >
                        Clear all
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      {/* Top Controls */}

      <header
        className={cn(
          'flex items-center justify-between px-4 py-3 z-50',
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
          isMobile && 'translate-y-0 opacity-100'
        )}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <HugeiconsIcon icon={ChevronLeft} className="size-4" />
            <span className="hidden sm:inline">Library</span>
          </Button>

          <Button
            variant="ghost"
            onClick={toggleToc}
            className="flex items-center gap-2 hover:bg-primary/10"
            title="Table of Contents"
          >
            <HugeiconsIcon icon={Menu} className="size-4" />

            <span className="hidden sm:inline">Chapters</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <div className="text-sm font-medium hidden sm:block">LibreBooks Reader</div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 mr-2 border-r border-border/50 pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRenderKey(prev => prev + 1)}
              title="Reload Page"
              className="h-9 w-9"
            >
              <HugeiconsIcon icon={Reload} className="size-4" />
              <span className="sr-only">Reload the page</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => adjustFontSize(-10)}
              title="Decrease font size"
              className="h-9 w-9"
            >
              <HugeiconsIcon icon={Type} className="size-4" />
              <span className="sr-only">Decrease font size</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={resetFontSize}
              title="Reset font size"
              className="h-9 px-2 text-xs font-normal "
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
              <HugeiconsIcon icon={Type} className="size-4" />
              <span className="sr-only">Increase font size</span>
            </Button>
          </div>

          <ThemeToggleButton updateRenderKey={() => setRenderKey(prev => prev + 1)} />

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullScreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="h-9 w-9"
          >
            {isFullscreen ? (
              <HugeiconsIcon icon={Minimize2} className="size-4" />
            ) : (
              <HugeiconsIcon icon={Maximize2} className="size-4" />
            )}
            <span className="sr-only">Toggle fullscreen</span>
          </Button>
        </div>
      </header>

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
              <HugeiconsIcon icon={ChevronLeft} className="size-4" />
            </Button>
          </div>
        </div>
        <div className="h-full overflow-y-auto p-4 pb-36 sm:pb-4">
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
        {/* Navigation Buttons */}
        {!isMobile && (
          <div
            className={cn(
              'absolute inset-0 z-40 pointer-events-none',
              showControls ? 'opacity-100' : 'opacity-40 md:opacity-0',
              'transition-opacity duration-300'
            )}
          >
            <Button
              onClick={handlePrev}
              className={cn(
                `absolute left-2 top-1/2 -translate-y-1/2 pointer-events-auto
               h-12 w-12 rounded-full bg-primary/80 hover:bg-primary
               backdrop-blur-sm transition-all duration-200
               sm:left-4 sm:h-14 sm:w-14`,
                isMobile && 'opacity-70'
              )}
              size="icon"
            >
              <HugeiconsIcon icon={ChevronLeft} className="size-6 sm:size-7" />
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
              <HugeiconsIcon icon={ChevronRight} className="size-6 sm:7" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        )}

        {/* React Reader */}
        <ReactReader
          swipeable={isMobile ? true : false}
          url={bookData}
          key={renderKey}
          location={location}
          locationChanged={handleLocationChange}
          epubOptions={{
            allowPopups: true,
            allowScriptedContent: true,
          }}
          getRendition={renditionProp => {
            setRendition(renditionProp);

            renditionProp.hooks.content.register((contents: any) => {
              const document = contents.window.document;
              console.log('document', document);
              if (document) {
                const css = `
                        .epubjs-hl {
                          border: 1px solid black;
                        }
                        `;
                const style = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
              }
            });

            // rendition.hooks.render((r)=?)
            renditionRef.current = renditionProp;

            renditionProp.book.loaded.navigation.then(tocData => {
              if (tocData?.toc) {
                const tocItems: TocItem[] = tocData.toc.map(item => ({
                  label: item.label,
                  href: item.href,
                }));
                setToc(tocItems);
              }
            });

            renditionProp.themes.default('light');

            renditionProp.themes.register('light', {
              body: {
                background: '#fffacc',
                color: '#1B1B1B',
                height: '100%',
                lineHeight: '1.8',
                margin: '0',
                padding: '2.5rem',
                fontFamily: "'Georgia', 'Iowan Old Style', 'serif'",
                textRendering: 'optimizeLegibility',
              },
              'p, div, span': {
                lineHeight: 'inherit',
                color: 'inherit',
              },
              'a:hover, p:hover': {
                color: 'inherit',
                textDecoration: 'none',
              },
            });

            renditionProp.themes.register('dark', {
              body: {
                background: '#1b1d1e',
                color: '#D8D3C3',
                height: '100%',
                lineHeight: '1.8',
                margin: '0',
                padding: '2.5rem',
                fontFamily: "'Georgia', 'Iowan Old Style', 'serif'",
                textRendering: 'optimizeLegibility',
              },
              'p, div, span': {
                lineHeight: 'inherit',
                color: 'inherit',
              },
              'a:hover, p:hover': {
                color: 'inherit',
                textDecoration: 'none',
              },
            });

            renditionProp.themes.select(theme || 'dark');
            renditionProp.themes.fontSize(`${fontSize}%`);

            const reactReaderContainer = document.querySelector(
              '#reader-container > div'
            ) as HTMLElement;
            if (reactReaderContainer) {
              reactReaderContainer.style.height = '100%';
              reactReaderContainer.style.display = 'flex';
              reactReaderContainer.style.flexDirection = 'column';
            }
          }}
        />
      </div>

      {/* Mobile Bottom Controls */}
      {isMobile && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 p-3">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handlePrev} className="flex-1 py-3">
              <HugeiconsIcon icon={ChevronLeft} className="size-4 mr-2" />
              Prev
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleToc} className="flex-1 py-3">
              <HugeiconsIcon icon={Menu} className="size-4 mr-2" />
              Chapters
            </Button>

            <Button variant="ghost" size="sm" onClick={handleNext} className="flex-1 py-3">
              Next
              <HugeiconsIcon icon={ChevronRight} className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
