import React from 'react';
import { HatenaIcon, HatenaShareButton } from 'react-share';

export const Hatena: React.FC<{
  shareUrl: string;
  shareTitle: string;
  size: number;
}> = ({ shareUrl, shareTitle, size }) => (
  <HatenaShareButton url={shareUrl} title={shareTitle}>
    <HatenaIcon size={size} round />
  </HatenaShareButton>
);
