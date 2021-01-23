import { Footer } from '@/src/components/widgets/Footer';
import { Header } from '@/src/components/widgets/Header';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const S = {
  ContentWrapperDiv: styled.div`
    max-width: 1000px;
    padding: 3rem 10%;
    margin: 3rem auto;
    background-color: white;
    border-radius: 5px;
  `,
};

export const BasicLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <>
    <Header />
    <S.ContentWrapperDiv>
      {children}
      <Footer />
    </S.ContentWrapperDiv>
  </>
);
