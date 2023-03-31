import path from 'path';
import { config } from '@/site.config';
import {
  RSS_FEED_FILE_NAME,
  RSS_FEED_OUTPUT_DIR,
} from '@/src/constants/forBuilder';
import jsonArticles from '@/src/shared/.content/articles.json';
import { getArticlePagePath } from '@/src/shared/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Article } from '@/src/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feed } from 'feed';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs-extra';
import urljoin from 'url-join';

const authorName = `${config.site.maintainer.screenName}(${config.site.maintainer.firstName} ${config.site.maintainer.lastName})`;

const feed = new Feed({
  title: config.site.title,
  id: config.site.rootUrl,
  link: config.site.rootUrl,
  description: config.site.subtitle,
  copyright: `All rights reserved 2021-2023${
    new Date().getFullYear() > config.site.publishedYear
      ? ` - ${new Date().getFullYear()}`
      : ''
  }, ${authorName}`,
  image: urljoin(config.site.rootUrl, 'img', 'favicon.png'),
  favicon: urljoin(config.site.rootUrl, 'img', 'favicon.png'),
  docs: 'https://validator.w3.org/feed/docs/rss2.html',
  feedLinks: {
    rss2: urljoin(config.site.rootUrl, 'rss'),
  },
  author: {
    name: authorName,
    email: config.site.maintainer.mailAddress,
    link: config.site.maintainer.profileUrl,
  },
});

(async () => {
  (jsonArticles as Article[]).forEach((article) => {
    feed.addItem({
      title: article.attributes.title,
      id: urljoin(config.site.rootUrl, getArticlePagePath(article)),
      link: urljoin(config.site.rootUrl, getArticlePagePath(article)),
      description: article.description,
      author: [
        {
          name: authorName,
          email: config.site.maintainer.mailAddress,
          link: `https://about.8ay.ac/`,
        },
      ],
      date: new Date(article.attributes.publishedAt),
      image: urljoin(config.site.rootUrl, 'img', 'favicon.png'), // TODO: In the future, it will make to be specified an image for each article.
    });
  });

  fs.ensureDirSync(RSS_FEED_OUTPUT_DIR);
  fs.writeFileSync(
    path.join(RSS_FEED_OUTPUT_DIR, RSS_FEED_FILE_NAME),
    feed.rss2(),
    { encoding: 'utf-8' }
  );
})();
