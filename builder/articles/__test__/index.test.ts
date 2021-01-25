import * as fs from 'fs';
import path from 'path';
import {
  build,
  copyImagesToPublic,
  getDirNamesIn,
  parseMarkdownWithMeta,
} from '@/builder/articles';

const readFileSyncAsJSON = (fpath: string) => {
  return JSON.parse(fs.readFileSync(fpath, { encoding: 'utf8' }));
};

const TESTDATA_DIR = path.join(__dirname, 'testdata');

describe('getDirNamesIn', () => {
  it('can get names of directories that contains each article', () => {
    expect(getDirNamesIn(path.join(TESTDATA_DIR, 'articles'))).toEqual([
      'example01',
      'example02',
      'example03',
    ]);
  });
});

describe('parseMarkdownWithMeta', () => {
  const mdPath = path.join(TESTDATA_DIR, 'articles', 'example01', 'index.md');
  const mdRawContent = fs.readFileSync(mdPath).toString();
  const parsed = parseMarkdownWithMeta(mdRawContent);

  it('can parse meta attributes and body from the Markdown file', () => {
    expect(parsed).toMatchObject({
      id: 'example01',
      title: 'Example01',
      publishedAt: '2000-01-01 00:00:00 +0900',
      updatedAt: '2000-01-01 00:00:00 +0900',
      tags: ['example1-1', 'example1-2', 'example1-3'],
      body: /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue\.png\)(\r?\n)!\[red]\(img\/red\.png\)(\r?\n)+$/,
    });
  });
});

describe('copyImageDirectories', () => {
  const testArticleDir = path.join(TESTDATA_DIR, 'articles', 'example01');
  const testPublicRoot = path.join(TESTDATA_DIR, '.public');

  const testArticleId = parseMarkdownWithMeta(
    fs.readFileSync(path.join(testArticleDir, 'index.md')).toString()
  ).id;
  const expectOutputDir = path.join(
    testPublicRoot,
    'img',
    'article',
    testArticleId
  );

  afterEach(() => {
    fs.rmdirSync(testPublicRoot, { recursive: true });
  });

  it('can copy all images to proper directory', () => {
    copyImagesToPublic(testArticleDir, testPublicRoot);
    expect(fs.readdirSync(expectOutputDir)).toEqual(['blue.png', 'red.png']);
  });
});

describe('build', () => {
  const testArticlesDir = path.join(TESTDATA_DIR, 'articles');
  const testOutputDir = path.join(TESTDATA_DIR, '.contents');
  const testOutputFileName = 'articles.test.json';

  beforeAll(() => {
    build(testArticlesDir, testOutputDir, testOutputFileName);
  });

  afterAll(() => {
    fs.rmdirSync(testOutputDir, { recursive: true });
  });

  it('can generate a json which contains all the article data', () => {
    expect(
      readFileSyncAsJSON(path.join(testOutputDir, testOutputFileName))
    ).toMatchObject([
      {
        id: 'example01',
        title: 'Example01',
        publishedAt: '2000-01-01 00:00:00 +0900',
        updatedAt: '2000-01-01 00:00:00 +0900',
        tags: ['example1-1', 'example1-2', 'example1-3'],
        body: /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue\.png\)(\r?\n)!\[red]\(img\/red\.png\)(\r?\n)+$/,
      },
      {
        id: 'example02',
        title: 'Example02',
        publishedAt: '2000-01-02 00:00:00 +0900',
        updatedAt: '2000-01-02 00:00:00 +0900',
        tags: ['example2-1', 'example2-2', 'example2-3'],
        body: /^##\sexample2-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue02\.png\)(\r?\n)!\[red]\(img\/red02\.png\)(\r?\n)+$/,
      },
      {
        id: 'example03',
        title: 'Example03',
        publishedAt: '2000-01-03 00:00:00 +0900',
        updatedAt: '2000-01-03 00:00:00 +0900',
        tags: ['example3-1', 'example3-2', 'example3-3'],
        body: /^##\sexample3-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue03\.png\)(\r?\n)!\[red]\(img\/red03\.png\)(\r?\n)+$/,
      },
    ]);
  });
});
