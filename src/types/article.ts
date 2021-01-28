export type ArticleAttribute = {
  id: string;
  title: string;
  publishedAt: Date | string;
  updatedAt: Date | string;
  tags: string[];
};

export type Article = ArticleAttribute & {
  body: string;
};
