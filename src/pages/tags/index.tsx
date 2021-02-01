import { config } from '@/site.config';
import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import jsonArticles from '@/src/shared/.content/articles.json';
import {
  getArticlesWithATag,
  getTagsPagePath,
  getNumberOfArticlesWithATag,
} from '@/src/shared/utils';
import { Article } from '@/src/types';
import styled, { StyledComponent } from '@emotion/styled';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: jsonArticles as Article[],
      tags: [
        ...new Set(
          (jsonArticles as Article[])
            .map((article) => article.attributes.tags)
            .flat()
        ),
      ].sort(),
    },
  };
};

const S: { [key: string]: StyledComponent<any> } = {
  Section: styled.section`
    margin-bottom: 3rem;
  `,
};
S.TagListSection = styled(S.Section)`
  margin-bottom: 7.5rem;
  font-size: 1.25em;
`;
S.EachTagSection = styled(S.Section)``;

const SEO: React.FC = () => (
  <NextSeo
    title={config.page.tags.name}
    openGraph={{ title: `${config.page.tags.name} ‐ ${config.site.title}` }}
  />
);

const TagsIndexPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ tags, articles }) => {
  return (
    <>
      <SEO />
      <BodyHeader title="Tags" />

      <S.TagListSection>
        <CategoryTagList tags={tags} />
      </S.TagListSection>

      {(tags as string[]).map((tag) => (
        <S.EachTagSection id={encodeURIComponent(tag)} key={`${tag}`}>
          <BodyHeader
            title={`${tag} (${getNumberOfArticlesWithATag(tag, articles)})`}
            linkTo={getTagsPagePath(tag)}
          />
          <ArticleHeaderList articles={getArticlesWithATag(tag, articles)} />
        </S.EachTagSection>
      ))}
    </>
  );
};

export default TagsIndexPage;
