import { pageMetadata } from './metadata-config';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://paprly.in';
  
  // Get all pages from metadata config
  const pages = Object.keys(pageMetadata);
  
  const sitemapEntries = pages.map((page) => {
    const metadata = pageMetadata[page];
    const url = page === 'home' ? baseUrl : `${baseUrl}/${page}`;
    
    return {
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === 'home' ? 1.0 : 0.8,
    };
  });

  // Add additional important pages that might not be in metadata
  const additionalPages = [
    {
      url: `${baseUrl}/contracts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/editor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // {
    //   url: `${baseUrl}/e-sign`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
    {
      url: `${baseUrl}/blank-editor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contract-editor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/e-sign-editor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [...sitemapEntries, ...additionalPages];
}
