import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id?: string }> }) {
  const id = (await params).id?.replace(/\D/g, "");
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const epubUrl = `https://www.gutenberg.org/ebooks/${id}.epub.images`;
  
  try {
    const res = await fetch(epubUrl, { cache: "no-store" , });
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch EPUB: ${res.status}` }, { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/epub+zip",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Error fetching EPUB:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
