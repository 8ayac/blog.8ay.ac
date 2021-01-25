import * as fs from 'fs';
import path from 'path';
import {
  build,
  getDirNamesIn,
  parseMarkdownWithMeta,
} from '@/builder/articles';

const readFileSyncAsJSON = (fpath: string) => {
  return JSON.parse(fs.readFileSync(fpath, { encoding: 'utf8' }));
};

const TEST_ARTICLES_DIR = path.join(__dirname, 'testdata/articles');

describe('getDirNamesIn', () => {
  it('can get names of directories that contains each article', () => {
    expect(getDirNamesIn(TEST_ARTICLES_DIR)).toEqual([
      'example01',
      'example02',
      'example03',
    ]);
  });
});

describe('parseMarkdownWithMeta', () => {
  const mdPath = path.join(TEST_ARTICLES_DIR, 'example01', 'index.md');
  const mdRawContent = fs.readFileSync(mdPath).toString();
  const parsed = parseMarkdownWithMeta(mdRawContent);

  it('can parse meta attributes and body from the Markdown file', () => {
    expect(parsed).toEqual({
      id: 'example01',
      title: 'Example01',
      publishedAt: '2000-01-01 00:00:00 +0900',
      updatedAt: '2000-01-01 00:00:00 +0900',
      tags: ['example1-1', 'example1-2', 'example1-3'],
      body: expect.stringMatching(
        /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue\.png\)(\r?\n)!\[red]\(img\/red\.png\)(\r?\n)+$/
      ),
    });
  });
});

describe('build', () => {
  const articlesDir = path.join(__dirname, 'testdata/articles');
  const outputDir = path.join(__dirname, 'testdata/.contents');
  const outputFileName = 'articles.test.json';

  beforeAll(() => {
    build(articlesDir, outputDir, outputFileName);
  });

  afterAll(() => {
    fs.rmdirSync(outputDir, { recursive: true });
  });

  it('can generate a json which contains all the article data', () => {
    expect(
      readFileSyncAsJSON(path.join(outputDir, outputFileName))
    ).toMatchObject([
      {
        title: 'Example01',
        publishedAt: '2000-01-01 00:00:00 +0900',
        updatedAt: '2000-01-01 00:00:00 +0900',
        tags: ['example1-1', 'example1-2', 'example1-3'],
        body: /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue\.png\)(\r?\n)!\[red]\(img\/red\.png\)(\r?\n)+$/,
      },
      {
        title: 'Example02',
        publishedAt: '2000-01-02 00:00:00 +0900',
        updatedAt: '2000-01-02 00:00:00 +0900',
        tags: ['example2-1', 'example2-2', 'example2-3'],
        body: /^##\sexample2-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue02\.png\)(\r?\n)!\[red]\(img\/red02\.png\)(\r?\n)+$/,
      },
      {
        title: 'Example03',
        publishedAt: '2000-01-03 00:00:00 +0900',
        updatedAt: '2000-01-03 00:00:00 +0900',
        tags: ['example3-1', 'example3-2', 'example3-3'],
        body: /^##\sexample3-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue03\.png\)(\r?\n)!\[red]\(img\/red03\.png\)(\r?\n)+$/,
      },
    ]);
  });
});
