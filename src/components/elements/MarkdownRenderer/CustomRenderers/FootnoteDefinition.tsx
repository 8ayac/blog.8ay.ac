import {
  FOOTNOTE_DEFINITION_PREFIX,
  FOOTNOTE_REFERENCE_PREFIX,
} from '@/src/constants/footnote';
import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

const S = {
  FootnoteWrapperDiv: styled.div`
    margin-bottom: 1rem !important;

    * {
      display: inline;
    }
  `,

  LabelSpan: styled.span`
    margin-right: 1rem;
    font-weight: 600;
  `,

  ReturnAnchor: styled.a`
    margin: 0 0.2rem !important;
  `,
};

export const FootnoteDefinition: React.FC<{
  identifier: string;
  label: string;
  children: ReactElement;
}> = ({ identifier, label, children }) => {
  return (
    <>
      <S.FootnoteWrapperDiv id={`${FOOTNOTE_DEFINITION_PREFIX}${identifier}`}>
        <S.LabelSpan>^{label}:</S.LabelSpan>
        {children}
        <S.ReturnAnchor href={`#${FOOTNOTE_REFERENCE_PREFIX}${identifier}`}>
          ↵
        </S.ReturnAnchor>
      </S.FootnoteWrapperDiv>
    </>
  );
};
