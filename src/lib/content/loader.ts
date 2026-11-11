import glossaryRaw from '../../../content/glossary.json';
import misconceptionsRaw from '../../../content/misconceptions.json';
import rubricRaw from '../../../content/research/rubric.json';
import {
  glossarySchema,
  itemSchema,
  misconceptionCatalogSchema,
  moduleSchema,
  rubricSchema,
  type Item,
  type ItemRef,
  type Module,
  type Step,
} from './schema';

// Hanya folder bank/ dan modules/ yang dibundel. Soal posttest penelitian (PT-*) TIDAK ada di sini.
const moduleFiles = import.meta.glob('../../../content/modules/*.json', { eager: true, import: 'default' });
const bankFiles = import.meta.glob('../../../content/bank/*.json', { eager: true, import: 'default' });

/**
 * Menyaring butir: hanya grup "learning" yang boleh tampil di aplikasi.
 * Butir "research-posttest" ditolak (docs/10-bank-soal.md §6).
 */
export function acceptLearningItems(items: Item[]): Item[] {
  return items.filter((item) => {
    if (item.group !== 'learning') {
      console.warn(`Butir ${item.id} (${item.group}) ditolak: soal penelitian tidak boleh dimuat di aplikasi.`);
      return false;
    }
    return true;
  });
}

function parseAll<T>(files: Record<string, unknown>, parse: (raw: unknown, file: string) => T): T[] {
  return Object.entries(files).map(([file, raw]) => parse(raw, file));
}

function buildContent() {
  const modules = parseAll(moduleFiles, (raw, file) => {
    const result = moduleSchema.safeParse(raw);
    if (!result.success) throw new Error(`Konten modul tidak valid (${file}): ${result.error.message}`);
    return result.data;
  }).sort((a, b) => a.order - b.order);

  const items = acceptLearningItems(
    parseAll(bankFiles, (raw, file) => {
      const result = itemSchema.safeParse(raw);
      if (!result.success) throw new Error(`Konten soal tidak valid (${file}): ${result.error.message}`);
      return result.data;
    }),
  );

  return {
    modules,
    items: new Map(items.map((item) => [item.id, item])),
    glossary: glossarySchema.parse(glossaryRaw),
    misconceptions: misconceptionCatalogSchema.parse(misconceptionsRaw),
    rubric: rubricSchema.parse(rubricRaw),
  };
}

export const content = buildContent();

export function getModule(id: string | undefined): Module | undefined {
  return content.modules.find((m) => m.id === id);
}

export function getItem(id: string): Item | undefined {
  return content.items.get(id);
}

export function nextModule(id: string): Module | undefined {
  const index = content.modules.findIndex((m) => m.id === id);
  return index >= 0 ? content.modules[index + 1] : undefined;
}

/** Langkah-langkah sebuah butir, disaring sesuai tahap yang dipilih modul. */
export function stepsFor(item: Item, ref: ItemRef): Step[] {
  return ref.stages ? item.steps.filter((s) => ref.stages!.includes(s.stage)) : item.steps;
}
