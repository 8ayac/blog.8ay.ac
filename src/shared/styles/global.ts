import { theme } from '@/src/constants/theme';
import { css } from '@emotion/react';

const gHtmlStyle = css`
  html {
    font-size: 62.5%;
  }
`;

const gBodyStyle = css`
  body {
    margin: 0;
    background-color: ${theme.color.yellow.base};
    font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
      'Helvetica Neue', HelveticaNeue, YuGothic, 'Yu Gothic Medium', 'Yu Gothic',
      Verdana, Meiryo, sans-serif;
    color: ${theme.color.text.primary};
  }
`;

const gHeadingStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: normal;
  }
`;

const gH1Style = css`
  h1 {
    font-size: 4.8rem;
    font-weight: bold;
  }
`;

const gH2Style = css`
  h2 {
    font-size: 4rem;
  }
`;

const gH3Style = css`
  h3 {
    font-size: 3.2rem;
  }
`;

const gH4Style = css`
  h4 {
    font-size: 2.8rem;
  }
`;

const gH5Style = css`
  h5 {
    font-size: 2.4rem;
  }
`;

const gH6Style = css`
  h6 {
    font-size: 2rem;
  }
`;

const gAnchorStyle = css`
  a {
    margin-left: 0.5rem;
    color: ${theme.color.text.secondary};

    &:hover {
      color: ${theme.color.text.accent};
    }

    &:visited {
      color: ${theme.color.text.secondary};
      &:after {
        content: '+';
      }
    }
  }
`;

const gParagraphStyle = css`
  p {
    margin: 0 0 1rem;
    font-size: 1.8rem;
  }
`;

export const globalStyle = css`
  ${gHtmlStyle}
  ${gBodyStyle}
  ${gHeadingStyle}
  ${gH1Style}
  ${gH2Style}
  ${gH3Style}
  ${gH4Style}
  ${gH5Style}
  ${gH6Style}
  ${gAnchorStyle}
  ${gParagraphStyle}
`;
