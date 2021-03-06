import { config } from '@/site.config';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  Footer: styled.footer`
    padding: 3rem 0;
    margin-top: 10rem;
    font-size: 1.5rem;
    text-align: center;
  `,

  CopyRightParagraph: styled.p``,

  AuthorAnchor: styled.a``,

  AboutGAParagraph: styled.p`
    color: ${(props) => props.theme.color.common.text.primaryLight};
  `,
};

export const SiteFooter: React.FC = () => (
  <S.Footer>
    <S.CopyRightParagraph>
      © 2021{' '}
      <S.AuthorAnchor href={config.site.repository}>blog.8ay.ac</S.AuthorAnchor>{' '}
      All Rights Reserved.
    </S.CopyRightParagraph>
    <S.AboutGAParagraph>
      This website uses Google Analytics, a web analytics service by Google.
      Google Analytics uses cookies, which are placed on your computer to help
      the website analyze how you use the site. You can prevent the the
      collection of your data by disabling cookies in your browser.
    </S.AboutGAParagraph>
  </S.Footer>
);
