import path from 'path';
import { ARTICLES_DIR, CONTENT_OUTPUT_DIR } from '@/src/constants/forBuilder';
import { ArticleAttributes, ArticleChangeLog } from '@/src/types/article';
// eslint-disable-next-line import/no-extraneous-dependencies
import fm from 'front-matter';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
import gitlog from 'gitlog';

export const getDirNamesIn = (dir: string): string[] => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

export const parseMarkdownWithMeta = (
  rawMdContent: string
): { attributes: ArticleAttributes; body: string } => {
  const parsed = fm(rawMdContent);

  const attributes = parsed.attributes as ArticleAttributes;
  const { body } = parsed;

  return { attributes, body };
};

export const getChangeLog = (
  gitBranch: string,
  articleDirPath: string
): ArticleChangeLog[] => {
  const gitOption = {
    repo: '.',
    branch: gitBranch,
    file: articleDirPath,
    fields: ['abbrevHash', 'authorDate', 'subject', 'authorName'],
    nameStatus: false,
  } as const;
  const gitCommits = gitlog(gitOption);

  const log = gitCommits.map((commit) => ({
    id: commit.abbrevHash,
    date: new Date(commit.authorDate),
    description: commit.subject,
    author: commit.authorName,
  })) as ArticleChangeLog[];

  if (/^(:.+?:\s*)?PUBLISH ARTICLE$/.test(log[0]?.description)) {
    log.splice(0, 1);
  }

  return log;
};

export const copyImagesToPublic = (
  articleDir: string,
  publicDir?: string
): void => {
  const articleId = parseMarkdownWithMeta(
    fs.readFileSync(path.join(articleDir, 'index.md')).toString()
  ).attributes.id;
  const srcDir = path.join(articleDir, 'img', articleId);
  const outputDir = path.join(
    publicDir ?? 'public',
    'img',
    'article',
    articleId
  );

  if (!fs.existsSync(srcDir) || fs.readdirSync(srcDir).length < 1) {
    return;
  }

  try {
    fs.ensureDirSync(outputDir);
    fs.copySync(srcDir, outputDir);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.toString());
  }
};

export const generateArticlesJson = (
  articlesDir: string,
  outputDir: string,
  outputFileName: string
): void => {
  const eachArticlePath = getDirNamesIn(articlesDir).map((dirName) =>
    path.join(articlesDir, dirName)
  );
  const allArticleData = eachArticlePath.map((p) => ({
    ...parseMarkdownWithMeta(
      fs.readFileSync(path.join(p, 'index.md')).toString()
    ),
    changeLogs: getChangeLog('main', p),
  }));

  allArticleData.sort(
    (a, b) =>
      new Date(a.attributes.publishedAt).getTime() -
      new Date(b.attributes.publishedAt).getTime()
  );
  fs.ensureDirSync(outputDir);
  fs.writeJsonSync(path.join(outputDir, outputFileName), allArticleData);
};

(async () => {
  getDirNamesIn(ARTICLES_DIR).map((dirName) =>
    copyImagesToPublic(path.join(ARTICLES_DIR, dirName))
  );
  generateArticlesJson(ARTICLES_DIR, CONTENT_OUTPUT_DIR, 'articles.json');
})();
