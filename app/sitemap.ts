import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://librebooks.vercel.app';
  const supabase = await createClient();
  const { data: books, error } = await supabase
    .from('book')
    .select('slug, updated_at');

  if (error) {
    console.error('Sitemap Supabase error:', error);
    return [];
  }

  const bookUrls: MetadataRoute.Sitemap = books.map(book => ({
    url: `${base}/book/${book.slug}`,
    lastModified: book.updated_at
      ? new Date(book.updated_at)
      : undefined,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${base}/library`,
      lastModified: new Date(),
      priority: 0.9,
    },
    ...bookUrls,
  ];
}
