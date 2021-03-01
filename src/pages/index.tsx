import { config } from '@/site.config';
import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import jsonArticles from '@/src/shared/.content/articles.json';
import { Article } from '@/src/types';
import styled, { StyledComponent } from '@emotion/styled';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const S: { [key: string]: StyledComponent<any> } = {
  Section: styled.section`
    margin-bottom: 4rem;
  `,
};
S.ArticleListSection = styled(S.Section)``;
S.TagListSection = styled(S.Section)``;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: jsonArticles,
    },
  };
};

const SEO: React.FC = () => <NextSeo />;

const TopPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
}) => {
  return (
    <>
      <SEO />

      <S.ArticleListSection>
        <BodyHeader title="Articles" linkTo={config.page.articles.root} />
        <ArticleHeaderList articles={articles} />
      </S.ArticleListSection>
      <S.TagListSection id="tags">
        <BodyHeader title="Tags" linkTo={config.page.tags.root} />
        <CategoryTagList
          tags={(articles as Article[])
            .map((article) => article.attributes.tags)
            .flat()}
        />
      </S.TagListSection>
    </>
  );
};

export default TopPage;
