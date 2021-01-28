import { CategoryTag } from '@/src/components/elements/CategoryTag';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    display: inline-flex;
    margin: 0 0.7rem 0.7rem 0;
  `,
};

export const CategoryTagList: React.FC<{ tags: string[] }> = ({ tags }) => (
  <>
    {[...new Set(tags)].sort().map((tag) => (
      <S.ComponentWrapperDiv key={tag}>
        <CategoryTag name={tag} />
      </S.ComponentWrapperDiv>
    ))}
  </>
);
