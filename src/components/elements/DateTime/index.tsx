import { theme } from '@/src/constants/theme';
import { FlexContainer } from '@/src/shared/styles/abstractStyledComponents';
import styled from '@emotion/styled';
import moment from 'moment';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled(FlexContainer)`
    flex-flow: row wrap;
  `,

  DescriptionSpan: styled.span`
    margin-right: 0.5rem;
    font-weight: 600;
  `,

  DateTime: styled.time`
    font-weight: bolder;
    color: ${theme.color.text.secondary};
  `,
};

export const DateTime: React.FC<{
  date: Date;
  description?: string;
}> = ({ date, description }) => (
  <>
    <S.ComponentWrapperDiv>
      {description && (
        <S.DescriptionSpan>{`${description}:`}</S.DescriptionSpan>
      )}
      <S.DateTime>{moment(date).toISOString()}</S.DateTime>
    </S.ComponentWrapperDiv>
  </>
);
