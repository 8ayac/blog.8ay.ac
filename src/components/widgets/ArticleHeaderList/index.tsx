import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import { Article } from '@/src/types';

import styled from '@emotion/styled';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    margin: 5rem auto 10rem;
    display: grid;
    grid-gap: 5%;
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
        {articles.map((article) => (
          <ArticleHeader key={article.id} article={article} />
        ))}
      </S.ArticleHeaderWrapperDiv>
    </S.ComponentWrapperDiv>
  </>
);
