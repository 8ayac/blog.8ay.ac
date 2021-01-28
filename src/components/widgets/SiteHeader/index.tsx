import { BlogTitle } from '@/src/components/elements/BlogTitle';
import { SocialLinkWithIcon } from '@/src/components/elements/SocialLinkWithIcon';
import { BLOG_SUBTITLE, BLOG_TITLE } from '@/src/constants/site';
import { theme } from '@/src/constants/theme';
import { FlexContainerDiv } from '@/src/shared/styles/abstractStyledComponents';
import styled from '@emotion/styled';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const S = {
  Header: styled.header`
    position: sticky;
    top: 0;
    z-index: 100;
    height: 3.7rem;
    padding: 0.5rem 1rem;
    background-color: ${theme.color.green.dark2};
    border-bottom: 1px solid ${theme.color.green.light};
  `,

  HeaderInner: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    color: white;
  `,

  TitleWrapper: styled(FlexContainerDiv)`
    align-items: center;
    filter: drop-shadow(2px 2px 1px ${theme.color.green.dark3});
  `,

  NavWrapper: styled(FlexContainerDiv)`
    align-items: center;
    filter: drop-shadow(2px 2px 1px ${theme.color.green.dark3});
  `,
};

export const SiteHeader: React.FC = () => (
  <S.Header>
    <S.HeaderInner>
      <S.TitleWrapper>
        <BlogTitle title={BLOG_TITLE} subtitle={BLOG_SUBTITLE} />
      </S.TitleWrapper>

      <S.NavWrapper>
        <SocialLinkWithIcon
          url="http://twitter.com/8ayac"
          description="8ayac"
          icon={faTwitter}
        />
      </S.NavWrapper>
    </S.HeaderInner>
  </S.Header>
);
