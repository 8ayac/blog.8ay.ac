import { SiteFooter } from '@/src/components/widgets/SiteFooter';
import { SiteHeader } from '@/src/components/widgets/SiteHeader';
import { mq } from '@/src/shared/styles/mediaQuery';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const S = {
  ContentWrapperDiv: styled.div`
    max-width: 1000px;
    padding: 3rem 10%;
    margin: 3rem auto;
    font-size: 1.6rem;
    word-break: break-word;
    background-color: white;
    border-radius: 5px;

    img {
      max-width: 100%;
    }

    ${mq('sm')} {
      padding: 3rem 7.5%;
      margin: 0;
      font-size: 1.4rem;
      border-radius: 0;
    }
  `,
};

export const BasicLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <>
    <SiteHeader />
    <S.ContentWrapperDiv>
      {children}
      <SiteFooter />
    </S.ContentWrapperDiv>
  </>
);
