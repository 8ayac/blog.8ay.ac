import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import { Article } from '@/src/types';

import styled from '@emotion/styled';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    display: grid;
    grid-gap: 5%;
    margin: 0 auto;
  `,

  ArticleHeaderWrapperDiv: styled.div`
    h1 {
      font-size: 2.3rem;
    }
  `,
};

export const ArticleHeaderList: React.FC<{ articles: Article[] }> = ({
  articles,
}) => (
  <>
    <S.ComponentWrapperDiv>
      <S.ArticleHeaderWrapperDiv>
        {articles
          .sort(
            (a, b) =>
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime()
          )
          .reverse()
          .map((article) => (
            <ArticleHeader key={article.attributes.id} article={article} />
          ))}
      </S.ArticleHeaderWrapperDiv>
    </S.ComponentWrapperDiv>
  </>
);
