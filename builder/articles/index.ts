import path from 'path';
import { ARTICLES_DIR } from '@/src/constants/forBuilder';
import { Article, ArticleAttribute } from '@/src/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import fm from 'front-matter';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';

export const getFileNamesIn = (dir: string): string[] => {
  return fs.readdirSync(dir).map((fname) => fname);
};

export const parseMarkdownWithMeta = (rawMdContent: string): Article => {
  const parsed = fm(rawMdContent);

  const {
    title,
    publishedAt,
    updatedAt,
    tags,
  } = parsed.attributes as ArticleAttribute;
  const { body } = parsed;

  return {
    title,
    publishedAt,
    updatedAt,
    tags,
    body,
  } as Article;
};

export const build = (outputDir: string, outputFileName: string): void => {
  const allArticleData = getFileNamesIn(ARTICLES_DIR).map((fname) =>
    parseMarkdownWithMeta(
      fs.readFileSync(path.join(ARTICLES_DIR, fname)).toString()
    )
  );

  allArticleData.sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
  fs.ensureDirSync(outputDir);
  fs.writeJsonSync(path.join(outputDir, outputFileName), allArticleData);
};

(async () => {
  const outputDir = 'src/shared/.content';
  const outputFileName = 'articles.json';

  build(outputDir, outputFileName);
})();