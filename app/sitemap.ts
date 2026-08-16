import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cardos.in';

  const routes = [
    '',
    '/product',
    '/cards',
    '/rewards',
    '/offers',
    '/compare',
    '/copilot',
    '/trust',
    '/fraud',
    '/roadmap',
    '/early-access',
    '/legal',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
