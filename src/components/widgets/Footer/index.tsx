import { theme } from '@/src/constants/theme';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  Footer: styled.footer`
    padding: 3rem 0;
    font-size: 1.5rem;
    text-align: center;
  `,

  CopyRightParagraph: styled.p``,

  AboutGAParagraph: styled.p`
    color: ${theme.color.text.primaryLight};
  `,
};

export const Footer: React.FC = () => (
  <S.Footer>
    <S.CopyRightParagraph>
      © 2021 blog.8ay.ac All Rights Reserved.
    </S.CopyRightParagraph>
    <S.AboutGAParagraph>
      This website uses Google Analytics, a web analytics service by Google.
      Google Analytics uses cookies, which are placed on your computer to help
      the website analyze how you use the site. You can prevent the the
      collection of your data by disabling cookies in your browser.
    </S.AboutGAParagraph>
  </S.Footer>
);
