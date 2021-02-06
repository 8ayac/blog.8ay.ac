import { config } from '@/site.config';
import React from 'react';
import { TwitterIcon, TwitterShareButton } from 'react-share';

export const Twitter: React.FC<{
  shareUrl: string;
  shareTitle: string;
  size: number;
}> = ({ shareUrl, shareTitle, size }) => (
  <TwitterShareButton
    url={shareUrl}
    title={shareTitle}
    via={config.site.maintainer.screenName}
    related={[config.site.maintainer.screenName]}
  >
    <TwitterIcon size={size} round />
  </TwitterShareButton>
);
