import { BlogTitle } from '@/src/components/elements/BlogTitle';
import { SocialLinkWithIcon } from '@/src/components/elements/SocialLinkWithIcon';
import { BLOG_SUBTITLE, BLOG_TITLE } from '@/src/constants/site';
import styled, { StyledComponent } from '@emotion/styled';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const S: { [key: string]: StyledComponent<any> } = {
  Header: styled.header`
    position: sticky;
    top: 0;
    z-index: 100;

    display: flex;
    align-items: center;

    min-height: 5rem;
    padding: 0.5rem 1.5rem;

    background-color: ${(props) => props.theme.color.green.dark3};
    filter: drop-shadow(0 0 2px ${(props) => props.theme.color.green.dark4});
    opacity: 0.9;
  `,

  HeaderInner: styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: white;
  `,

  InnerWrapperFlexContainerDiv: styled.div`
    display: flex;
    filter: drop-shadow(
      2px 2px 1px ${(props) => props.theme.color.green.dark4}
    );
    opacity: 1;
  `,
};
S.TitleWrapper = styled(S.InnerWrapperFlexContainerDiv)``;
S.NavWrapper = styled(S.InnerWrapperFlexContainerDiv)``;

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
