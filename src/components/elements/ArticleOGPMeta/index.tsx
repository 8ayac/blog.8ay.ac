import { config } from '@/site.config';
import { getLastModifiedDate } from '@/src/shared/utils';
import { Article } from '@/src/types';
import React from 'react';

export const ArticleOGPMeta: React.FC<{
  article: Article;
}> = ({ article }) => (
  <>
    <meta
      property="article:published_time"
      content={new Date(article.attributes.publishedAt).toISOString()}
    />
    <meta
      property="article:modified_time"
      content={getLastModifiedDate(article).toISOString()}
    />
    <meta property="article:author" content={config.site.maintainer} />
    {[...new Set(article.attributes.tags)].map((tag) => (
      <meta key={tag} property="article:tag" content={tag} />
    ))}
  </>
);
