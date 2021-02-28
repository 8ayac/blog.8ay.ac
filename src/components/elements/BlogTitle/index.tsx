import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const S = {
  LogoWrapperAnchor: styled.a`
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    user-select: none;

    &:visited {
      color: inherit;
    }

    &:hover {
      color: ${(props) =>
        props.theme.color.blogTitle.logoWrapperAnchor.textOnHover};
    }
  `,

  TitleSpan: styled.span`
    font-size: 2.2rem;
  `,

  SubtitleSpan: styled.span`
    margin-left: 0.5rem;
    font-size: 1.7rem;
  `,
};

const Logo: React.FC<{ title: string; subtitle: string; color?: string }> = ({
  title,
  subtitle,
}) => (
  <>
    <S.TitleSpan>{title}</S.TitleSpan>
    <S.SubtitleSpan>{subtitle}</S.SubtitleSpan>
  </>
);

export const BlogTitle: React.FC<{
  title: string;
  subtitle: string;
  linkToTopPage?: boolean;
}> = ({ title, subtitle, linkToTopPage = true }) => (
  <>
    {linkToTopPage ? (
      <Link href="/" passHref>
        <S.LogoWrapperAnchor>
          <Logo title={title} subtitle={subtitle} />
        </S.LogoWrapperAnchor>
      </Link>
    ) : (
      <Logo title={title} subtitle={subtitle} />
    )}
  </>
);
