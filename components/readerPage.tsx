'use client';

import { useEffect, useRef, useState } from 'react';
import ePub, { Rendition } from 'epubjs';
import { Loader2 } from 'lucide-react';

export default function BookReader({ slug }: { slug: string }) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const epubUrl = `/api/readbook/${slug}?format=epub`; // our new API route returns .epub URL
        const res = await fetch(epubUrl);
        const { epub } = await res.json();

        if (!epub) throw new Error('EPUB not found');

        const book = ePub(epub);
        const rendition = book.renderTo(viewerRef.current!, {
          width: '100%',
          height: '96vh',
          spread: 'auto',
          allowScriptedContent: true,
        });

        renditionRef.current = rendition;
        rendition.display();

        setLoading(false);

        // Optional: keyboard navigation
        const handleKey = (e: KeyboardEvent) => {
          if (e.key === 'ArrowRight') rendition.next();
          if (e.key === 'ArrowLeft') rendition.prev();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    loadBook();
  }, [slug]);

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 text-center">
        <h2 className="text-lg font-semibold mb-2">Failed to load book</h2>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mb-3 text-primary" />
        <p>Loading EPUB...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div ref={viewerRef} className="mx-auto w-full max-w-4xl overflow-hidden" />
    </div>
  );
}
