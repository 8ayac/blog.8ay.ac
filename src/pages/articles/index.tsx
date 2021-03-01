import { config } from '@/site.config';
import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import jsonArticles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: jsonArticles as Article[],
    },
  };
};

const SEO: React.FC = () => (
  <NextSeo
    title={config.page.articles.name}
    openGraph={{
      title: `${config.page.articles.name} - ${config.site.title}`,
    }}
    twitter={{ cardType: 'summary' }}
  />
);

const ArticleIndexPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ articles }) => {
  return (
    <>
      <SEO />
      <BodyHeader title="Articles" linkTo={config.page.articles.root} />
      <ArticleHeaderList articles={articles} />
    </>
  );
};

export default ArticleIndexPage;
