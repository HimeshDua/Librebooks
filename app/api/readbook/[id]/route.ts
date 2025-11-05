import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id?: string }> }) {
  const id = (await params).id;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const safeId = id.replace(/\D/g, '');
  if (!safeId) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const epubUrl = `https://www.gutenberg.org/ebooks/${safeId}.epub.images`; // direct EPUB URL
  return NextResponse.json({ epub: epubUrl });
}
