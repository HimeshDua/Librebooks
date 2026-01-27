'use client';

import {Button} from '@/components/ui/button';
import {supabase} from '@/lib/supabase/client';
import {useState} from 'react';

const SPELLING_MAP: Record<string, string> = {
  humour: 'humor',
  childrens: 'children',
  sciences: 'science',
};

function splitCategory(input: string): string[] {
  return input
    .split(/[-/&():]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function normalize(input: string): string {
  return input.toLowerCase().replace(/['’.]/g, '').replace(/\s+/g, ' ').trim();
}

function canonicalize(input: string): string {
  const n = normalize(input);
  return SPELLING_MAP[n] ?? n;
}

const NOISE_PATTERNS: RegExp[] = [
  /^etc$/i,
  /^bookshelf$/i,
  /^list$/i,
  /^series$/i,
  /^review(s)?$/i,
  /^\d{4}(-\d{4})?$/,
];

function isNoise(input: string): boolean {
  return NOISE_PATTERNS.some(r => r.test(input));
}

function extractCategories(raw: string[]): string[] {
  const map = new Map<string, string>();

  for (const entry of raw) {
    for (const part of splitCategory(entry)) {
      const canon = canonicalize(part);
      if (!canon || isNoise(canon)) continue;

      if (!map.has(canon)) {
        map.set(canon, part.trim());
      }
    }
  }

  return Array.from(map.values()).sort();
}

export default function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  async function importCategory() {
    setLoading(true);

    try {
      const {data, error} = await supabase.from('book').select('bookshelves');

      if (error) {
        console.error(error.message);
        return;
      }

      if (!data) return;

      const rawCategories = data
        .flatMap(row => row.bookshelves ?? [])
        .map(s => s.replace(/^Category:\s*/i, '').trim())
        .filter(Boolean);

      const cleaned = extractCategories(rawCategories);
      setCategories(cleaned);

      const {data: _, error: categoryError} = await supabase
        .from('category')
        .update({categories: cleaned})
        .eq('id', 1);
      console.log(categoryError);
    } catch (err) {
      console.error('Error importing categories', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[69vh] flex flex-col gap-4 text-center justify-center">
      <h1 className="text-xl font-semibold">Fetch Bookshelves</h1>

      <Button
        disabled={loading}
        variant="destructive"
        className="w-full max-w-md mx-auto"
        onClick={importCategory}
      >
        {loading ? 'Processing…' : 'Import'}
      </Button>

      {categories.length > 0 && (
        <div className="max-w-3xl mx-auto text-left text-sm mt-6 grid grid-cols-2 md:grid-cols-3 gap-2">
          {categories.map(cat => (
            <div key={cat} className="px-2 py-1 rounded bg-muted text-muted-foreground">
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
