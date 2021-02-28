import { customRenderers } from '@/src/components/elements/MarkdownRenderer/CustomRenderers';
import styled from '@emotion/styled';
import Prism from 'prismjs';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';

const S = {
  ConvertedMdBody: styled.div`
    h1,
    h2 {
      padding-bottom: 0.3em;
      margin-top: 2em;
      border-bottom: 1px solid
        ${(props) => props.theme.color.border.primaryLight};
    }

    h3,
    h4,
    h5,
    h6 {
      margin-top: 1em;
    }

    code,
    pre {
      font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
      word-break: normal;
    }

    pre {
      white-space: pre-wrap;
    }

    /* This rule is for the inline code block. */
    code:not([class]) {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 0.85em;
      background-color: hsla(0, 0%, 92.5%);
      border-radius: 3px;
    }

    blockquote,
    details,
    dl,
    ol,
    p,
    pre,
    table,
    ul {
      margin-top: 0;
      margin-bottom: 1.8rem;
    }

    ul,
    ol {
      padding-left: 3rem;
    }

    ol ol,
    ul ol {
      list-style-type: lower-roman;
    }

    li {
      > p {
        margin-top: 1.6rem;
      }

      + li {
        margin-top: 0.25em;
      }
    }

    blockquote {
      padding: 0 1em;
      margin-left: 0;
      color: ${(props) => props.theme.color.text.primaryLight};
      border-left: 0.25em solid ${(props) => props.theme.color.blue.light3};

      :first-of-type {
        margin-top: 0;
      }

      :last-of-type {
        margin-bottom: 0;
      }
    }

    /* Below is for the plugin of Prism 'Show Language' */
    div.code-toolbar > .toolbar {
      top: 0.3em;
      right: 0.3em;
      transition: none;

      span {
        font-size: 0.85em;
        border-radius: 10px;
      }
    }
  `,
};

export const MarkdownRenderer: React.FC<{ content: string }> = ({
  content,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  const imageUriTransformer = (v: string): string => {
    return v.replace(/^\/?img\//, '/img/article/');
  };

  return (
    <>
      <S.ConvertedMdBody>
        <ReactMarkdown
          source={content}
          plugins={[remarkGfm, remarkFootnotes]}
          transformImageUri={imageUriTransformer}
          renderers={customRenderers}
        />
      </S.ConvertedMdBody>
    </>
  );
};
