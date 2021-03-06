import styled from '@emotion/styled';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export const S = {
  WrapperHeader: styled.header`
    margin-bottom: 3rem;
    border-bottom: 0.25rem solid
      ${(props) => props.theme.color.common.border.primaryLight};
  `,

  TitleH1: styled.h1`
    margin: 0 0 1rem;
  `,

  TitleAnchor: styled.a`
    margin: 0;
    color: ${(props) => props.theme.color.common.text.primary};
    text-decoration: none;
    filter: drop-shadow(
      2px 2px 1px ${(props) => props.theme.color.bodyHeader.titleAnchor.shadow}
    );

    &:visited {
      color: ${(props) => props.theme.color.common.text.primary};
    }
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
