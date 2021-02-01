import * as fs from 'fs';
import path from 'path';
import {
  copyImagesToPublic,
  generateArticlesJson,
  generateDescriptionFromMdBody,
  getDirNamesIn,
  parseMarkdownWithMeta,
} from '@/builder/articles';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';

jest.mock('gitlog', () => ({
  __esModule: true,
  default: jest.fn(() =>
    mockArticleData.t1.changeLogs.map((log) => ({
      abbrevHash: log.id,
      authorDate: log.date,
      subject: log.description,
      authorName: log.author,
    }))
  ),
}));

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
  const testArticleData = mockArticleData.t1;
  const testMd = [
    '---',
    `${Object.keys(testArticleData.attributes)
      .map((k: 'id' | 'title' | 'tags' | 'publishedAt') => {
        if (k === 'tags')
          return `${k}: [${testArticleData.attributes[k].join(',')}]`;

        if (k === 'publishedAt')
          return `${k}: "${testArticleData.attributes[k]}"`;

        return `${k}: ${testArticleData.attributes[k]}`;
      })
      .join('\r\n')}`,
    '---',
    testArticleData.body,
  ].join('\r\n');
  const parsed = parseMarkdownWithMeta(testMd);

  it('can parse meta attributes and body from the Markdown file', () => {
    expect(parsed).toEqual({
      attributes: testArticleData.attributes,
      body: testArticleData.body,
    });
  });
});

describe('getChangeLog', () => {
  it.skip('can get the correct log', () => {
    // TODO: Implement me!
  });
});

describe('copyImageDirectories', () => {
  const testArticleDir = path.join(TESTDATA_DIR, 'articles', 'example01');
  const testPublicRoot = path.join(TESTDATA_DIR, '.public');

  const testArticleId = parseMarkdownWithMeta(
    fs.readFileSync(path.join(testArticleDir, 'index.md')).toString()
  ).attributes.id;
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

describe('generateDescriptionFromMdBody', () => {
  const testMd = '## hoge\r\n\r\n**this is a test.**\r\n\r\n'.repeat(300);
  test('returns the string whose length is 300 or lower.', () => {
    expect(generateDescriptionFromMdBody(testMd).length).toBeLessThan(301);
  });
});

describe('generateArticlesJson', () => {
  const testArticlesDir = path.join(TESTDATA_DIR, 'articles');
  const testOutputDir = path.join(TESTDATA_DIR, '.contents');
  const testOutputFileName = 'articles.test.json';

  beforeAll(() => {
    generateArticlesJson(testArticlesDir, testOutputDir, testOutputFileName);
  });

  afterAll(() => {
    fs.rmdirSync(testOutputDir, { recursive: true });
  });

  it('can generate a json which contains all the article data', () => {
    expect(
      readFileSyncAsJSON(path.join(testOutputDir, testOutputFileName))
    ).toMatchObject([
      {
        ...mockArticleData.t1,
        attributes: {
          ...mockArticleData.t1.attributes,
          id: 'example01',
          title: 'Example01',
          publishedAt: '2000-01-01T00:00:00.000Z',
          tags: ['example1-1', 'example1-2', 'example1-3'],
        },
        body: /^##\sexample1-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue\.png\)(\r?\n)!\[red]\(img\/red\.png\)(\r?\n)+$/,
        description: `example1-1\n\nbluhbluhbluh\n\nlink\n\nhttps://8ay.ac\n\nimage\n\nblue\nred\n`,
        changeLogs: mockArticleData.t1.changeLogs,
      },
      {
        ...mockArticleData.t1,
        attributes: {
          ...mockArticleData.t1.attributes,
          id: 'example02',
          title: 'Example02',
          publishedAt: '2000-01-02T00:00:00.000Z',
          tags: ['example2-1', 'example2-2', 'example2-3'],
        },
        description: `example2-1\n\nbluhbluhbluh\n\nlink\n\nhttps://8ay.ac\n\nimage\n\nblue\nred\n`,
        body: /^##\sexample2-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue02\.png\)(\r?\n)!\[red]\(img\/red02\.png\)(\r?\n)+$/,
      },
      {
        ...mockArticleData.t1,
        attributes: {
          ...mockArticleData.t1.attributes,
          id: 'example03',
          title: 'Example03',
          publishedAt: '2000-01-03T00:00:00.000Z',
          tags: ['example3-1', 'example3-2', 'example3-3'],
        },
        body: /^##\sexample3-1(\r?\n){2}bluhbluhbluh(\r?\n){2}##\slink(\r?\n){2}-\s<https:\/\/8ay\.ac>(\r?\n){2}##\simage(\r?\n){2}!\[blue]\(img\/blue03\.png\)(\r?\n)!\[red]\(img\/red03\.png\)(\r?\n)+$/,
        description: `example3-1\n\nbluhbluhbluh\n\nlink\n\nhttps://8ay.ac\n\nimage\n\nblue\nred\n`,
      },
    ]);
  });
});
