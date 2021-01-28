import { theme } from '@/src/constants/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export const S = {
  WrapperHeader: styled.header`
    margin-bottom: 3rem;
    border-bottom: 0.25rem solid ${theme.color.border.primaryLight};
  `,

  TitleH1: styled.h1`
    margin: 0 0 1rem;
    font-size: 2.16em;
  `,

  TitleAnchor: styled.a`
    margin: 0;
    color: ${theme.color.text.primary};
    text-decoration: none;
    filter: drop-shadow(2px 2px 1px ${theme.color.green.light2});
  `,

  BeforeTitleDiv: styled.div`
    margin-bottom: 0.3rem;
  `,

  AfterTitleDiv: styled.div`
    margin-top: 0.3rem;
  `,
};

export const BodyHeader: React.FC<{
  title: string;
  linkTo?: string;
  beforeTitle?: ReactNode;
  afterTitle?: ReactNode;
}> = ({ title, linkTo, beforeTitle, afterTitle }) => (
  <>
    <S.WrapperHeader>
      {beforeTitle && <S.BeforeTitleDiv>{beforeTitle}</S.BeforeTitleDiv>}
      {linkTo ? (
        <S.TitleH1>
          <Link href={linkTo} passHref>
            <S.TitleAnchor>{title}</S.TitleAnchor>
          </Link>
        </S.TitleH1>
      ) : (
        <S.TitleH1>{title}</S.TitleH1>
      )}
      {afterTitle && <S.AfterTitleDiv>{afterTitle}</S.AfterTitleDiv>}
    </S.WrapperHeader>
  </>
);
