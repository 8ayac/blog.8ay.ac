import { Article } from '@/src/types';
import moment from 'moment';

export const getArticlePagePath = (article: Article): string => {
  const date = moment(new Date(article.publishedAt).toISOString())
    .utc()
    .format('YYYY-MM-DD');
  const { id } = article;

  return `/articles/${date}/${id}`;
};

export const getCategoryPagePath = (categoryName: string): string => {
  return `/tags/${encodeURIComponent(categoryName)}`;
};

export const getArticlesWithATag = (
  tagName: string,
  articles: Article[]
): Article[] => {
  return articles.filter((article) => article.tags.includes(tagName));
};

export const getNumberOfArticlesWithATag = (
  tagName: string,
  articles: Article[]
): number => {
  return articles.filter((article) => article.tags.includes(tagName)).length;
};
