export const config = {
  site: {
    title: 'もしくはこれ',
    subtitle: "8ayac's blog",
    maintainer: '8ayac',
    rootUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://blog.8ay.ac/'
        : 'http://localhost:3000/',
  },
  page: {
    notFound: {
      title: '404 not found',
    },
    articles: {
      title: 'Articles',
      href: '/articles',
    },
    tags: {
      title: 'Tags',
      href: '/tags',
    },
  },
};
