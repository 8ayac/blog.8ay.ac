import {
  getArticlePagePath,
  getCategoryPagePath,
  getNumberOfArticlesWithATag,
} from '@/src/shared/utils';

describe('getArticlePagePath', () => {
  it('returns a proper path when given data with a UTC date.', () => {
    const testArticle = {
      id: 'test01',
      title: 'test title',
      tags: [],
      publishedAt: '2000-01-01 00:00:00 +0000',
      updatedAt: '2000-12-31 00:00:00 +0000',
      body: 'bluhbluhbluh',
    };
    expect(getArticlePagePath(testArticle)).toEqual(
      '/articles/2000-01-01/test01'
    );
  });

  it('returns a proper path when given data with a JST date.', () => {
    const testArticle = {
      id: 'test01',
      title: 'test title',
      tags: [],
      publishedAt: '2000-01-01 00:00:00 +0900',
      updatedAt: '2000-12-31 00:00:00 +0900',
      body: 'bluhbluhbluh',
    };
    expect(getArticlePagePath(testArticle)).toEqual(
      '/articles/1999-12-31/test01'
    );
  });
});

describe('getCategoryPagePath', () => {
  it('returns a proper path', () => {
    const testCategoryName = 'test-cat';
    expect(getCategoryPagePath(testCategoryName)).toBe('/category/test-cat');
  });

  it('returns a proper path when given the string contains `/`', () => {
    const testCategoryName = 'test/cat';
    expect(getCategoryPagePath(testCategoryName)).toBe('/category/test%2Fcat');
  });

  it('returns a proper path when given the string contains multibyte characters', () => {
    const testCategoryName = '亜';
    expect(getCategoryPagePath(testCategoryName)).toBe('/category/%E4%BA%9C');
  });
});

describe('getNumberOfArticlesWithATag', () => {
  const testCategories = ['test-cat01', 'test-cat02', 'test-cat03'];
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: testCategories.slice(0, 3),
      publishedAt: '2021-01-01 00:00:00 +0000',
      updatedAt: '2021-01-01 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: testCategories.slice(0, 2),
      publishedAt: '2021-02-02 00:00:00 +0000',
      updatedAt: '2021-02-02 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: testCategories.slice(0, 1),
      publishedAt: '2021-03-03 00:00:00 +0000',
      updatedAt: '2021-03-03 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
  ];

  describe('returns a correct number of articles', () => {
    it('returns 3', () => {
      expect(getNumberOfArticlesWithATag(testCategories[0], testArticles)).toBe(
        3
      );
    });

    it('returns 2', () => {
      expect(getNumberOfArticlesWithATag(testCategories[1], testArticles)).toBe(
        2
      );
    });

    it('returns 1', () => {
      expect(getNumberOfArticlesWithATag(testCategories[2], testArticles)).toBe(
        1
      );
    });

    it('returns 0', () => {
      expect(getNumberOfArticlesWithATag('NO_ONE_HAS_ME', testArticles)).toBe(
        0
      );
    });
  });
});
