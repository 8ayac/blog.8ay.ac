import { CategoryTag } from '@/src/components/elements/CategoryTag';
import styled, { StyledComponent } from '@emotion/styled';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const S: { [key: string]: StyledComponent<any> } = {
  FlexContainerDiv: styled.div`
    display: flex;
  `,
};
S.ComponentWrapperDiv = styled(S.FlexContainerDiv)`
  flex-flow: row wrap;

  > * {
    margin-right: 0.7rem;
    margin-bottom: 0.7rem;
  }
`;
S.PreIconWrapperDiv = styled(S.FlexContainerDiv)`
  align-items: center;
  color: ${(props) => props.theme.color.text.primaryLight};
`;

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
