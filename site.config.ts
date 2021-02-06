export const config = {
  site: {
    title: 'もしくはこれ',
    subtitle: "8ayac's blog",
    maintainer: {
      firstName: 'Yoshinori',
      lastName: 'Hayashi',
      screenName: '8ayac',
      mailAddress: '8ayac.y+blog.8ay.ac@gmail.com',
      profileUrl: 'https://about.8ay.ac/',
    },
    rootUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://blog.8ay.ac/'
        : 'http://localhost:3000/',
    publishedYear: 2021,
  },
  page: {
    notFound: {
      title: '404 not found',
    },
    top: {
      name: 'Top',
      root: '/',
    },
    articles: {
      name: 'Articles',
      root: '/articles',
    },
    tags: {
      name: 'Tags',
      root: '/tags',
    },
  },
};