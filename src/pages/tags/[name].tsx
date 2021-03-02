import { config } from '@/site.config';
import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import jsonArticles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import urljoin from 'url-join';

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsList = (jsonArticles as Article[]).map((article) => {
    return article.attributes.tags;
  });
  const tmp = tagsList.flat();
  const paths = tmp.map((name) => {
    return {
      params: {
        name,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params?.name as string;

  return {
    props: {
      name,
      filteredArticles: (jsonArticles as Article[]).filter((article) =>
        article.attributes.tags?.includes(name)
      ),
    },
  };
};

const SEO: React.FC<{ tagName: string }> = ({ tagName }) => (
  <NextSeo
    title={`#${tagName}`}
    canonical={urljoin(
      config.site.rootUrl,
      config.page.tags.name.toLowerCase(),
      tagName
    )}
    openGraph={{ title: `#${tagName} - ${config.site.title}` }}
    twitter={{ cardType: 'summary' }}
  />
);

const TagsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  filteredArticles,
}) => {
  return (
    <>
      <SEO tagName={name} />
      <BodyHeader title={`Tag: ${name}`} />
      <ArticleHeaderList articles={filteredArticles} />
    </>
  );
};

export default TagsPage;
