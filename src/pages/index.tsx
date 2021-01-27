import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import jsonArticles from '@/src/shared/.content/articles.json';
import { getNumberOfArticlesWithATag } from '@/src/shared/utils';
import { Article } from '@/src/types';
import styled, { StyledComponent } from '@emotion/styled';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';

const S: { [key: string]: StyledComponent<any> } = {
  Section: styled.section`
    margin-bottom: 4rem;
  `,
};
S.ArticleListSection = styled(S.Section)``;
S.CategoryListSection = styled(S.Section)``;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: jsonArticles,
    },
  };
};

const TopPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
}) => {
  return (
    <>
      <S.ArticleListSection>
        <BodyHeader title="Articles" />
        <ArticleHeaderList articles={articles} />
      </S.ArticleListSection>

      <S.CategoryListSection>
        <BodyHeader title="Tags" />
        <CategoryTagList
          tags={(articles as Article[])
            .map((article) => article.tags)
            .flat()
            .map(
              (tag) => `${tag} (${getNumberOfArticlesWithATag(tag, articles)})`
            )}
        />
      </S.CategoryListSection>
    </>
  );
};

export default TopPage;
