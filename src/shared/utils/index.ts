import { Article } from '@/src/types';
import moment from 'moment';

export const getArticlePagePath = (article: Article): string => {
  const date = moment(new Date(article.attributes.publishedAt).toISOString())
    .utc()
    .format('YYYY-MM-DD');
  const { id } = article.attributes;

  return `/articles/${date}/${id}`;
};

export const getTagsPagePath = (tagName: string): string => {
  return `/tags/${encodeURIComponent(tagName)}`;
};

export const getArticlesWithATag = (
  tagName: string,
  articles: Article[]
): Article[] => {
  return articles.filter((article) =>
    article.attributes.tags.includes(tagName)
  );
};

export const getNumberOfArticlesWithATag = (
  tagName: string,
  articles: Article[]
): number => {
  return articles.filter((article) => article.attributes.tags.includes(tagName))
    .length;
};

export const getLastModifiedDate = (article: Article): Date => {
  const log = article.changeLogs;
  if (!log || log.length < 1) return new Date(article.attributes.publishedAt);

  return new Date(log[log.length - 1].date);
};
