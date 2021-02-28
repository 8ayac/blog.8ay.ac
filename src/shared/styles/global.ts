import { theme } from '@/src/constants/theme';
import { css } from '@emotion/react';

const gHtmlStyle = css`
  html {
    font-size: 62.5%;
    scroll-padding-top: 6rem;
  }
`;

const gBodyStyle = css`
  body {
    margin: 0;
    background-color: ${theme.color.yellow.base};
    font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
      'Helvetica Neue', HelveticaNeue, lYuGothic, 'Yu Gothic Medium',
      'Yu Gothic', Verdana, Meiryo, sans-serif;
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
    margin: 0 0 0.75em;
    font-weight: 600;
    line-height: 1.2;
  }
`;

const gH1Style = css`
  h1 {
    font-size: 2.16em;
  }
`;

const gH2Style = css`
  h2 {
    font-size: 1.8em;
  }
`;

const gH3Style = css`
  h3 {
    font-size: 1.55em;
  }
`;

const gH4Style = css`
  h4 {
    font-size: 1.25em;
  }
`;

const gH5Style = css`
  h5 {
    font-size: 1.125em;
  }
`;

const gH6Style = css`
  h6 {
    font-size: 1em;
  }
`;

const gAnchorStyle = css`
  a {
    font-weight: 600;
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

const gTableStyle = css`
  table {
    display: block;
    width: 100%;
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;

    th {
      font-weight: 600;
    }

    td,
    th {
      padding: 6px 13px;
      border: 1px solid ${theme.color.border.primaryLight};
    }

    tr {
      background-color: #fff;
      border-top: 1px solid #c6cbd1;
    }

    tr:nth-child(2n) {
      background-color: ${theme.color.green.light3};
    }
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
  ${gTableStyle}
`;
