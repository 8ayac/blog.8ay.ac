import { theme } from '@/src/constants/theme';
import { getTagsPagePath } from '@/src/shared/utils';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const S = {
  Anchor: styled.a`
    padding: 3% 1rem 4%;
    margin: 0;
    font-size: 0.8em;
    font-weight: 600;
    color: white;
    text-decoration: none;
    background-color: ${theme.color.blue.dark};
    border-radius: 3px;

    &:hover {
      color: white;
      background-color: ${theme.color.blue.base};
    }
  `,
};

export const CategoryTag: React.FC<{ name: string }> = ({ name }) => (
  <>
    <Link href={getTagsPagePath(name)} passHref>
      <S.Anchor>{name}</S.Anchor>
    </Link>
  </>
);
