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
  return `/category/${encodeURIComponent(categoryName)}`;
};
