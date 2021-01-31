import { getTagsPagePath } from '@/src/shared/utils';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const S = {
  Anchor: styled.a`
    padding: 3% 1rem 4%;
    margin: 0;
    font-size: 0.8em;
    color: white;
    text-decoration: none;
    background-color: ${(props) => props.theme.color.blue.dark};
    filter: drop-shadow(
      2px 2px 1px ${(props) => props.theme.color.blue.light2}
    );
    border-radius: 3px;

    &:hover {
      color: white;
      background-color: ${(props) => props.theme.color.blue.base};
    }

    &:visited {
      color: white;
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
