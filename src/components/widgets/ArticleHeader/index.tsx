import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { DateTime } from '@/src/components/elements/DateTime';
import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import { getArticlePagePath } from '@/src/shared/utils';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  DateTimeWrapperDiv: styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 1rem;

    > * {
      margin-right: 1rem;
    }
  `,

  TagListWrapperDiv: styled.div`
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  `,
};

export const ArticleHeader: React.FC<{ article: Article }> = ({ article }) => {
  const date = (
    <S.DateTimeWrapperDiv>
      <DateTime
        date={article.attributes.publishedAt}
        description="Published At"
      />
      <DateTime date={article.attributes.updatedAt} description="Updated At" />
    </S.DateTimeWrapperDiv>
  );
  const tags = (
    <S.TagListWrapperDiv>
      <CategoryTagList tags={article.attributes.tags} withPreIcon />
    </S.TagListWrapperDiv>
  );

  return (
    <BodyHeader
      title={article.attributes.title}
      linkTo={getArticlePagePath(article)}
      beforeTitle={date}
      afterTitle={tags}
    />
  );
};
