import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id?: string }> }) {
  const id = (await params).id;
  console.log('Fetching book with id:', id);
  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  const safeId = id.replace(/\D/g, '');

  if (!safeId) {
    return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 });
  }

  const epubUrl = `https://www.gutenberg.org/ebooks/${safeId}.epub.images`; // direct EPUB URL

  try {
    const res = await fetch(epubUrl, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${res.status}` }, { status: res.status });
    }

    return NextResponse.json({ epub: epubUrl });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error fetching book:', e);
      return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
    } else {
      console.error('Unknown error fetching book:', e);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
