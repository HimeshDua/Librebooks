"use client";

import { ReactReader } from "react-reader";
import { useEffect, useState, useRef } from "react";
import { Type, Maximize2, Loader2, Minimize2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

type RenditionLike = {
  themes: {
    select: (theme: string) => void;
    fontSize: (size: string) => void;
  };
  next?: () => void;
  prev?: () => void;
  display?: (target?: string) => void;
};

export default function ReaderPage({ slug }: { slug: string; }) {
  const [bookData, setBookData] = useState<ArrayBuffer | null>(null);
  const [location, setLocation] = useState<string | number>(
    typeof window !== "undefined" ? localStorage.getItem(`book-${slug}-loc`) || 0 : 0
  );
  const [fontSize, setFontSize] = useState<number>(100);
  const [loading, setLoading] = useState(true);
  const renditionRef = useRef<RenditionLike | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const res = await fetch(`/api/readbook/${slug}`);
        if (!res.ok) throw new Error(`Failed to fetch book: ${res.status}`);
        const buffer = await res.arrayBuffer();
        setBookData(buffer);
      } catch (err) {
        console.error("Error loading EPUB:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  useEffect(() => {
    localStorage.setItem('theme', (theme || 'dark'));

    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  });


  const handleLocationChange = (epubcfi: string) => {
    setLocation(epubcfi);
    localStorage.setItem(`book-${slug}-loc`, epubcfi);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "dark";
    setTheme(nextTheme);
    renditionRef.current?.themes.select(nextTheme);
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(160, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    renditionRef.current?.themes.fontSize(`${newSize}%`);
  };
  const toggleFullScreen = () => {
    const doc = document;
    const docEl = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (doc.fullscreenElement) {
      doc.exitFullscreen?.();
    } else {
      docEl.requestFullscreen?.() ||
        docEl.webkitRequestFullscreen?.() ||
        docEl.mozRequestFullScreen?.() ||
        docEl.msRequestFullscreen?.();
    }
  };




  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" />
        <p>Loading your book...</p>
      </div>
    );

  if (!bookData)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>❌ Failed to load book</p>
      </div>
    );

  return (
    <div className="relative reader! flex flex-col h-screen bg-background text-foreground transition-all">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-20">
        <div className="font-semibold tracking-wide">📚 LibreBooks Reader</div>

        <div className="flex items-center gap-3">
          <Button
            variant='ghost'
            onClick={() => adjustFontSize(-10)}
            title="Decrease font size"
          >
            <Type className="w-4 h-4" />
          </Button>
          <Button
            variant='ghost'
            onClick={() => adjustFontSize(10)}
            title="Increase font size"
          >
            <Type className="w-5 h-5" />
          </Button>
          <Button
            variant='ghost'
            onClick={toggleTheme}
            title="Toggle fullscreen"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button
            onClick={toggleFullScreen}
            className="hover:text-primary transition"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>

        </div>
      </header>

      {/* Reader Container */}
      <div
        id="reader-container"
        className="flex-1 overflow-hidden bg-[#FFFACC] dark:bg-[#1C1D21] transition-colors duration-300"
      >
        <ReactReader
          url={bookData}
          location={location}
          locationChanged={handleLocationChange}
          getRendition={(rendition) => {
            renditionRef.current = rendition;

            // rendition.themes.register("system", {
            //   body: {
            //     background: "#FFFACC",
            //     color: "#111111",
            //     height: "100%",
            //   },
            // });

            rendition.themes.register("light", {
              body: {
                background: "#FFFACC",
                color: "#111111",
                height: "100%",
              },
            });
            rendition.themes.register("dark", {
              body: {
                background: "#1C1D21",
                color: "#e5e5e5",
                height: "100%",
              },
            });

            // rendition.settings.resizeOnOrientationChange = true;

            rendition.themes.select(theme || "dark");
            rendition.themes.fontSize(`${fontSize}%`);

            const container = document.querySelector(
              "#reader-container > div"
            ) as HTMLElement | null;
            if (container) {
              container.style.backgroundColor = "#1C1D21";
              container.style.height = "100%";
              container.style.transition = "background-color 0.3s ease";
            }
          }}
        // styles={{
        //   viewer: { height: "100%", background: "transparent" },
        // }}
        />
      </div>
    </div>
  );
}
