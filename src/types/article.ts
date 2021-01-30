export type ArticleChangeLog = {
  id: string;
  date: Date;
  author: string;
  description: string;
};

export type ArticleAttributes = {
  id: string;
  title: string;
  publishedAt: Date | string;
  updatedAt: Date | string;
  tags: string[];
};

export type Article = {
  attributes: ArticleAttributes;
  body: string;
  changeLogs?: ArticleChangeLog[];
};
