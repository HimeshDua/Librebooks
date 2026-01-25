import {publicSupabase as supabase} from '@/lib/supabase/public';
import {MetadataRoute} from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://librebooks.vercel.app';
  // const supabase = await createClient();
  const {data: books, error} = await supabase.from('book').select('slug, created_at');

  if (error) {
    console.error('Sitemap Supabase error:', error);
    return [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/library`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = books.map(book => ({
    url: `${BASE_URL}/book/${book.slug}`,
    lastModified: new Date(book.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...bookRoutes];
}
