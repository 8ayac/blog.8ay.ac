import {
  getArticlePagePath,
  getArticlesWithATag,
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
    expect(getCategoryPagePath(testCategoryName)).toBe('/tags/test-cat');
  });

  it('returns a proper path when given the string contains `/`', () => {
    const testCategoryName = 'test/cat';
    expect(getCategoryPagePath(testCategoryName)).toBe('/tags/test%2Fcat');
  });

  it('returns a proper path when given the string contains multibyte characters', () => {
    const testCategoryName = '亜';
    expect(getCategoryPagePath(testCategoryName)).toBe('/tags/%E4%BA%9C');
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

describe('getArticlesWithATag', () => {
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

  describe('returns a correct articles', () => {
    test('returns test-article{01..03}', () => {
      const result = getArticlesWithATag(testCategories[0], testArticles);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('test-article-01');
      expect(result[1].id).toBe('test-article-02');
      expect(result[2].id).toBe('test-article-03');
    });

    test('returns only test-article01', () => {
      const result = getArticlesWithATag(testCategories[2], testArticles);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-article-01');
    });

    test('returns nothing', () => {
      const result = getArticlesWithATag('NO_ONE_HAS_ME', testArticles);
      expect(result).toHaveLength(0);
    });
  });
});
