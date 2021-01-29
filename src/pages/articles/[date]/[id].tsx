import { MarkdownRenderer } from '@/src/components/elements/MarkdownRenderer';
import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import jsonArticles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import moment from 'moment';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (jsonArticles as Article[]).map((article) => {
    return {
      params: {
        date: moment(new Date(article.publishedAt).toISOString())
          .utc()
          .format('YYYY-MM-DD'),
        id: article.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      article: (jsonArticles as Article[]).find((v) => v.id === params?.id),
    },
  };
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
}) => {
  return (
    <>
      <ArticleHeader article={article} />
      <MarkdownRenderer content={article.body} />
    </>
  );
};

export default ArticlePage;
