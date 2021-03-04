import { CodeBlock } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/CodeBlock';
import { FootnoteDefinition } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/FootnoteDefinition';
import { FootnoteReference } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/FootnoteReference';

export const customRenderers = {
  footnoteDefinition: FootnoteDefinition,
  footnoteReference: FootnoteReference,
  code: CodeBlock,
};
