import React from 'react';
import { PocketIcon, PocketShareButton } from 'react-share';

export const Pocket: React.FC<{
  shareUrl: string;
  shareTitle: string;
  size: number;
}> = ({ shareUrl, shareTitle, size }) => (
  <PocketShareButton url={shareUrl} title={shareTitle}>
    <PocketIcon size={size} round />
  </PocketShareButton>
);
