import { config } from '@/site.config';
import { Facebook } from '@/src/components/widgets/ArticleShareButtons/CustomShareButton/Facebook';
import { Hatena } from '@/src/components/widgets/ArticleShareButtons/CustomShareButton/Hatena';
import { Line } from '@/src/components/widgets/ArticleShareButtons/CustomShareButton/Line';
import { Pocket } from '@/src/components/widgets/ArticleShareButtons/CustomShareButton/Pocket';
import { Reddit } from '@/src/components/widgets/ArticleShareButtons/CustomShareButton/Reddit';
import { Twitter } from '@/src/components/widgets/ArticleShareButtons/CustomShareButton/Twitter';
import { getArticlePagePath } from '@/src/shared/utils';
import { Article } from '@/src/types';
import styled from '@emotion/styled';
import React from 'react';
import urljoin from 'url-join';

const S = {
  ComponentWrapperSection: styled.section``,

  ButtonListWrapperFlexDiv: styled.div`
    display: flex;
  `,

  ButtonWrapperDiv: styled.div`
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    filter: drop-shadow(
      2px 2px 1px
        ${(props) =>
          props.theme.color.articleShareButtons.buttonWrapperDiv.shadow}
    );

    :hover {
      filter: brightness(120%);
    }
  `,
};

export const ArticleShareButtons: React.FC<{
  article: Article;
  size?: number;
}> = ({ article, size = 32 }) => {
  const shareUrl = urljoin(config.site.rootUrl, getArticlePagePath(article));
  const shareTitle = article.attributes.title;
  const shareButtons = (buttonSize: number) => [
    <Facebook key="facebook" shareUrl={shareUrl} size={buttonSize} />,
    <Twitter
      key="twitter"
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      size={buttonSize}
    />,
    <Hatena
      key="hatena"
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      size={buttonSize}
    />,
    <Line
      key="line"
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      size={buttonSize}
    />,
    <Reddit
      key="reddit"
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      size={buttonSize}
    />,
    <Pocket
      key="pocket"
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      size={buttonSize}
    />,
  ];

  return (
    <>
      <S.ComponentWrapperSection>
        <S.ButtonListWrapperFlexDiv>
          {shareButtons(size).map((shareButton) => (
            <S.ButtonWrapperDiv key={shareButton.key}>
              {shareButton}
            </S.ButtonWrapperDiv>
          ))}
        </S.ButtonListWrapperFlexDiv>
      </S.ComponentWrapperSection>
    </>
  );
};
