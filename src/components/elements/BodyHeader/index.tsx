import { theme } from '@/src/constants/theme';
import styled from '@emotion/styled';
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

  BeforeTitleDiv: styled.div`
    margin-bottom: 0.3rem;
  `,

  AfterTitleDiv: styled.div`
    margin-top: 0.3rem;
  `,
};

export const BodyHeader: React.FC<{
  title: string;
  beforeTitle?: ReactNode;
  afterTitle?: ReactNode;
}> = ({ title, beforeTitle, afterTitle }) => (
  <>
    <S.WrapperHeader>
      {beforeTitle && <S.BeforeTitleDiv>{beforeTitle}</S.BeforeTitleDiv>}
      <S.TitleH1>{title}</S.TitleH1>
      {afterTitle && <S.AfterTitleDiv>{afterTitle}</S.AfterTitleDiv>}
    </S.WrapperHeader>
  </>
);
