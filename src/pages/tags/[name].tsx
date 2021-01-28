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
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsList = (jsonArticles as Article[]).map((article) => {
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
      filteredArticles: (jsonArticles as Article[]).filter((v) =>
        v.tags?.includes(name)
      ),
    },
  };
};

const CategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ name, filteredArticles }) => {
  return (
    <>
      <BodyHeader title={`Tag: ${name}`} />
      <ArticleHeaderList articles={filteredArticles} />
    </>
  );
};

export default CategoryPage;
