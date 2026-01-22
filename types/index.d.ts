// export type Book = {
//   id: number;
//   slug: string;
//   gutenberg_id: number;
//   title: string;
//   author: string;
//   languages: string[];
//   description: string | null;
//   epub?: string | null;
//   download_count: number | null;
//   source: string | null;
//   copyright: boolean;
//   cover_url: string | null;
//   bookshelves: string[];
// };

import type {Book} from './book';

export type LocalBook = {
  id: number;
  slug: string;
  title: string;
  author: string;
  download_count: number;
  cover_url: string | null;
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
