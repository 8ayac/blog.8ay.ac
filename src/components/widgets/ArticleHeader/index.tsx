import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { DateTime } from '@/src/components/elements/DateTime';
import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import { theme } from '@/src/constants/theme';
import { FlexContainerDiv } from '@/src/shared/styles/abstractStyledComponents';
import { getArticlePagePath } from '@/src/shared/utils';
import { Article } from '@/src/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const S = {
  DateTimeWrapperDiv: styled(FlexContainerDiv)`
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 1rem;

    > * {
      margin-right: 1rem;
    }
  `,

  CategoryListWrapperDiv: styled.div`
    margin-top: 2rem;
    margin-bottom: 0.5rem;
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
      <FontAwesomeIcon
        icon={faTags}
        css={css`
          margin-right: 1rem;
          margin-left: 0.5rem;
          font-size: 1em;
          color: ${theme.color.text.primaryLight};
        `}
      />
      <CategoryTagList tags={article.tags as string[]} />
    </S.CategoryListWrapperDiv>
  );

  return (
    <BodyHeader
      title={article.title}
      linkTo={getArticlePagePath(article)}
      beforeTitle={date}
      afterTitle={tags}
    />
  );
};
