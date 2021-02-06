import React from 'react';
import { RedditIcon, RedditShareButton } from 'react-share';

export const Reddit: React.FC<{
  shareUrl: string;
  shareTitle: string;
  size: number;
}> = ({ shareUrl, shareTitle, size }) => (
  <RedditShareButton url={shareUrl} title={shareTitle}>
    <RedditIcon size={size} round />
  </RedditShareButton>
);
