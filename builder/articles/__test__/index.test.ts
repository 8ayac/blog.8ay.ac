import * as fs from 'fs';
import path from 'path';
import {
  build,
  getFileNamesIn,
  parseMarkdownWithMeta,
} from '@/builder/articles';

const readFileSyncAsJSON = (fpath: string) => {
  return JSON.parse(fs.readFileSync(fpath, { encoding: 'utf8' }));
};

const TEST_ARTICLES_DIR = path.join(__dirname, 'testdata/articles');

describe('getFileNamesIn', () => {
  it('can get file names of example articles', () => {
    expect(getFileNamesIn(TEST_ARTICLES_DIR)).toEqual([
      '20000101_000000_example.md',
      '20000102_000000_example2.md',
      '20000103_000000_example3.md',
    ]);
  });
});

describe('parseMarkdownWithMeta', () => {
  const mdPath = path.join(TEST_ARTICLES_DIR, '20000101_000000_example.md');
  const mdRawContent = fs.readFileSync(mdPath).toString();
  const parsed = parseMarkdownWithMeta(mdRawContent);

  it('can parse meta attributes from the Markdown file', () => {
    expect(parsed).toMatchObject({
      title: 'Example01',
      publishedAt: '2000-01-01 00:00:00 +0900',
      updatedAt: '2000-01-01 00:00:00 +0900',
      tags: ['example1-1', 'example1-2', 'example1-3'],
    });
  });

  it('can parse the body of the article from the Markdown file', () => {
    expect(parsed).toMatchObject({
      body: expect.stringMatching(
        /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n)+$/
      ),
    });
  });
});

describe('build', () => {
  const outputDir = 'testdata/.contents';
  const outputFileName = 'articles.test.json';

  beforeAll(() => {
    build(outputDir, outputFileName);
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
        body: /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n)+$/,
      },
      {
        title: 'Example02',
        publishedAt: '2000-01-02 00:00:00 +0900',
        updatedAt: '2000-01-02 00:00:00 +0900',
        tags: ['example2-1', 'example2-2', 'example2-3'],
        body: /^##\sexample2-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n)+$/,
      },
      {
        title: 'Example03',
        publishedAt: '2000-01-03 00:00:00 +0900',
        updatedAt: '2000-01-03 00:00:00 +0900',
        tags: ['example3-1', 'example3-2', 'example3-3'],
        body: /^##\sexample3-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n)+$/,
      },
    ]);
  });
});
