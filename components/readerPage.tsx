"use client";

import { ReactReader } from "react-reader";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Type, Maximize2, Loader2 } from "lucide-react";

export default function ReaderPage({ slug }: { slug: string }) {
  const [bookData, setBookData] = useState<ArrayBuffer | null>(null);
  const [location, setLocation] = useState<string | number>(
    typeof window !== "undefined" ? localStorage.getItem(`book-${slug}-loc`) || 0 : 0
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<number>(100);
  const [loading, setLoading] = useState(true);
  const renditionRef = useRef<any>(null);

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

  const handleLocationChange = (epubcfi: string) => {
    setLocation(epubcfi);
    localStorage.setItem(`book-${slug}-loc`, epubcfi);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (renditionRef.current) {
      renditionRef.current.themes.select(nextTheme);
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(160, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${newSize}%`);
    }
  };

  const enterFullScreen = () => {
    document.documentElement.requestFullscreen?.();
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
    <div className="relative flex flex-col h-screen bg-background text-foreground transition-all">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-20">
        <div className="font-semibold tracking-wide">📚 LibreBooks Reader</div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => adjustFontSize(-10)}
            className="hover:text-primary transition"
            title="Decrease font size"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => adjustFontSize(10)}
            className="hover:text-primary transition"
            title="Increase font size"
          >
            <Type className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="hover:text-primary transition"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={enterFullScreen}
            className="hover:text-primary transition"
            title="Full screen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Reader Container */}
      <div className="flex-1 overflow-hidden">
        <ReactReader
          url={bookData}
          location={location}
          locationChanged={handleLocationChange}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            rendition.themes.register("light", {
              body: {
                background: "#ffffff",
                color: "#111111",
              },
            });
            rendition.themes.register("dark", {
              body: {
                background: "#0f0f0f",
                color: "#e5e5e5",
              },
            });
            rendition.themes.select(theme);
            rendition.themes.fontSize(`${fontSize}%`);
          }}

        />
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-3 border-t border-border bg-background/60">
        <p>
          Sourced from{" "}
          <a
            href="https://www.gutenberg.org/"
            target="_blank"
            className="text-primary hover:underline"
          >
            Project Gutenberg
          </a>{" "}
          · LibreBooks
        </p>
      </footer>
    </div>
  );
}
