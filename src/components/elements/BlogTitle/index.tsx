import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    cursor: pointer;
    user-select: none;

    &:hover {
      color: ${(props) => props.theme.color.yellow.base};
    }
  `,

  TitleSpan: styled.span`
    font-size: 2.2rem;
  `,

  SubtitleSpan: styled.span`
    margin-left: 0.5rem;
    font-size: 1.4rem;
  `,
};

export const BlogTitle: React.FC<{
  title: string;
  subtitle: string;
  linkToTopPage?: boolean;
}> = ({ title, subtitle, linkToTopPage = true }) => (
  <>
    <S.ComponentWrapperDiv>
      {linkToTopPage ? (
        <Link href="/">
          <S.TitleSpan>{title}</S.TitleSpan>
        </Link>
      ) : (
        <S.TitleSpan>{title}</S.TitleSpan>
      )}

      <S.SubtitleSpan>{subtitle}</S.SubtitleSpan>
    </S.ComponentWrapperDiv>
  </>
);
