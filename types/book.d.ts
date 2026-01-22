export type Book = {
  id?: number;
  slug: string;
  gutenberg_id: number;
  title: string;
  author: string;
  languages: string[];
  summaries: string[];
  epub_url?: string;
  pdf_url?: string;
  download_count: number;
  source: string;
  copyright: boolean;
  cover_url?: string;
  bookshelves: string[];
};

export type SuggestedBook = {
  id?: number;
  slug: string;
  title: string;
  author: string;
  languages: string[];
  download_count: number;
  cover_url?: string;
};

export type GutenbergBatch = {
  id: number;
  slug: string;
  gutenberg_id: number;
  title: string;
  authors: string[];
  languages: string[];
  summaries: stirng[];
  epub_url?: string;
  pdf_url?: string;
  download_count: number;
  source: string;
  copyright: boolean;
  formats: {
    'text/html': string;
    'application/epub+zip': string;
    'application/x-mobipocket-ebook': string;
    'text/plain; charset=us-ascii': string;
    'application/rdf+xml': string;
    'image/jpeg': string;
    'application/octet-stream': string;
  };
  bookshelves: string[];
};
