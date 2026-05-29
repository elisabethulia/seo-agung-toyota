import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://seo-agung-toyota.vercel.app',
      lastModified: new Date(),
    },
  ]
}