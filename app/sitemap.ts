import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://librebooks.vercel.app';

  const books = await prisma.book.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const bookUrls: MetadataRoute.Sitemap = books.map(book => ({
    url: `${base}/book/${book.slug}`,
    lastModified: book.updatedAt,
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
    {
      url: `${base}/auth/sign-up`,
      priority: 0.3,
    },
    {
      url: `${base}/auth/login`,
      priority: 0.3,
    },
    ...bookUrls,
  ];
}
