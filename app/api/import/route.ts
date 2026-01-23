import {NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {generateSlug} from '@/lib/getSlugfromTitle';
import type {Book, GutenbergBatch} from '@/types/book';
import {env} from 'process';

export async function POST() {
  const supabase = await createClient();

  const startPage = 1;
  const endPage: number = Number(env.TOTAL_GUTENBERG_PAGE) || 2425;
  const batchSize = 60;

  const failedPages: {page: number; reason: string}[] = [];
  const skippedBooks: {page: number; id: number; title: string}[] = [];

  console.time('Book Import Duration');

  for (let page = startPage; page <= endPage; page++) {
    console.log(`📥 Fetching page ${page}`);

    let results: GutenbergBatch[];

    try {
      const res = await fetch(`https://gutendex.com/books?page=${page}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      results = data.results ?? [];
    } catch (err: any) {
      failedPages.push({page, reason: err.message});
      continue;
    }

    for (let i = 0; i < results.length; i += batchSize) {
      const batch = results.slice(i, i + batchSize);

      const gutenbergIds = batch.map(b => b.id);

      // 1️⃣ Fetch existing books in ONE query
      const {data: existing, error} = await supabase
        .from('book')
        .select('gutenberg_id')
        .in('gutenberg_id', gutenbergIds);

      if (error) {
        failedPages.push({page, reason: error.message});
        continue;
      }

      const existingIds = new Set(existing.map(b => b.gutenberg_id));

      // 2️⃣ Filter new books only
      const newBooks = batch.filter(b => {
        if (existingIds.has(b.id)) {
          skippedBooks.push({page, id: b.id, title: b.title});
          return false;
        }
        return true;
      });

      if (!newBooks.length) continue;

      // 3️⃣ Map for insert
      const inserts: Book[] = newBooks.map(book => ({
        gutenberg_id: book.id,
        slug: generateSlug(`${book.title}-${book.id}`, {
          lowercase: true,
          randNum: false,
          maxLen: 200,
        }),
        title: book.title,
        author: book.authors?.map((a: any) => a.name).join(', ') || 'Unknown',
        cover_url: book.formats?.['image/jpeg'],
        summaries: book.summaries || [],
        languages: book.languages || [],
        epub_url: book.formats?.['application/epub+zip'],
        pdf_url: book.formats?.['text/html'],
        source: 'Gutenberg',
        bookshelves: book.bookshelves || [],
        copyright: !!book.copyright,
        download_count: book.download_count || 0,
      }));

      // 4️⃣ Insert ONLY new rows
      const {error: insertError} = await supabase.from('book').insert(inserts);

      if (insertError) {
        failedPages.push({page, reason: insertError.message});
      }
    }

    console.log(`✅ Finished page ${page}`);
  }

  console.timeEnd('Book Import Duration');

  return NextResponse.json({
    success: true,
    failedPages,
    skippedBooksCount: skippedBooks.length,
    message: 'Import completed (existing books skipped)',
  });
}
