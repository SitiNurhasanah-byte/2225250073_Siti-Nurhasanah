import { Fragment, memo } from 'react';
import katex from 'katex';
import { GlossaryTerm } from './GlossaryTerm';

/**
 * Menampilkan teks konten dengan:
 *  - $...$       → rumus matematika (KaTeX)
 *  - [[istilah]] → istilah glosarium yang bisa diketuk ([[istilah|label]] untuk label lain)
 *  - **tebal**   → penekanan
 */
const TOKEN = /(\$[^$]+\$|\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g;

function renderPart(part: string, index: number) {
  if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) {
    const html = katex.renderToString(part.slice(1, -1), { throwOnError: false });
    return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  if (part.startsWith('[[') && part.endsWith(']]')) {
    const [term, label] = part.slice(2, -2).split('|');
    return <GlossaryTerm key={index} term={term} label={label ?? term} />;
  }
  if (part.startsWith('**') && part.endsWith('**')) {
    return <strong key={index}>{part.slice(2, -2)}</strong>;
  }
  return <Fragment key={index}>{part}</Fragment>;
}

export const MathText = memo(function MathText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return <span className={className}>{parts.map(renderPart)}</span>;
});
