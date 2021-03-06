import { mq } from '@/src/shared/styles/mediaQuery';
import styled from '@emotion/styled';
import { faLink, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const S = {
  ComponentWrapperDiv: styled.div`
    margin: 0 0.5rem;
  `,

  SocialLinkAnchor: styled.a`
    font-size: 2.2rem;
    color: ${(props) => props.color || 'inherit'};
    text-decoration: none;

    &:visited {
      color: inherit;
    }

    &:hover {
      color: ${(props) =>
        props.theme.color.socialLinkWithIcon.socialLinkAnchor.textOnHover};
    }

    ${mq('sm')} {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
    }
  `,

  LinkDescriptionSpan: styled.span`
    margin-left: 0.5rem;

    ${mq('sm')} {
      margin-left: 0;
      font-size: 1rem;
    }
  `,
};

export const SocialLinkWithIcon: React.FC<{
  url: string;
  description: string;
  icon?: IconDefinition;
  color?: string;
}> = ({ url, description, icon = faLink, color }) => (
  <>
    <S.ComponentWrapperDiv>
      <S.SocialLinkAnchor
        href={url}
        color={color}
        target="_blank"
        rel="noopener"
      >
        <FontAwesomeIcon icon={icon} />
        <S.LinkDescriptionSpan>{description}</S.LinkDescriptionSpan>
      </S.SocialLinkAnchor>
    </S.ComponentWrapperDiv>
  </>
);
