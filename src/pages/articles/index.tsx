import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import jsonArticles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: jsonArticles as Article[],
    },
  };
};

const ArticleIndexPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ articles }) => {
  return (
    <>
      <BodyHeader title="Articles" />
      <ArticleHeaderList articles={articles} />
    </>
  );
};

export default ArticleIndexPage;
