export type ArticleAttribute = {
  title: string;
  publishedAt: Date;
  updatedAt: Date;
  tags?: string[];
};

export type Article = ArticleAttribute & {
  body: string;
};
