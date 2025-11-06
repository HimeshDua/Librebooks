export type Book = {
  id: number;
  slug: string;
  gutenberg_id: number;
  title: string;
  author: string;
  languages: string[];
  description: string | null;
  epub?: string | null;
  download_count: number | null;
  source: string | null;
  copyright: boolean;
  cover_url: string | null;
  bookshelves: string[];
};

export type localSupabase = {
  auth: {
    getClaims: () => Promise<{
      data: {claims: Record<string, any> | null};
      error: Error | null;
    }>;
  };
  from: (table: string) => {
    select: (columns: string) => {
      eq: (
        column: string,
        value: string
      ) => {
        single: () => Promise<{data: Book | null; error: Error | null}>;
      };
    };
  };
};
