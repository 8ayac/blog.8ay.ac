import { customRenderers } from '@/src/components/elements/MarkdownRenderer/CustomRenderers';
import styled from '@emotion/styled';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';

const S = {
  ConvertedMdBody: styled.div`
    line-height: 200%;

    h1,
    h2 {
      padding-bottom: 0.3em;
      margin-top: 2em;
      border-bottom: 1px solid
        ${(props) => props.theme.color.common.border.primaryLight};
    }

    h3,
    h4,
    h5,
    h6 {
      margin-top: 1em;
    }

    /* This rule is for the inline code block. */
    code:not([class]) {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
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
      padding-left: 2rem;
    }

    ol ol,
    ul ol {
      list-style-type: lower-roman;
    }

    blockquote {
      padding: 0 1em;
      margin: 0 2.5%;
      color: ${(props) => props.theme.color.common.text.primaryLight};
      border-left: 0.25em solid
        ${(props) =>
          props.theme.color.markdownRenderer.convertedMdBody.blockquote.border};

      :first-of-type {
        margin-top: 0;
      }

      :last-of-type {
        margin-bottom: 0;
      }
    }

    iframe {
      max-width: 100%;
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
          allowDangerousHtml
        />
      </S.ConvertedMdBody>
    </>
  );
};
