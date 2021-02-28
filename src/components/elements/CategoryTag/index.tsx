import { getTagsPagePath } from '@/src/shared/utils';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const S = {
  Anchor: styled.a`
    padding: 0.2rem 1rem;
    font-size: 0.8em;
    color: ${(props) => props.theme.color.categoryTag.anchor.text};
    text-decoration: none;
    background-color: ${(props) => props.theme.color.categoryTag.anchor.bg};
    filter: drop-shadow(
      2px 2px 1px ${(props) => props.theme.color.categoryTag.anchor.shadow}
    );
    border-radius: 3px;

    &:hover {
      color: white;
      background-color: ${(props) =>
        props.theme.color.categoryTag.anchor.bgOnHover};
    }

    &:visited {
      color: ${(props) => props.theme.color.categoryTag.anchor.text};
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
