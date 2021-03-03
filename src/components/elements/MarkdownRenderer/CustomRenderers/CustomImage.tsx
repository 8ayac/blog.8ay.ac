import { config } from '@/site.config';
import Image from 'next/image';
import React from 'react';
import urljoin from 'url-join';

export const CustomImage: React.FC<{
  src: string;
  alt?: string;
  title?: string;
}> = ({ src, alt, title }) => {
  const srcUrl = /^https?:\/\/.*/.test(src)
    ? src
    : urljoin(config.site.rootUrl, src);
  const { searchParams } = new URL(srcUrl);
  const width = searchParams.get('w');
  const height = searchParams.get('h');

  return (
    <>
      {width && height ? (
        <Image
          src={src}
          alt={alt}
          title={title}
          width={`${width}px`}
          height={`${height}px`}
        />
      ) : (
        <img src={src} alt={alt} title={title} />
      )}
    </>
  );
};
