import {NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {generateSlug} from '@/lib/getSlugfromTitle';
import type {Book, GutenbergBatch} from '@/types/book';

export async function POST() {
  const supabase = await createClient();
  const startPage = 1;
  const endPage = 999;
  const batchSize = 60;

  const failedPages: {page: number; reason: string}[] = [];
  const failedBooks: {page: number; id: number; title: string; slug: string; reason: string}[] = [];

  console.time('Book Import Duration');
  console.log(`🚀 Starting import from page ${startPage} to ${endPage}`);

  try {
    for (let page = startPage; page <= endPage; page++) {
      console.log(`🔄 Fetching page ${page}...`);

      let results: any[];
      try {
        const res = await fetch(`https://gutendex.com/books?page=${page}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        results = data.results || [];
      } catch (err: any) {
        console.error(`❌ Failed to fetch page ${page}:`, err.message);
        failedPages.push({page, reason: err.message});
        continue;
      }

      let count = results.length;
      for (let i = 0; i < results.length; i += batchSize) {
        const batch = results.slice(i, i + batchSize) as GutenbergBatch[];

        const upserts: Book[] = batch.map(book => ({
          gutenberg_id: book.id,
          slug: generateSlug(book.title, count, book.id, {lowercase: true}),
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

        try {
          const {error} = await supabase.from('book').upsert(upserts);
          if (error) {
            console.error(`⚠️ Supabase error on page ${page}:`, error.message);

            // If it's a unique constraint, log each conflicting slug for investigation
            if (error.message.includes('duplicate key value')) {
              for (const book of upserts) {
                failedBooks.push({
                  page,
                  id: book.gutenberg_id,
                  title: book.title,
                  slug: book.slug,
                  reason: 'duplicate key (likely same slug)',
                });
              }
            } else {
              failedPages.push({page, reason: error.message});
            }
          }
        } catch (err: any) {
          console.error(`💥 Unexpected upsert error on page ${page}:`, err.message);
          failedPages.push({page, reason: err.message});
        }

        await new Promise(r => setTimeout(r, 300));
      }

      console.log(`✅ Finished page ${page}`);
    }

    console.timeEnd('Book Import Duration');

    console.log(
      `🏁 Import completed with ${failedPages.length} failed pages and ${failedBooks.length} failed books.`
    );

    return NextResponse.json({
      success: true,
      failedPages,
      failedBooks,
      message: `Completed with ${failedPages.length} failed pages and ${failedBooks.length} failed books.`,
    });
  } catch (err: any) {
    console.error('💥 Fatal import error:', err);
    return NextResponse.json({success: false, error: err.message}, {status: 500});
  }
}
