import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import {
  getArticlePagePath,
  getArticlesWithATag,
  getLastModifiedDate,
  getNumberOfArticlesWithATag,
  getTagsPagePath,
} from '@/src/shared/utils';

describe('getArticlePagePath', () => {
  it('returns a proper path when given data with a UTC date.', () => {
    expect(getArticlePagePath(mockArticleData.t1)).toEqual(
      '/articles/2021-01-01/test-article-id-1'
    );
  });
});

describe('getTagPagePath', () => {
  it('returns a proper path', () => {
    const testTagName = 'test-custom-tag';
    expect(getTagsPagePath(testTagName)).toBe('/tags/test-custom-tag');
  });

  it('returns a proper path when given the string contains `/`', () => {
    const testTagName = 'test/custom-tag';
    expect(getTagsPagePath(testTagName)).toBe('/tags/test%2Fcustom-tag');
  });

  it('returns a proper path when given the string contains multibyte characters', () => {
    const testTagName = '亜';
    expect(getTagsPagePath(testTagName)).toBe('/tags/%E4%BA%9C');
  });
});

describe('getNumberOfArticlesWithATag', () => {
  const testCategories = ['test-custom-tag-1', 'test-custom-tag-2'];
  const testArticles = [
    {
      ...mockArticleData.t1,
      attributes: {
        ...mockArticleData.t1.attributes,
        tags: testCategories,
      },
    },
    {
      ...mockArticleData.t1,
      attributes: {
        ...mockArticleData.t1.attributes,
        tags: testCategories.slice(0, 1),
      },
    },
  ];

  describe('returns a correct number of articles', () => {
    it('returns 2', () => {
      expect(getNumberOfArticlesWithATag(testCategories[0], testArticles)).toBe(
        2
      );
    });

    it('returns 1', () => {
      expect(getNumberOfArticlesWithATag(testCategories[1], testArticles)).toBe(
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
  const testCategories = ['test-custom-tag-1', 'test-custom-tag-2'];
  const testArticles = [
    {
      ...mockArticleData.t1,
      attributes: {
        ...mockArticleData.t1.attributes,
        tags: testCategories,
      },
    },
    {
      ...mockArticleData.t1,
      attributes: {
        ...mockArticleData.t1.attributes,
        tags: testCategories.slice(0, 1),
      },
    },
  ];

  describe('returns a correct articles', () => {
    test('returns test-article{01..02}', () => {
      const result = getArticlesWithATag(testCategories[0], testArticles);

      expect(result).toHaveLength(2);
      expect(result[0].attributes.id).toBe(testArticles[0].attributes.id);
      expect(result[1].attributes.id).toBe(testArticles[1].attributes.id);
    });

    test('returns only test-article01', () => {
      const result = getArticlesWithATag(testCategories[1], testArticles);

      expect(result).toHaveLength(1);
      expect(result[0].attributes.id).toBe(testArticles[0].attributes.id);
    });

    test('returns nothing', () => {
      const result = getArticlesWithATag('NO_ONE_HAS_ME', testArticles);
      expect(result).toHaveLength(0);
    });
  });
});

describe('getLastModifiedDate', () => {
  const testArticleData = mockArticleData.t1;

  it('can get last modified date properly', () => {
    expect(getLastModifiedDate(testArticleData)).toEqual(
      new Date('2021-01-01T22:22:22.000Z')
    );
  });

  it('returns published date when the log is empty', () => {
    expect(getLastModifiedDate({ ...testArticleData, changeLogs: [] })).toEqual(
      new Date('2021-01-01T00:00:00.000Z')
    );
  });
});
