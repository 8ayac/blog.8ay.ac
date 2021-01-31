import { config } from '@/site.config';
import React from 'react';
import urljoin from 'url-join';

export const TwitterOGPMeta: React.FC<{
  ogImageUrl?: string;
}> = ({ ogImageUrl }) => (
  <>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={`@${config.site.maintainer}`} />
    <meta name="twitter:creator" content={`@${config.site.maintainer}`} />
    <meta
      name="twitter:image"
      content={ogImageUrl || urljoin(config.site.rootUrl, 'og.png')}
    />
  </>
);
