import { config } from '@/site.config';
import { ArticleRevisionRecordList } from '@/src/components/elements/ArticleRevisionRecordList';
import { MarkdownRenderer } from '@/src/components/elements/MarkdownRenderer';
import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import { ArticleShareButtons } from '@/src/components/widgets/ArticleShareButtons';
import jsonArticles from '@/src/shared/.content/articles.json';
import { getArticlePagePath, getLastModifiedDate } from '@/src/shared/utils';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import moment from 'moment';
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
  const paths = (jsonArticles as Article[]).map((article) => {
    return {
      params: {
        date: moment(new Date(article.attributes.publishedAt).toISOString())
          .utc()
          .format('YYYY-MM-DD'),
        id: article.attributes.id,
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
      article: (jsonArticles as Article[]).find(
        (article) => article.attributes.id === params?.id
      ),
    },
  };
};

const S = {
  RevisionHistoryWrapperDiv: styled.div`
    padding: 1rem 0 0.7rem;
    margin: 0 0 5rem;
    border-color: ${(props) => props.theme.color.common.border.primaryLight};
    border-style: dotted;
    border-width: 2px 0;
  `,

  ShareButtonsWrapper: styled.div`
    margin-top: 5rem;
  `,
};

const SEO: React.FC<{ article: Article }> = ({ article }) => (
  <NextSeo
    title={article.attributes.title}
    canonical={urljoin(config.site.rootUrl, getArticlePagePath(article))}
    openGraph={{
      title: `${article.attributes.title} - ${config.site.title}`,
      type: 'article',
      article: {
        publishedTime: new Date(article.attributes.publishedAt).toISOString(),
        modifiedTime: getLastModifiedDate(article).toISOString(),
        authors: [config.site.maintainer.screenName],
        tags: article.attributes.tags,
      },
    }}
  />
);

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
}) => {
  return (
    <>
      <SEO article={article} />

      <ArticleHeader article={article} />
      {article.changeLogs.length > 0 && (
        <S.RevisionHistoryWrapperDiv>
          <ArticleRevisionRecordList log={article.changeLogs} />
        </S.RevisionHistoryWrapperDiv>
      )}
      <MarkdownRenderer content={article.body} />

      <S.ShareButtonsWrapper>
        <ArticleShareButtons article={article} />
      </S.ShareButtonsWrapper>
    </>
  );
};

export default ArticlePage;
