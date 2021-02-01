export const mockArticleData = {
  t1: {
    // Also as a default
    attributes: {
      id: 'test-article-id-1',
      title: 'Test Article Title 1',
      publishedAt: '2021-01-01T00:00:00.000Z',
      tags: ['test-tag-1-1', 'test-tag-1-2'],
    },
    body:
      '## test h2\r\n\r\nthis is a test paragraph of test-article-id-1.\r\n',
    description:
      'test h2\n\nthis is a test paragraph of test-article-id-1.\n\n',
    changeLogs: [
      {
        id: '1000001',
        date: '2021-01-01T11:11:11.000Z',
        description: ':test_prefix: this is a test commit 1-1',
        author: '8ayac',
      },
      {
        id: '1000002',
        date: '2021-01-01T22:22:22.000Z',
        description: ':test_prefix: this is a test commit 1-2',
        author: '8ayac',
      },
    ],
  },

  t2: {
    attributes: {
      id: 'test-article-id-2',
      title: 'Test Article Title 2',
      publishedAt: '2021-02-01T00:00:00.000Z',
      tags: ['test-tag-2-1', 'test-tag-2-2'],
    },
    body:
      '## test h2\r\n\r\nthis is a test paragraph of test-article-id-2.\r\n',
    description:
      'test h2\n\nthis is a test paragraph of test-article-id-2.\n\n',
    changeLogs: [
      {
        id: '2000001',
        date: '2021-02-01T11:11:11.000Z',
        description: ':test_prefix: this is a test commit 2-1',
        author: '8ayac',
      },
      {
        id: '2000002',
        date: '2021-02-01T22:22:22.000Z',
        description: ':test_prefix: this is a test commit 2-2',
        author: '8ayac',
      },
    ],
  },
};
