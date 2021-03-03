import { CustomImage } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/CustomImage';
import { FootnoteDefinition } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/FootnoteDefinition';
import { FootnoteReference } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/FootnoteReference';

export const customRenderers = {
  footnoteDefinition: FootnoteDefinition,
  footnoteReference: FootnoteReference,
  image: CustomImage,
};
