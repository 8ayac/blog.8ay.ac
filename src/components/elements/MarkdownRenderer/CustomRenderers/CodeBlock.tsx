import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeBlock: React.FC<{ language: string; value: string }> = ({
  language,
  value,
}) => (
  <Prism
    style={atomDark}
    language={language}
    customStyle={{
      padding: '1.5rem 2rem',
      borderRadius: '5px',
      fontFamily: 'monospace',
      lineHeight: '1.1',
    }}
  >
    {value}
  </Prism>
);
