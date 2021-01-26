import { getArticlePagePath, getCategoryPagePath } from '@/src/shared/utils';

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
