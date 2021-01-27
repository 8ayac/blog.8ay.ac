import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import articles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsList = (articles as Article[]).map((article) => {
    return article.tags;
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
      filteredArticles: (articles as Article[]).filter((v) =>
        v.tags?.includes(name)
      ),
    },
  };
};

const S = {
  ArticleListWrapperDiv: styled.div`
    max-width: 90%;
    margin: 0 auto;
  `,
};

const CategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ name, filteredArticles }) => {
  return (
    <>
      <BodyHeader title={`Tag: ${name}`} />
      <S.ArticleListWrapperDiv>
        <ArticleHeaderList articles={filteredArticles} />
      </S.ArticleListWrapperDiv>
    </>
  );
};

export default CategoryPage;
