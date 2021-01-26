import { MarkdownRender } from '@/src/components/elements/MarkdownRenderer';
import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import articles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import moment from 'moment';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (articles as Article[]).map((article) => {
    return {
      params: {
        date: moment(article.publishedAt).utc().format('YYYY-MM-DD'),
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
      article: (articles as Article[]).find((v) => v.id === params?.id),
    },
  };
};

export const S = {
  ArticleWrapperDiv: styled.div`
    font-size: 1.6rem;
    word-break: break-all;
  `,
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
}) => {
  return (
    <>
      <S.ArticleWrapperDiv>
        <ArticleHeader article={article} />
        <MarkdownRender content={article.body} />
      </S.ArticleWrapperDiv>
    </>
  );
};

export default ArticlePage;
