import {
  FOOTNOTE_DEFINITION_PREFIX,
  FOOTNOTE_REFERENCE_PREFIX,
} from '@/src/constants/footnote';
import styled from '@emotion/styled';
import React from 'react';

const S = {
  IdentifierSup: styled.sup`
    margin: 0.2rem;
  `,
};

export const FootnoteReference: React.FC<{
  identifier: string;
  label: string;
}> = ({ identifier, label }) => {
  return (
    <S.IdentifierSup id={`${FOOTNOTE_REFERENCE_PREFIX}${identifier}`}>
      <a href={`#${FOOTNOTE_DEFINITION_PREFIX}${identifier}`}>{label}</a>
    </S.IdentifierSup>
  );
};
