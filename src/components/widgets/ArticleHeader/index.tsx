import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { DateTime } from '@/src/components/elements/DateTime';
import { FlexContainerDiv } from '@/src/shared/styles/abstractStyledComponents';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  DateTimeWrapperDiv: styled(FlexContainerDiv)`
    flex-flow: row wrap;
    align-items: center;

    > * {
      margin-right: 1rem;
    }
  `,
};

export const ArticleHeader: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <BodyHeader
      title={article.title}
      beforeTitle={
        <S.DateTimeWrapperDiv>
          <DateTime date={article.publishedAt} description="Published At" />
          <DateTime date={article.updatedAt} description="Updated At" />
        </S.DateTimeWrapperDiv>
      }
    />
  );
};
