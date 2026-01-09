import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://librebooks.vercel.app';
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/book/favorites/`, lastModified: new Date() },
    { url: `${base}/library/`, lastModified: new Date() },
    { url: `${base}/auth/sign-up`, lastModified: new Date() },
    { url: `${base}/auth/login`, lastModified: new Date() },
  ];
}
