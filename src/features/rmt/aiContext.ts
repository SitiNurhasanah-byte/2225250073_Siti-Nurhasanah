import type { Item, Module, Step } from '../../lib/content/schema';
import { getFunction, getTool } from '../../lib/content/loader';
import { formatAnswer } from '../../lib/feedback/format';
import type { MediatorMode, MediatorRequest } from '../../lib/ai/prompt';

export function functionNames(ids: string[]): string[] {
  return ids.map((id) => {
    const fn = getFunction(id);
    return fn ? `${fn.id} ${fn.name}` : id;
  });
}

export function toolNames(module: Module): string[] {
  return module.rmt.tools.map((id) => getTool(id)?.name ?? id);
}

/** Konteks Gari AI untuk satu langkah soal. Kunci hanya disertakan pada mode evidence. */
export function stepContext(
  module: Module,
  item: Item,
  step: Step,
  mode: Extract<MediatorMode, 'hint' | 'evidence'>,
): Omit<MediatorRequest, 'studentText'> {
  const options = step.kind === 'choice' ? `\nPilihan: ${step.options.map((o, i) => `(${String.fromCharCode(65 + i)}) ${o}`).join('; ')}` : '';
  return {
    mode,
    topic: module.title,
    problem: `${item.context}\nDitanya: ${item.asked.join('; ')}\nLangkah ${step.stage} (${step.label}): ${step.prompt}${options}`,
    functions: functionNames(step.cognitiveFunctions.length ? step.cognitiveFunctions : module.rmt.functions),
    tools: toolNames(module),
    answer: mode === 'evidence' ? formatAnswer(step) : undefined,
  };
}

/** Kunci langkah untuk penyaring kebocoran di perangkat (tidak dikirim). */
export function secretAnswerOf(step: Step): string | undefined {
  return step.kind === 'number' || step.kind === 'equation' ? step.answer : undefined;
}
