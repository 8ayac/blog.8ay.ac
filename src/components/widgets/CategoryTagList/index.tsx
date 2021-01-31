import { CategoryTag } from '@/src/components/elements/CategoryTag';
import { FlexContainerDiv } from '@/src/shared/styles/abstractStyledComponents';
import styled from '@emotion/styled';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled(FlexContainerDiv)`
    flex-flow: row wrap;

    > * {
      margin-right: 0.7rem;
      margin-bottom: 0.7rem;
    }
  `,

  PreIconWrapperDiv: styled(FlexContainerDiv)`
    align-items: center;
    color: ${(props) => props.theme.color.text.primaryLight};
  `,
};

export const CategoryTagList: React.FC<{
  tags: string[];
  withPreIcon?: boolean;
}> = ({ tags, withPreIcon = false }) => (
  <>
    <S.ComponentWrapperDiv>
      {withPreIcon && (
        <S.PreIconWrapperDiv>
          <FontAwesomeIcon icon={faTags} />
        </S.PreIconWrapperDiv>
      )}
      {[...new Set(tags)].sort().map((tag) => (
        <CategoryTag key={tag} name={tag} />
      ))}
    </S.ComponentWrapperDiv>
  </>
);
