import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { DateTime } from '@/src/components/elements/DateTime';
import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
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

  CategoryListWrapperDiv: styled.div`
    margin-top: 2rem;
  `,
};

export const ArticleHeader: React.FC<{ article: Article }> = ({ article }) => {
  const date = (
    <S.DateTimeWrapperDiv>
      <DateTime date={article.publishedAt} description="Published At" />
      <DateTime date={article.updatedAt} description="Updated At" />
    </S.DateTimeWrapperDiv>
  );
  const tags = (
    <S.CategoryListWrapperDiv>
      <CategoryTagList tags={article.tags as string[]} />
    </S.CategoryListWrapperDiv>
  );

  return (
    <BodyHeader title={article.title} beforeTitle={date} afterTitle={tags} />
  );
};
