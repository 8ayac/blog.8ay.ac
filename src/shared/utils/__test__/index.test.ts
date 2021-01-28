import {
  getArticlePagePath,
  getArticlesWithATag,
  getTagsPagePath,
  getNumberOfArticlesWithATag,
} from '@/src/shared/utils';

describe('getArticlePagePath', () => {
  it('returns a proper path when given data with a UTC date.', () => {
    const testArticle = {
      id: 'test01',
      title: 'test title',
      tags: [],
      publishedAt: new Date('2000-01-01T00:00:00.000Z'),
      updatedAt: new Date('2000-12-31T00:00:00.000Z'),
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
      publishedAt: new Date('2000-01-01T00:00:00.000Z'),
      updatedAt: new Date('2000-12-31T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    };
    expect(getArticlePagePath(testArticle)).toEqual(
      '/articles/2000-01-01/test01'
    );
  });
});

describe('getTagPagePath', () => {
  it('returns a proper path', () => {
    const testTagName = 'test-cat';
    expect(getTagsPagePath(testTagName)).toBe('/tags/test-cat');
  });

  it('returns a proper path when given the string contains `/`', () => {
    const testTagName = 'test/cat';
    expect(getTagsPagePath(testTagName)).toBe('/tags/test%2Fcat');
  });

  it('returns a proper path when given the string contains multibyte characters', () => {
    const testTagName = '亜';
    expect(getTagsPagePath(testTagName)).toBe('/tags/%E4%BA%9C');
  });
});

describe('getNumberOfArticlesWithATag', () => {
  const testCategories = ['test-cat01', 'test-cat02', 'test-cat03'];
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: testCategories.slice(0, 3),
      publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: testCategories.slice(0, 2),
      publishedAt: new Date('2021-02-02T00:00:00.000Z'),
      updatedAt: new Date('2021-02-02T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: testCategories.slice(0, 1),
      publishedAt: new Date('2021-03-03T00:00:00.000Z'),
      updatedAt: new Date('2021-03-03T00:00:00.000Z'),
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
      publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: testCategories.slice(0, 2),
      publishedAt: new Date('2021-02-02T00:00:00.000Z'),
      updatedAt: new Date('2021-02-02T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: testCategories.slice(0, 1),
      publishedAt: new Date('2021-03-03T00:00:00.000Z'),
      updatedAt: new Date('2021-03-03T00:00:00.000Z'),
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
