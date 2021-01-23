import styled from '@emotion/styled';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    user-select: none;
  `,

  TitleSpan: styled.span`
    font-size: 2.2rem;
  `,

  SubtitleSpan: styled.span`
    margin-left: 0.5rem;
    font-size: 1.4rem;
  `,
};

export const BlogTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <>
    <S.ComponentWrapperDiv>
      <S.TitleSpan>{title}</S.TitleSpan>
      <S.SubtitleSpan>{subtitle}</S.SubtitleSpan>
    </S.ComponentWrapperDiv>
  </>
);
