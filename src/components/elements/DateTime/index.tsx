import styled from '@emotion/styled';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    display: flex;
    flex-flow: row wrap;
  `,

  DescriptionSpan: styled.span`
    margin-right: 0.5rem;
    font-weight: 600;
  `,

  ISODateTime: styled.time`
    font-weight: bolder;
    color: ${(props) => props.theme.color.dateTime.isoDateTime.text};
  `,
};

export const DateTime: React.FC<{
  date: Date | string;
  description?: string;
}> = ({ date, description }) => (
  <>
    <S.ComponentWrapperDiv>
      {description && (
        <S.DescriptionSpan>{`${description}:`}</S.DescriptionSpan>
      )}
      <S.ISODateTime>{new Date(date).toISOString()}</S.ISODateTime>
    </S.ComponentWrapperDiv>
  </>
);
