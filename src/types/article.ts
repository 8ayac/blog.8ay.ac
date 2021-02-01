export type ArticleChangeLog = {
  id: string;
  date: Date | string;
  author: string;
  description: string;
};

export type ArticleAttributes = {
  id: string;
  title: string;
  publishedAt: Date | string;
  tags: string[];
};

export type Article = {
  attributes: ArticleAttributes;
  body: string;
  description: string;
  changeLogs?: ArticleChangeLog[];
};
