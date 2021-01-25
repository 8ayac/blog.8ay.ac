import path from 'path';
import { ARTICLES_DIR, CONTENT_OUTPUT_DIR } from '@/src/constants/forBuilder';
import { Article, ArticleAttribute } from '@/src/types/article';
// eslint-disable-next-line import/no-extraneous-dependencies
import fm from 'front-matter';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';

export const getDirNamesIn = (dir: string): string[] => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

export const parseMarkdownWithMeta = (rawMdContent: string): Article => {
  const parsed = fm(rawMdContent);

  const {
    id,
    title,
    publishedAt,
    updatedAt,
    tags,
  } = parsed.attributes as ArticleAttribute;
  const { body } = parsed;

  return {
    id,
    title,
    publishedAt,
    updatedAt,
    tags,
    body,
  } as Article;
};

export const copyImagesToPublic = (
  articleDir: string,
  publicDir?: string
): void => {
  const articleId = parseMarkdownWithMeta(
    fs.readFileSync(path.join(articleDir, 'index.md')).toString()
  ).id;
  const srcDir = path.join(articleDir, 'img', articleId);
  const outputDir = path.join(
    publicDir ?? 'public',
    'img',
    'article',
    articleId
  );

  try {
    fs.ensureDirSync(outputDir);
    fs.copySync(srcDir, outputDir);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
};

export const generateArticlesJson = (
  articlesDir: string,
  outputDir: string,
  outputFileName: string
): void => {
  const allArticleData = getDirNamesIn(articlesDir).map((dirName) =>
    parseMarkdownWithMeta(
      fs.readFileSync(path.join(articlesDir, dirName, 'index.md')).toString()
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
  generateArticlesJson(ARTICLES_DIR, CONTENT_OUTPUT_DIR, 'articles.json');
})();
