import { config } from '@/site.config';
import React from 'react';
import urljoin from 'url-join';

export const BasicOGPMeta: React.FC<{
  ogTitle: string;
  ogType: string;
  ogDescription: string;
  ogImageUrl?: string;
  ogUrl: string;
}> = ({ ogTitle, ogDescription, ogImageUrl, ogUrl, ogType }) => (
  <>
    <meta property="og:title" content={ogTitle} />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={ogUrl} />
    <meta
      property="og:image"
      content={ogImageUrl || urljoin(config.site.rootUrl, 'og.png')}
    />
    <meta property="og:site_name" content={config.site.title} />
    {!!ogDescription && (
      <meta property="og:description" content={ogDescription} />
    )}
  </>
);
