import React from 'react';
import { LineIcon, LineShareButton } from 'react-share';

export const Line: React.FC<{
  shareUrl: string;
  shareTitle: string;
  size: number;
}> = ({ shareUrl, shareTitle }) => (
  <LineShareButton url={shareUrl} title={shareTitle}>
    <LineIcon size={32} round />
  </LineShareButton>
);
