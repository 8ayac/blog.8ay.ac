import { config } from '@/site.config';
import urljoin from 'url-join';

export const nextSEOConfig = {
  defaultTitle: `${config.site.title}`,
  titleTemplate: `%s - ${config.site.title}`,
  description: config.site.subtitle,
  canonical: config.site.rootUrl,
  openGraph: {
    type: 'blog',
    url: config.site.rootUrl,
    title: `${config.site.title}`,
    description: config.site.subtitle,
    images: [
      {
        url: urljoin(config.site.rootUrl, 'img', 'og.png'),
      },
    ],
    site_name: config.site.title,
  },
  twitter: {
    handle: `@${config.site.maintainer}`,
    site: `@${config.site.maintainer}`,
    cardType: 'summary_large_image',
  },
} as const;
