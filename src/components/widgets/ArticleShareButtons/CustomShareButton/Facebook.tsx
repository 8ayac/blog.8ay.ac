import React from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';

export const Facebook: React.FC<{ shareUrl: string; size: number }> = ({
  shareUrl,
  size,
}) => (
  <FacebookShareButton url={shareUrl}>
    <FacebookIcon size={size} round />
  </FacebookShareButton>
);
