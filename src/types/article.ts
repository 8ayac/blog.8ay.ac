export type ArticleAttribute = {
  id: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  tags?: string[];
};

export type Article = ArticleAttribute & {
  body: string;
};
