import { DateTime } from '@/src/components/elements/DateTime';
import { theme } from '@/src/constants/theme';
import { FlexContainerDiv } from '@/src/shared/styles/abstractStyledComponents';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  WrapperHeader: styled.header`
    border-bottom: 0.25rem solid ${theme.color.border.primaryLight};
    margin-bottom: 3rem;
  `,

  ArticleTitleH1: styled.h1`
    font-size: 2.16em;
    margin: 0 0 1rem;
  `,

  DateTimeWrapperDiv: styled(FlexContainerDiv)`
    align-items: center;
    flex-flow: row wrap;

    > * {
      margin-bottom: 0.3rem;
      margin-right: 1rem;
    }
  `,
};

export const ArticleHeader: React.FC<{ article: Article }> = ({ article }) => (
  <S.WrapperHeader>
    <S.DateTimeWrapperDiv>
      <DateTime date={article.publishedAt} description="Published At" />
      <DateTime date={article.updatedAt} description="Updated At" />
    </S.DateTimeWrapperDiv>
    <S.ArticleTitleH1>{article.title}</S.ArticleTitleH1>
  </S.WrapperHeader>
);
